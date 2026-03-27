import React, { useState } from 'react';
import Link from '@docusaurus/Link';

export default function PricingSection({ 
    title = "Simple pricing that scales with your team",
    subtitle = "Choose your team size to preview starting prices. Final pricing depends on the number of extensions and selected features.",
    isMainHeader = false // Tells the component whether to use an H1 or H2
}) {
    const[pricingTab, setPricingTab] = useState(1); // 1: 1 user, 2: 2-19, 3: 20-99

    const pricingData = {
        1:[
            { name: "Standard", price: "29.99", features:["Unlimited calling within the US", "Free number transfer", "AI voicemail transcription"] },
            { name: "Business Pro", price: "34.99", features:["HD voice", "500 toll-free minutes", "Unlimited virtual fax"], popular: true },
            { name: "Advanced", price: "49.99", features:["AI call transcriptions", "Contact center solution", "Popular CRM integrations"] }
        ],
        2:[
            { name: "Standard", price: "19.99", features:["Unlimited calling within the US", "Free number transfer", "AI voicemail transcription"] },
            { name: "Business Pro", price: "24.99", features:["HD voice", "500 toll-free minutes", "Unlimited virtual fax"], popular: true },
            { name: "Advanced", price: "39.99", features:["AI call transcriptions", "Contact center solution", "Popular CRM integrations"] }
        ],
        3:[
            { name: "Standard", price: "17.99", features:["Unlimited calling within the US", "Free number transfer", "AI voicemail transcription"] },
            { name: "Business Pro", price: "19.99", features:["HD voice", "500 toll-free minutes", "Unlimited virtual fax"], popular: true },
            { name: "Advanced", price: "34.99", features:["AI call transcriptions", "Contact center solution", "Popular CRM integrations"] }
        ]
    };

    return (
        <section className="relative isolate py-24 sm:py-32 bg-white overflow-hidden">
            <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                <div
                    className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#F08439]/10 to-[#F08439]/5 opacity-40"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>

            <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Conditionally render H1 or H2 based on where the component is used */}
                    {isMainHeader ? (
                        <h1 className="text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 sm:text-5xl leading-tight">
                            {title}
                        </h1>
                    ) : (
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            {title}
                        </h2>
                    )}
                    <p className="mt-6 text-lg md:text-xl 2xl:text-2xl font-medium text-gray-500 leading-8">
                        {subtitle}
                    </p>
                </div>

                <div className="mt-12 flex justify-center">
                    <div className="inline-flex rounded-full bg-gray-100/80 p-1.5 ring-1 ring-inset ring-gray-200 backdrop-blur-sm">
                        {[
                            { id: 1, label: '1 user' },
                            { id: 2, label: '2–19 users' },
                            { id: 3, label: '20–99 users' },
                        ].map((tab) => {
                            const isActive = pricingTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setPricingTab(tab.id)}
                                    className={`relative rounded-full px-7 py-2.5 text-sm md:text-base font-semibold transition-all duration-300 ease-out ${isActive
                                        ? 'bg-[#F08439] text-white shadow-md shadow-[#F08439]/30 scale-100'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 scale-[0.98]'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 2xl:gap-12 lg:items-center">
                    {pricingData[pricingTab].map((plan) => {
                        const isPopular = !!plan.popular;
                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-3xl p-8 2xl:p-10 transition-all duration-500 ${isPopular
                                    ? 'bg-gradient-to-b from-[#fffaf5] to-white ring-2 ring-[#F08439] shadow-xl shadow-[#F08439]/10 lg:-translate-y-4 z-10'
                                    : 'bg-white ring-1 ring-gray-200 hover:shadow-xl hover:shadow-gray-200/50 hover:ring-gray-300 z-0'
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F08439] px-4 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-white/20">
                                            <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse"></span>
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center">
                                    <h3 className={`text-xl 2xl:text-2xl font-semibold tracking-tight ${isPopular ? 'text-[#F08439]' : 'text-gray-900'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="mt-6">
                                        <p className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">Starting at</p>
                                        <div className="flex items-end justify-center gap-1">
                                            <span className="text-5xl 2xl:text-6xl font-semibold tracking-tight text-gray-900">${plan.price}</span>
                                        </div>
                                        <p className="mt-2 text-sm md:text-base font-medium text-gray-500">per user / month</p>
                                    </div>
                                </div>

                                <hr className={`mt-8 border-t ${isPopular ? 'border-[#F08439]/20' : 'border-gray-100'}`} />

                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <svg className={`h-6 w-5 flex-none ${isPopular ? 'text-[#F08439]' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-base text-gray-600 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-10">
                                    <Link
                                        to="/contacts"
                                        className={`flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm md:text-base font-semibold transition-all duration-200 ${isPopular
                                            ? 'bg-[#F08439] text-white shadow-sm hover:bg-[#d97530] hover:shadow-md'
                                            : 'bg-white text-[#F08439] ring-1 ring-inset ring-[#F08439]/30 hover:bg-[#fffaf5] hover:ring-[#F08439]'
                                            }`}
                                    >
                                        Get a Quote
                                    </Link>
                                    <p className="mt-4 text-center text-sm font-medium text-gray-500">14-day free trial available</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                
            </div>
        </section>
    );
}