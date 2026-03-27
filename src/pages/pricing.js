import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import PricingSection from '../components/PricingSection';

export default function Pricing() {

    // The data extracted exactly from your original HTML table
    const comparisonFeatures = [
        {
            category: 'The Essentials',
            features: [
                { name: 'Unlimited Calling within the US/CA/Mexico', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Free Local & Toll-Free Number', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Keep Your Current Number', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Call Controls (Transfer, Hold, Mute, etc.)', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Customizable Hold Music', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Unlimited Multi-Level Auto Attendant', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Dial by Name Directory', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Call Continuity', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Simultaneous Ring', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Call Forwarding', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Call Waiting', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Do Not Disturb', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'HD Voice', tiers: { Standard: false, 'Business Pro': true, Advanced: true } },
                { name: 'Virtual Fax Machine', tiers: { Standard: false, 'Business Pro': '1', Advanced: '5' } },
                { name: '24/7 Support', tiers: { Standard: false, 'Business Pro': true, Advanced: true } },
                { name: 'Call Queues', tiers: { Standard: false, 'Business Pro': false, Advanced: true } },
                { name: 'Toll-Free Minutes', tiers: { Standard: 'Optional', 'Business Pro': '500', Advanced: '1000' } },
            ],
        },
        {
            category: 'Productivity',
            features: [
                { name: 'Team Presence', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Voicemail to Email', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'AI Voicemail Transcription', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'AI Call Transcriptions', tiers: { Standard: false, 'Business Pro': false, Advanced: true } },
                { name: 'AI Call Summaries', tiers: { Standard: false, 'Business Pro': false, Advanced: true } },
            ],
        },
        {
            category: 'Unified Communications Tools',
            features: [
                { name: 'Nemerald App for Mac', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Nemerald App for Windows', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Nemerald App for iOS', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Nemerald App for Android', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
            ],
        },
        {
            category: 'Meetings',
            features: [
                { name: 'Unlimited Conference Calls', tiers: { Standard: false, 'Business Pro': 'up to 10 participants', Advanced: 'up to 50 participants' } },
                { name: 'Unlimited Video Calling (Peer-to-Peer)', tiers: { Standard: false, 'Business Pro': false, Advanced: true } },
            ],
        },
        {
            category: 'Team Collaboration & Messaging',
            features: [
                { name: 'Team Messaging and Collaboration', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Private Group Messaging', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Business SMS', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: '1000' } },
            ],
        },
        {
            category: 'Analytics & Reports',
            features: [
                { name: 'Call History', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Call Log Reports', tiers: { Standard: false, 'Business Pro': true, Advanced: true } },
            ],
        },
        {
            category: 'Administration',
            features: [
                { name: 'Admin Portal', tiers: { Standard: false, 'Business Pro': true, Advanced: true } },
                { name: 'User Portal', tiers: { Standard: false, 'Business Pro': true, Advanced: true } },
                { name: 'Dashboard', tiers: { Standard: false, 'Business Pro': true, Advanced: true } },
                { name: 'Call Recording', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: true } },
                { name: 'Dedicated Account Manager', tiers: { Standard: false, 'Business Pro': false, Advanced: true } },
            ],
        },
        {
            category: 'Most Popular Integrations',
            features: [
                { name: 'Google Contacts', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: true } },
                { name: 'Microsoft 365 Contacts', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: true } },
                { name: 'HubSpot', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: true } },
                { name: 'Zendesk', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: true } },
                { name: 'Zoho', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: true } },
                { name: 'Microsoft Dynamics 365', tiers: { Standard: false, 'Business Pro': 'Optional', Advanced: true } },
                { name: 'Custom CRM', tiers: { Standard: false, 'Business Pro': 'Contact Sales', Advanced: 'Contact Sales' } },
            ],
        },
        {
            category: 'Phones',
            features: [
                { name: 'Bring Your Own Device (BYOD)', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Phone Lease Options: Desk and Conference Phones', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Desk Phone', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Conference Phone', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
                { name: 'Cordless Phone', tiers: { Standard: true, 'Business Pro': true, Advanced: true } },
            ],
        },
    ];

    // Helper to render checkmarks, dashes, or beautiful text badges
    const renderValue = (value) => {
        if (value === true) {
            return <CheckIcon className="mx-auto h-6 w-6 text-[#F08439]" aria-hidden="true" />;
        }
        if (value === false) {
            return <MinusIcon className="mx-auto h-5 w-5 text-gray-200" aria-hidden="true" />;
        }
        // Turns text like "Optional" or "500" into sleek gray UI pills
        return (
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-500/20">
                {value}
            </span>
        );
    };

    return (
        <Layout title="Pricing | Nemerald">

            {/* --- HERO / PRICING CARDS SECTION --- */}
            <PricingSection
                title="Transparent pricing for teams of all sizes"
                isMainHeader={true}
            />

            {/* --- DETAILED COMPARISON TABLE --- */}
            {/* Soft cream background pushes the pure-white table forward */}
            <section className="py-24 sm:py-32 bg-[#fffaf5]">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">

                    <div className="max-w-3xl mb-16 mx-auto text-center">
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Compare plan features</h2>
                        <p className="mt-4 text-lg text-gray-600">Find out exactly what's included in every tier.</p>
                    </div>

                    {/* Elevated Table Container */}
                    <div className="overflow-hidden rounded-[2rem] ring-1 ring-gray-900/5 shadow-2xl shadow-gray-900/10 bg-white">
                        <div className="overflow-x-auto">

                            <table
                                style={{ display: 'table', width: '100%' }}
                                className="min-w-[900px] table-fixed border-collapse m-0 border-hidden"
                            >
                                <thead className="bg-white sticky top-0 z-20">
                                    <tr>
                                        <th scope="col" className="py-8 px-6 text-sm font-semibold text-gray-900 w-[34%] border-0 border-b border-gray-200 bg-white">
                                            <span className="sr-only">Feature</span>
                                        </th>
                                        <th scope="col" className="py-8 px-6 text-center w-[22%] border-0 border-b border-gray-200 bg-white">
                                            <div className="text-xl font-bold text-gray-900">Standard</div>
                                            <div className="mt-1.5 text-sm text-gray-500 font-medium">For small teams</div>
                                        </th>

                                        {/* Highlighted "Business Pro" Header */}
                                        <th scope="col" className="relative py-8 px-6 text-center w-[22%] border-0 border-b border-gray-200 bg-[#fffaf5]">
                                            {/* Bold orange lip on top */}
                                            <div className="absolute inset-x-0 top-0 h-1.5 bg-[#F08439]"></div>

                                            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F08439]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#F08439] mb-3">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#F08439] animate-pulse"></span>
                                                Most Popular
                                            </div>
                                            <div className="text-xl font-bold text-[#F08439]">Business Pro</div>
                                        </th>

                                        <th scope="col" className="py-8 px-6 text-center w-[22%] border-0 border-b border-gray-200 bg-white">
                                            <div className="text-xl font-bold text-gray-900">Advanced</div>
                                            <div className="mt-1.5 text-sm text-gray-500 font-medium">For contact centers</div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {comparisonFeatures.map((section) => (
                                        <React.Fragment key={section.category}>
                                            {/* Category Divider Row - High-end line break design */}
                                            <tr>
                                                <th
                                                    colSpan={4}
                                                    scope="colgroup"
                                                    className="bg-white py-6 px-6 text-sm font-bold text-gray-900 uppercase tracking-widest border-0"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-gray-900">{section.category}</span>
                                                        <div className="h-px flex-1 bg-gray-200"></div>
                                                    </div>
                                                </th>
                                            </tr>

                                            {/* Feature Rows */}
                                            {section.features.map((feature) => (
                                                <tr key={feature.name} className="hover:bg-gray-50/60 transition-colors group">
                                                    <td className="py-5 px-6 text-sm text-gray-600 font-medium border-0 border-b border-gray-100 group-hover:text-gray-900 transition-colors">
                                                        {feature.name}
                                                    </td>
                                                    <td className="py-5 px-6 text-center border-0 border-b border-gray-100">
                                                        {renderValue(feature.tiers.Standard)}
                                                    </td>

                                                    {/* Highlighted "Business Pro" Body Column */}
                                                    <td className="relative py-5 px-6 text-center border-0 border-b border-gray-100 bg-[#fffaf5]/60 group-hover:bg-[#F08439]/[0.05] transition-colors">
                                                        {/* Subtle vertical border lines to box in the column */}
                                                        <div className="absolute inset-y-0 left-0 w-px bg-[#F08439]/15"></div>
                                                        <div className="absolute inset-y-0 right-0 w-px bg-[#F08439]/15"></div>

                                                        {renderValue(feature.tiers['Business Pro'])}
                                                    </td>

                                                    <td className="py-5 px-6 text-center border-0 border-b border-gray-100">
                                                        {renderValue(feature.tiers.Advanced)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- REUSED CTA SECTION --- */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-[#F08439] rounded-[2.5rem] px-6 py-16 shadow-2xl shadow-[#F08439]/20 sm:px-16 md:py-20 lg:flex lg:items-center lg:justify-between lg:gap-x-20">
                        <div className="absolute -top-24 -right-24 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-tr from-white/30 to-white/10 opacity-40" />
                        </div>
                        <div className="text-center lg:text-left lg:w-3/5">
                            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-white mb-4">
                                Still have questions?
                            </h2>
                            <p className="text-lg 2xl:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Our team of communication experts is here to help you find the perfect setup for your business. Let's talk it through.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 lg:mt-0 lg:w-2/5">
                            <Link to="/contacts" className="rounded-full bg-white px-8 py-4 text-base 2xl:text-lg font-semibold text-[#F08439] shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                                Talk to an Expert
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    );
}