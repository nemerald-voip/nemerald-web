const TAG_ID = 'AW-781845970';
const CONTACT_CONVERSION = `${TAG_ID}/HCQ5CLzjppQBENKL6PQC`;
const SCRIPT_ID = 'nemerald-google-tag';
let initialized = false;
let measurementAllowed = false;

function consent(allowed) {
    return {
        ad_storage: allowed ? 'granted' : 'denied',
        ad_user_data: allowed ? 'granted' : 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
    };
}

export function updateGoogleAdsConsent(allowed) {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;
    const granted = allowed === true && window.navigator.globalPrivacyControl !== true;
    if (granted === measurementAllowed) return;
    measurementAllowed = granted;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

    if (!initialized) {
        window.gtag('consent', 'default', consent(false));
        window.gtag('set', 'allow_ad_personalization_signals', false);
        initialized = true;
    }
    window.gtag('consent', 'update', consent(granted));

    // Basic consent mode: do not contact Google until measurement is allowed.
    // Keep one tag across client-side navigation and repeated preference changes.
    if (granted && !document.getElementById(SCRIPT_ID)) {
        window.gtag('js', new Date());
        window.gtag('config', TAG_ID);
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`;
        document.head.appendChild(script);
    }
}

export function trackContactConversion() {
    // Check current permission again: it may have changed while the form was sending.
    if (typeof window === 'undefined' || !measurementAllowed
        || window.navigator.globalPrivacyControl === true) return;
    try {
        window.gtag?.('event', 'conversion', { send_to: CONTACT_CONVERSION });
    } catch { /* Tracking must never turn a successful submission into a form error. */ }
}
