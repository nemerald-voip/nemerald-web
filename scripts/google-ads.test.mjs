import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/utils/googleAds.js', import.meta.url), 'utf8');

function browser({ production = true, gpc = false, ssr = false } = {}) {
    const scripts = [];
    const context = vm.createContext({
        process: { env: { NODE_ENV: production ? 'production' : 'development' } },
        ...(!ssr && {
            window: { navigator: { globalPrivacyControl: gpc } },
            document: {
                getElementById: (id) => scripts.find((script) => script.id === id),
                createElement: (tag) => ({ tag }),
                head: { appendChild: (script) => scripts.push(script) },
            },
        }),
    });
    vm.runInContext(source.replace(/^export /gm, ''), context);
    return {
        scripts,
        window: context.window,
        consent: context.updateGoogleAdsConsent,
        convert: context.trackContactConversion,
        // Normalize cross-realm values for assertions.
        commands: () => JSON.parse(JSON.stringify((context.window?.dataLayer || []).map((command) => Array.from(command)))),
    };
}

test('no tag or conversion is sent before permission or after rejection', () => {
    const app = browser();
    app.convert();
    app.consent(false);
    app.convert();
    assert.equal(app.scripts.length, 0);
    assert.deepEqual(app.commands(), []);
});

test('permission loads the correct async tag once with consent set before configuration', () => {
    const app = browser();
    app.consent(true);
    app.consent(true);
    assert.equal(app.scripts.length, 1);
    assert.equal(app.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=AW-781845970');
    assert.equal(app.scripts[0].async, true);
    const commands = app.commands();
    assert.deepEqual(commands[0], ['consent', 'default', {
        ad_storage: 'denied', ad_user_data: 'denied',
        ad_personalization: 'denied', analytics_storage: 'denied',
    }]);
    assert.deepEqual(commands[2], ['consent', 'update', {
        ad_storage: 'granted', ad_user_data: 'granted',
        ad_personalization: 'denied', analytics_storage: 'denied',
    }]);
    assert.deepEqual(commands.at(-1), ['config', 'AW-781845970']);
    assert.equal(commands.filter(([command]) => command === 'config').length, 1);
    assert.equal(commands.filter(([command]) => command === 'event').length, 0);
});

test('a conversion queues the exact destination without form data while the tag loads', () => {
    const app = browser();
    app.consent(true);
    app.convert();
    assert.deepEqual(app.commands().at(-1), ['event', 'conversion', {
        send_to: 'AW-781845970/HCQ5CLzjppQBENKL6PQC',
    }]);
});

test('withdrawal blocks subsequent conversions and reallowing does not duplicate the tag', () => {
    const app = browser();
    app.consent(true);
    app.consent(false);
    const withdrawn = app.commands();
    assert.equal(withdrawn.at(-1)[2].ad_storage, 'denied');
    assert.equal(withdrawn.at(-1)[2].ad_user_data, 'denied');
    app.convert();
    assert.deepEqual(app.commands(), withdrawn);
    app.consent(true);
    app.convert();
    assert.equal(app.scripts.length, 1);
    assert.equal(app.commands().filter(([command]) => command === 'config').length, 1);
    assert.equal(app.commands().filter(([command]) => command === 'event').length, 1);
});

test('GPC blocks both initial loading and conversions if enabled while a form is sending', () => {
    const blocked = browser({ gpc: true });
    blocked.consent(true);
    blocked.convert();
    assert.equal(blocked.scripts.length, 0);
    assert.deepEqual(blocked.commands(), []);

    const app = browser();
    app.consent(true);
    app.window.navigator.globalPrivacyControl = true;
    app.convert();
    assert.equal(app.commands().filter(([command]) => command === 'event').length, 0);
    app.consent(true);
    assert.equal(app.commands().at(-1)[2].ad_user_data, 'denied');
});

test('development and server rendering never load the tag', () => {
    for (const options of [{ production: false }, { ssr: true }]) {
        const app = browser(options);
        assert.doesNotThrow(() => {
            app.consent(true);
            app.convert();
        });
        assert.equal(app.scripts.length, 0);
        assert.deepEqual(app.commands(), []);
    }
});

test('unavailable or broken tracking cannot fail a successful form submission', () => {
    const app = browser();
    app.consent(true);
    app.window.gtag = undefined;
    assert.doesNotThrow(() => app.convert());
    app.window.gtag = () => { throw new Error('Tracking unavailable'); };
    assert.doesNotThrow(() => app.convert());
});
