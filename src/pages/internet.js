import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { WifiIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Internet() {
    return (
        <Layout title="Business Internet | Nemerald">
            
            {/* --- HERO SECTION --- */}
            <div className="relative isolate overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
                {/* Ambient glow matching the home page */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F08439] to-[#F08439]/20 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="mx-auto max-w-3xl">
                        <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-[#d97530] ring-1 ring-[#F08439]/15 mb-6">
                            Business Internet
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                            Fast, reliable connectivity for modern teams
                        </h1>
                        <p className="mt-6 text-lg md:text-xl font-medium leading-8 text-gray-600">
                            Keep your business running smoothly with dedicated fiber, high-speed broadband, and proactive network support designed for maximum uptime.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- FEATURES GRID --- */}
            <section className="py-16 sm:py-24 bg-[#fffaf5]">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-12">
                        {[
                            {
                                title: "High-Speed Connectivity",
                                description: "Fiber and broadband options scaled to your team's bandwidth needs, ensuring no dropped calls or slow uploads.",
                                icon: WifiIcon,
                            },
                            {
                                title: "Automatic Failover",
                                description: "Keep your business online even during outages with redundant, secondary backup connections.",
                                icon: ShieldCheckIcon,
                            },
                            {
                                title: "Dedicated Support SLA",
                                description: "Stop waiting on hold with massive telecom providers. Get direct access to our local support team.",
                                icon: ClockIcon,
                            },
                        ].map((feature, i) => (
                            <div key={i} className="group relative bg-white rounded-3xl p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg hover:shadow-[#F08439]/10 hover:ring-[#F08439]/20 transition-all duration-300">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/15">
                                    <feature.icon className="h-7 w-7" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl 2xl:text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-base 2xl:text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-[#F08439] rounded-[2.5rem] px-6 py-16 shadow-2xl shadow-[#F08439]/20 sm:px-16 md:py-20 lg:flex lg:items-center lg:justify-between lg:gap-x-20">
                        <div className="absolute -top-24 -right-24 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-tr from-white/30 to-white/10 opacity-40" />
                        </div>
                        <div className="text-center lg:text-left lg:w-3/5">
                            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-white mb-4">
                                Need a better connection?
                            </h2>
                            <p className="text-lg 2xl:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Let us check availability at your address and find the perfect internet package for your business needs.
                            </p>
                        </div>
                        <div className="mt-10 flex justify-center lg:justify-end lg:mt-0 lg:w-2/5">
                            <Link to="/contacts" className="rounded-full bg-white px-8 py-4 text-base 2xl:text-lg font-semibold text-[#F08439] shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                                Get a Free Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    );
}