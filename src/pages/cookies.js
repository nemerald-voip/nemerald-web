import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@site/src/components/PageLayout';
import { usePrivacyPreferences } from '@site/src/components/PrivacyPreferences';

export default function Cookies() {
    const { openSettings } = usePrivacyPreferences();
    return (
        <Layout title="Cookie Notice | Nemerald" description="Manage embedded video preferences and learn about Nemerald website storage, Cloudflare security, and YouTube videos.">
            <div className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
                <article className="mx-auto max-w-3xl px-6 lg:px-8 text-gray-700 leading-relaxed">
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Cookies & website privacy</h1>
                    <p className="mt-4 text-sm">Last updated: September 29, 2026</p>
                    <p>This notice explains the controls for embedded YouTube videos and security features on nemerald.com. Cookies and similar technologies, including browser storage, can remember choices or let third-party features work.</p>
                    <button type="button" onClick={openSettings} aria-haspopup="dialog" className="my-4 rounded-full border-0 bg-brand-fill px-6 py-3 font-semibold text-gray-900 cursor-pointer">Open cookie settings</button>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Your choices</h2>
                    <p>Optional YouTube videos are blocked until you allow them. You can reject optional videos, allow them, or change your choice using <strong>Cookie settings</strong> in the footer. Allowing videos does not load a player until you select a video. You can browse the site and use the contact form without allowing videos.</p>
                    <p>Turning this setting off removes any loaded YouTube players. It stops further use of those players on this site, but does not erase information already sent to YouTube or cookies already stored by it. You can clear existing cookies in your browser and use Google’s privacy controls.</p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Essential features</h2>
                    <h3 className="mt-6 text-lg font-semibold text-gray-900">Remembering your choice</h3>
                    <p>Nemerald stores your selection and its date in your browser’s local storage under <code className="break-all">nemerald-privacy-preferences</code>. This preference is used for up to 365 days before we ask again. Expired preferences are ignored. Clearing site data removes it sooner. This storage is used to honor your choices, and is not an advertising identifier.</p>
                    <p>Your choice applies to this website in this browser. Use Cookie settings on each browser or device you use. If browser storage is unavailable, the choice applies only to the current visit.</p>
                    <h3 className="mt-6 text-lg font-semibold text-gray-900">Contact form security</h3>
                    <p>Cloudflare Turnstile loads on our contact page to help prevent automated spam. Cloudflare processes technical signals such as IP address, browser information, and the website involved to provide and improve bot detection. This security feature remains active when optional videos are rejected. Cloudflare security cookies may also be used depending on the security configuration.</p>
                    <p>See <a href="https://www.cloudflare.com/turnstile-privacy-policy/" className="text-gray-900 underline">Cloudflare’s Turnstile privacy notice</a> and <a href="https://www.cloudflare.com/cookie-policy/" className="text-gray-900 underline">Cloudflare’s cookie policy</a> for its processing and cookie information.</p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Optional YouTube videos</h2>
                    <p>Our tutorials use Google / YouTube’s privacy-enhanced player. Loading a video connects your browser to YouTube, which receives your IP address and browser information and may use cookies or similar storage. Privacy-enhanced mode does not mean that no data is sent to Google.</p>
                    <p>Google controls its own storage and retention. Read <a href="https://policies.google.com/privacy" className="text-gray-900 underline">Google’s Privacy Policy</a> and <a href="https://policies.google.com/technologies/cookies" className="text-gray-900 underline">Google’s cookie information</a>. The separate “Watch on YouTube” link takes you to YouTube, where its own privacy settings apply.</p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Browser privacy signals</h2>
                    <p>When your browser sends a Global Privacy Control (GPC) signal, these website controls keep optional YouTube players blocked, including when you previously allowed them. Cookie settings shows when this signal is detected. These settings do not manage your preferences on the separate customer portal or other websites you choose to visit.</p>
                    <p>The older Do Not Track browser signal does not change these video settings. Use Cookie settings or a browser with GPC to keep embedded videos blocked.</p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Information you send us</h2>
                    <p>Our contact form sends your name, email address, phone number, message, and spam-verification token to Nemerald’s contact service hosted on Cloudflare. We use your contact information and message to respond to your inquiry. Cookie settings do not control information you choose to submit in the form.</p>
                    <p>For our broader practices, read the <Link to="/privacy-policy" className="text-gray-900 underline">Privacy Policy</Link>. For privacy questions or requests concerning your personal information, including access, correction, or deletion, contact <a href="mailto:info@nemerald.com" className="text-gray-900 underline">info@nemerald.com</a>. Please do not send passwords or payment card details.</p>
                </article>
            </div>
        </Layout>
    );
}
