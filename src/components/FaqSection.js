import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

const generalQuestions = [
    {
        id: 'keep-numbers',
        question: 'Can I keep my existing business phone numbers?',
        answer: 'Yes. We offer number porting so you can keep your existing business numbers when moving to Nemerald.',
    },
    {
        id: 'supported-devices',
        question: 'Do you support desk phones, mobile apps, and desktop apps?',
        answer: 'Yes. Nemerald supports desk phones, mobile applications, and desktop softphones so your team can stay connected from anywhere.',
    },
    {
        id: 'existing-hardware',
        question: 'Can I use my existing phones and hardware?',
        answer: 'In many cases, yes. We support a wide range of compatible devices, and we can also help you choose and deploy new hardware if needed.',
    },
    {
        id: 'setup-time',
        question: 'How long does setup usually take?',
        answer: 'Setup time depends on the size of your deployment, number porting requirements, and hardware needs. Many teams can get up and running quickly with guided onboarding.',
    },
    {
        id: 'onboarding',
        question: 'Do you offer help with onboarding and number porting?',
        answer: 'Yes. We provide guided onboarding and support throughout setup, provisioning, and number transfer.',
    },
    {
        id: 'remote-teams',
        question: 'Is Nemerald a good fit for remote or hybrid teams?',
        answer: 'Yes. Nemerald is built for modern teams and supports office, remote, and hybrid work with desk phones, mobile apps, and desktop calling.',
    },
    {
        id: 'contact-center',
        question: 'Do you offer contact center features?',
        answer: 'Yes. Advanced plans include contact center tools for queues, agents, reporting, and customer experience workflows.',
    },
];

const pricingQuestions = [
    {
        id: 'trial-details',
        question: 'How does the 14-day trial work?',
        answer: (
            <>
                <p className="mb-3">
                    Your 14-day trial automatically converts to paid service unless you cancel before the trial ends. Your first invoice is issued and you are first charged when the trial ends.
                </p>
                <p className="mb-0">
                    To cancel during the trial and avoid service charges, send a written request to{' '}
                    <a href="mailto:billing@nemerald.com" className="font-semibold text-gray-900 underline underline-offset-4">billing@nemerald.com</a>{' '}
                    before your trial ends.
                </p>
            </>
        ),
    },
    {
        id: 'cancel-service',
        question: 'How do I cancel my service?',
        answer: (
            <>
                <p className="mb-3">
                    Email your written request to{' '}
                    <a href="mailto:billing@nemerald.com" className="font-semibold text-gray-900 underline underline-offset-4">billing@nemerald.com</a>. A telephone call is not required.
                </p>
                <p className="mb-3">
                    Cancel before your trial ends to avoid service charges. After paid month-to-month service begins, cancellation requires 30 days’ written notice and service charges remain payable during that period. Fixed-term commitments and equipment installment agreements have separate obligations.
                </p>
                <p className="mb-0">
                    <Link to="/terms-and-conditions#billing-and-cancellation" className="font-semibold text-gray-900 underline underline-offset-4">Read the cancellation, renewal, and refund terms.</Link>
                </p>
            </>
        ),
    },
    {
        id: 'plan-pricing',
        question: 'How does pricing work?',
        answer: 'Choose your team size to see the fixed base monthly rate per user for each plan. Multiply that rate by your number of users for your base plan subtotal. Government taxes and fees and Nemerald provider fees are additional. Optional features may cost extra.',
    },
    {
        id: 'taxes-and-fees',
        question: 'When are taxes and fees calculated?',
        answer: 'Applicable government taxes and fees and Nemerald provider fees are calculated when each invoice is generated. These amounts may change from month to month. Provider fees are separate from government taxes and fees.',
    },
];

export default function FaqSection({ pricingOnly = false, openId, onOpenChange }) {
    const trialButtonRef = useRef(null);
    const questions = pricingOnly ? pricingQuestions : [...generalQuestions, ...pricingQuestions];
    const brokenLinks = useBrokenLinks();
    brokenLinks.collectAnchor('faq');
    brokenLinks.collectAnchor('trial-details');

    useEffect(() => {
        // Support direct links, reloads, and browser back/forward navigation.
        const openLinkedTrial = () => {
            if (window.location.hash === '#trial-details') onOpenChange('trial-details');
        };
        openLinkedTrial();
        window.addEventListener('hashchange', openLinkedTrial);
        return () => window.removeEventListener('hashchange', openLinkedTrial);
    }, [onOpenChange]);

    useEffect(() => {
        if (openId === 'trial-details' && window.location.hash === '#trial-details') {
            // Opening this answer can close a taller answer above it. Scroll after
            // that layout change, and move keyboard focus to the disclosure button.
            trialButtonRef.current?.scrollIntoView();
            trialButtonRef.current?.focus({ preventScroll: true });
        }
    }, [openId]);

    return (
        <section id="faq" className="py-24 sm:py-32 bg-[#fffaf5]">
            <div className="mx-auto max-w-4xl 2xl:max-w-5xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                        Frequently asked questions
                    </h2>
                    <p className="mt-6 text-lg md:text-xl 2xl:text-2xl font-medium text-gray-600 leading-8">
                        {pricingOnly
                            ? 'Answers about your trial, plan pricing, taxes, and fees.'
                            : 'Everything you need to know about switching, setup, devices, pricing, and your trial.'}
                    </p>
                </div>

                <div className="mt-16 space-y-4">
                    {questions.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`rounded-3xl bg-white shadow-sm ring-1 transition-all duration-300 ${isOpen
                                    ? 'ring-[#F08439]/20 shadow-lg shadow-[#F08439]/10'
                                    : 'ring-gray-900/5'
                                    }`}
                            >
                                <h3 className="m-0">
                                    <button
                                        type="button"
                                        onClick={() => onOpenChange(isOpen ? null : item.id)}
                                        ref={item.id === 'trial-details' ? trialButtonRef : undefined}
                                        id={item.id}
                                        aria-expanded={isOpen}
                                        aria-controls={`${item.id}-answer`}
                                        className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-3xl border-0 bg-transparent px-6 py-6 text-left sm:px-8"
                                    >
                                        <span className="text-lg md:text-xl font-semibold text-gray-900">
                                            {item.question}
                                        </span>
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen
                                            ? 'bg-brand-fill text-gray-900'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            <svg className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
                                            </svg>
                                        </span>
                                    </button>
                                </h3>
                                <div id={`${item.id}-answer`} role="region" aria-labelledby={item.id} hidden={!isOpen}>
                                    <div className="px-6 pb-6 sm:px-8 text-base md:text-lg text-gray-600 leading-8">
                                        {typeof item.answer === 'string' ? <p className="mb-0">{item.answer}</p> : item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
