import test from 'node:test';
import assert from 'node:assert/strict';
import {githubRequest} from './pr.mjs';

test('PR creation denial includes GitHub message and repository settings guidance', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({
    message: 'GitHub Actions is not permitted to create or approve pull requests.',
  }), {status: 403}));
  await assert.rejects(
    githubRequest('/repos/example/docs/pulls', 'test-secret-token', {
      method: 'POST', body: JSON.stringify({title: 'Review docs'}),
    }),
    error => {
      assert.match(error.message, /403 POST \/repos\/example\/docs\/pulls/);
      assert.match(error.message, /GitHub Actions is not permitted/);
      assert.match(error.message, /https:\/\/github.com\/example\/docs\/settings\/actions/);
      assert.match(error.message, /organization policy/);
      assert.ok(!error.message.includes('test-secret-token'));
      return true;
    },
  );
});

test('non-JSON failures retain HTTP context without misdiagnosing a PR permission issue', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('Temporary server error', {status: 502}));
  await assert.rejects(
    githubRequest('/repos/example/docs/pulls?state=all', 'test-token'),
    error => {
      assert.match(error.message, /502 GET/);
      assert.ok(!error.message.includes('Workflow permissions'));
      return true;
    },
  );
});

test('successful GitHub requests still return their JSON result', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({number: 3}), {status: 201}));
  assert.deepEqual(await githubRequest('/repos/example/docs/pulls', 'test-token', {method: 'POST'}), {number: 3});
});
