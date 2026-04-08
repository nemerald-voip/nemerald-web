import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
    BuildingOffice2Icon,
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function Contacts() {
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileContainerRef = useRef(null);
    const widgetIdRef = useRef(null);

    useEffect(() => {
        const scriptId = 'cf-turnstile-script';

        function renderWidget() {
            if (!window.turnstile || !turnstileContainerRef.current || widgetIdRef.current !== null) {
                return;
            }

            widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
                sitekey: '0x4AAAAAAC2UzWmkWXJFLGYP',
                callback: function (token) {
                    setTurnstileToken(token);
                    setFormStatus((prev) =>
                        prev.type === 'error' && prev.message === 'Please complete the Turnstile verification.'
                            ? { type: '', message: '' }
                            : prev
                    );
                },
                'expired-callback': function () {
                    setTurnstileToken('');
                },
                'error-callback': function () {
                    setTurnstileToken('');
                    setFormStatus({
                        type: 'error',
                        message: 'Verification failed. Please try again.',
                    });
                },
            });
        }

        if (window.turnstile) {
            renderWidget();
            return;
        }

        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.addEventListener('load', renderWidget);
            return () => existingScript.removeEventListener('load', renderWidget);
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.defer = true;
        script.addEventListener('load', renderWidget);
        document.head.appendChild(script);

        return () => {
            script.removeEventListener('load', renderWidget);
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setFormStatus({ type: '', message: '' });

        const form = e.target;
        const formData = new FormData(form);

        const firstName = (formData.get('first-name') || '').toString().trim();
        const lastName = (formData.get('last-name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const phone = (formData.get('phone-number') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        const payload = {
            name: `${firstName} ${lastName}`.trim(),
            email,
            phone,
            message,
            'cf-turnstile-response': turnstileToken,
        };

        if (!payload.name || !payload.email || !payload.phone) {
            setFormStatus({
                type: 'error',
                message: 'Name, email, and phone are required.',
            });
            setLoading(false);
            return;
        }

        if (!turnstileToken) {
            setFormStatus({
                type: 'error',
                message: 'Please complete the Turnstile verification.',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://nemerald-contact-form.dexter-8e4.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.details || 'Failed to submit form.');
            }

            setFormStatus({
                type: 'success',
                message: 'Thanks. Your message has been sent.',
            });

            form.reset();
        } catch (error) {
            if (window.turnstile && widgetIdRef.current !== null) {
                window.turnstile.reset(widgetIdRef.current);
            }

            setTurnstileToken('');

            setFormStatus({
                type: 'error',
                message: error.message || 'Something went wrong.',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout title="Contact Us | Nemerald">
            <div className="relative isolate bg-white min-h-[calc(100vh-80px)]">
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                    <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F08439] to-[#F08439]/10 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
                        <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-[#d97530] ring-1 ring-[#F08439]/15 mb-6">
                            We're here to help
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl 2xl:text-6xl leading-tight">
                            Get in touch with our expert team
                        </h1>
                        <p className="mt-6 text-lg md:text-xl 2xl:text-2xl leading-8 text-gray-600 font-medium">
                            Whether you have questions about our phone systems, need a custom deployment quote, or want to explore partnerships, we're ready to answer all your questions.
                        </p>

                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                            <div className="flex gap-x-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/20">
                                    <PhoneIcon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">Sales & Support</h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <a href="tel:+13109292680" className="font-semibold text-[#F08439] hover:text-[#d97530]">
                                            +1 (310) 929 2680
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-x-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/20">
                                    <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">Email Us</h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <a href="mailto:info@nemerald.com" className="font-semibold text-[#F08439] hover:text-[#d97530]">
                                            info@nemerald.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-x-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/20">
                                    <BuildingOffice2Icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">Office</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                        440 N Barranca Ave #2250
                                        <br />
                                        Covina, CA 91278, USA
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-x-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/20">
                                    <ClockIcon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">Business Hours</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                        Mon-Fri: 9am - 8pm
                                        <br />
                                        Sat-Sun: 10am - 3pm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 lg:mt-0 lg:flex-grow lg:pl-16 2xl:pl-24 flex items-center justify-center">
                        <div className="w-full max-w-xl bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl ring-1 ring-gray-900/5">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                required
                                                className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F08439] sm:text-sm sm:leading-6 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                required
                                                className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F08439] sm:text-sm sm:leading-6 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F08439] sm:text-sm sm:leading-6 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="tel"
                                                name="phone-number"
                                                id="phone-number"
                                                autoComplete="tel"
                                                required
                                                className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F08439] sm:text-sm sm:leading-6 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Message
                                        </label>
                                        <div className="mt-2.5">
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={4}
                                                className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F08439] sm:text-sm sm:leading-6 transition-all"
                                                defaultValue=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 mt-6">
                                    <div className="flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="privacy"
                                                name="privacy"
                                                type="checkbox"
                                                required
                                                className="h-4 w-4 rounded border-gray-300 text-[#F08439] focus:ring-[#F08439]"
                                            />
                                        </div>
                                        <label htmlFor="privacy" className="text-sm leading-6 text-gray-600">
                                            I agree to the{' '}
                                            <Link to="/privacy-policy" className="font-semibold text-[#F08439] hover:underline">
                                                processing of personal data
                                            </Link>.
                                        </label>
                                    </div>

                                    <div className="flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="sms-consent"
                                                name="sms-consent"
                                                type="checkbox"
                                                required
                                                className="h-4 w-4 rounded border-gray-300 text-[#F08439] focus:ring-[#F08439]"
                                            />
                                        </div>
                                        <label htmlFor="sms-consent" className="text-sm leading-6 text-gray-600">
                                            By providing your phone number, you are providing your express written consent to receive SMS or calls.
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div ref={turnstileContainerRef} />
                                </div>

                                {formStatus.message && (
                                    <div
                                        className={`rounded-xl px-4 py-3 text-sm ${formStatus.type === 'success'
                                            ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
                                            : 'bg-red-50 text-red-700 ring-1 ring-red-200'
                                            }`}
                                    >
                                        {formStatus.message}
                                    </div>
                                )}

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="block w-full rounded-full bg-[#F08439] px-3.5 py-4 text-center text-base font-semibold text-white shadow-md hover:bg-[#d97530] hover:shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F08439] disabled:opacity-60"
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}