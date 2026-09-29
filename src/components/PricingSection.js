import React, { useId, useState } from 'react';
import Link from '@docusaurus/Link';

const teamSizes = [
    { id: '1', label: '1 user', description: 'For 1 user' },
    { id: '2-19', label: '2–19 users', description: 'For teams of 2–19 users' },
    { id: '20-99', label: '20–99 users', description: 'For teams of 20–99 users' },
];

const plans = [
    {
        name: 'Standard',
        prices: { '1': '29.99', '2-19': '19.99', '20-99': '17.99' },
        features: ['Unlimited calling within the US', 'Free number transfer', 'AI voicemail transcription'],
    },
    {
        name: 'Business Pro',
        prices: { '1': '34.99', '2-19': '24.99', '20-99': '19.99' },
        features: ['HD voice', '500 toll-free minutes', 'Unlimited virtual fax'],
        popular: true,
    },
    {
        name: 'Advanced',
        prices: { '1': '49.99', '2-19': '39.99', '20-99': '34.99' },
        features: ['AI call transcriptions', 'Contact center solution', 'Popular CRM integrations'],
    },
];

export default function PricingSection({
    title = "Simple pricing that scales with your team",
    subtitle = "Plans are for business use only. Choose your team size to see your base monthly rate per user. Taxes and fees are additional.",
    isMainHeader = false, // Tells the component whether to use an H1 or H2
    onTrialDetailsClick,
}) {
    const [selectedTeamSize, setSelectedTeamSize] = useState(teamSizes[0]);
    const teamSizeGroupName = useId();
    const PlanHeading = isMainHeader ? 'h2' : 'h3';

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

                <div className="mx-auto mt-10 max-w-md text-center">
                    <fieldset className="m-0 min-w-0 border-0 p-0">
                        <legend className="mx-auto mb-4 p-0 text-sm font-semibold text-gray-900">
                            How many users are on your team?
                        </legend>
                        <div className="grid grid-cols-3 gap-1 rounded-full bg-gray-100 p-1.5 ring-1 ring-inset ring-gray-200">
                            {teamSizes.map((teamSize) => (
                                <label key={teamSize.id} className="relative m-0 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={teamSizeGroupName}
                                        value={teamSize.id}
                                        checked={selectedTeamSize.id === teamSize.id}
                                        onChange={() => setSelectedTeamSize(teamSize)}
                                        className="peer sr-only"
                                    />
                                    <span className="flex min-h-11 items-center justify-center whitespace-nowrap rounded-full px-2 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200/70 peer-checked:bg-[#F08439] peer-checked:text-gray-900 peer-checked:shadow-sm peer-checked:ring-2 peer-checked:ring-gray-900 peer-checked:hover:bg-[#F08439] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-900 sm:px-4 sm:text-base">
                                        {teamSize.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <p className="sr-only" role="status" aria-atomic="true">
                        Base plan rates for {selectedTeamSize.label}: {plans.map((plan) => `${plan.name} $${plan.prices[selectedTeamSize.id]} per user per month`).join('; ')}. Government taxes and fees and provider fees are additional.
                    </p>
                </div>

                <div className="mx-auto mt-14 grid max-w-lg grid-cols-1 gap-10 lg:max-w-none lg:grid-cols-3 2xl:gap-12">
                    {plans.map((plan) => {
                        const isPopular = !!plan.popular;
                        return (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col rounded-3xl p-8 2xl:p-10 transition-shadow duration-300 ${isPopular
                                    ? 'bg-gradient-to-b from-[#fffaf5] to-white ring-2 ring-[#F08439] shadow-xl shadow-[#F08439]/10 z-10'
                                    : 'bg-white ring-1 ring-gray-200 hover:shadow-xl hover:shadow-gray-200/50 hover:ring-gray-300 z-0'
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F08439] px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-white/20">
                                            <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse"></span>
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center">
                                    <PlanHeading className="text-xl 2xl:text-2xl font-semibold tracking-tight text-gray-900">
                                        {plan.name}
                                    </PlanHeading>
                                    <p className="mb-0 mt-2 text-sm font-medium text-gray-600">{selectedTeamSize.description}</p>
                                    <div className="mt-7">
                                        <div className="flex items-end justify-center gap-1">
                                            <span className="text-5xl 2xl:text-6xl font-semibold tracking-tight text-gray-900 tabular-nums">${plan.prices[selectedTeamSize.id]}</span>
                                        </div>
                                        <p className="mb-0 mt-3 text-sm md:text-base font-medium text-gray-600">per user, per month</p>
                                        <p className="mb-0 mt-2 text-sm leading-6 text-gray-600">
                                            <Link to="/taxes-and-fees" className="text-gray-900 underline underline-offset-4" aria-label={`Taxes and fees are additional for ${plan.name}; view details`}>
                                                Taxes and fees are additional
                                            </Link>
                                        </p>
                                    </div>
                                </div>

                                <hr className={`mt-8 border-t ${isPopular ? 'border-[#F08439]/20' : 'border-gray-100'}`} />

                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <svg className={`h-6 w-5 flex-none ${isPopular ? 'text-gray-900' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-base text-gray-600 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-8">
                                    <Link
                                        to="/contacts"
                                        aria-label={`Get a quote for ${plan.name} for ${selectedTeamSize.label}`}
                                        className={`flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm md:text-base font-semibold transition-all duration-200 ${isPopular
                                            ? 'bg-brand-fill text-gray-900 shadow-sm hover:bg-brand-fill-hover hover:shadow-md'
                                            : 'bg-white text-gray-900 ring-1 ring-inset ring-[#F08439]/30 hover:bg-[#fffaf5] hover:ring-[#F08439]'
                                            }`}
                                    >
                                        Get a Quote
                                    </Link>
                                    <div className="mt-4 text-center text-sm leading-6 text-gray-600">
                                        <p className="mb-1 font-semibold text-gray-900">14-day free trial available</p>
                                        <p className="mb-1">Paid service starts automatically when the trial ends unless you cancel.</p>
                                        <Link
                                            to="#trial-details"
                                            onClick={(event) => {
                                                if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                                                    onTrialDetailsClick?.();
                                                }
                                            }}
                                            className="font-medium text-gray-900 underline underline-offset-4"
                                        >
                                            Trial &amp; cancellation details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-gray-50 px-6 py-5 text-center ring-1 ring-inset ring-gray-200">
                    <p className="mb-2 text-sm font-semibold text-gray-900 sm:text-base">
                        Base plan subtotal = rate per user × number of users
                    </p>
                    <p className="m-0 text-sm leading-6 text-gray-600">
                        Base rates are fixed within each team-size range. Government taxes and fees and Nemerald provider fees are additional. Optional features may cost extra.
                    </p>
                    <p className="mb-0 mt-3 text-sm leading-6 text-gray-600">
                        Applicable taxes and fees are calculated when each invoice is generated and may change from month to month.{' '}
                        <Link to="/taxes-and-fees" className="font-semibold text-gray-900 underline underline-offset-4">How taxes and fees work.</Link>
                    </p>
                </div>
                <p className="mb-0 mt-5 text-center text-sm text-gray-600">
                    Have 100+ users?{' '}
                    <Link to="/contacts" className="font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-900">
                        Contact us for team pricing.
                    </Link>
                </p>
            </div>
        </section>
    );
}
