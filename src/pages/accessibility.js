import React from 'react';
import Layout from '@site/src/components/PageLayout';
import Link from '@docusaurus/Link';

export default function Accessibility() {
    return (
        <Layout title="Accessibility | Nemerald" description="Accessibility information and ways to get help using the Nemerald website.">
            <div className="bg-white px-6 py-16 sm:py-24">
                <div className="mx-auto max-w-3xl text-gray-700">
                    <h1 className="text-4xl font-semibold text-gray-900">Accessibility</h1>
                    <p className="mt-6 text-lg">We are working to make the Nemerald website easier to use, including with a keyboard and assistive technology. WCAG 2.2 Level AA guides these improvements.</p>
                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Using this website</h2>
                    <p>You can use the skip link at the beginning of each page to reach the main content. Navigation, plan selection, and contact form controls support keyboard use. Tutorial videos load only when you choose to load them.</p>
                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Known limitations</h2>
                    <p>Our accessibility review is ongoing. We have not verified captions, transcripts, or audio descriptions for every tutorial. Embedded video players and the external customer portal may have additional limitations. This statement does not claim that every page or service fully conforms to WCAG.</p>
                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Report a problem or request help</h2>
                    <p>If you have difficulty using the website or need tutorial information in another format, email <a className="text-gray-900 underline" href="mailto:info@nemerald.com">info@nemerald.com</a> or call <a className="text-gray-900 underline" href="tel:+13109292680">+1 (310) 929 2680</a>. Please include the page address, the problem you encountered, and your preferred way for us to reply. Share browser or assistive technology details if helpful.</p>
                    <p>You can also use our <Link className="text-gray-900 underline" to="/contacts">contact page</Link>.</p>
                </div>
            </div>
        </Layout>
    );
}
