import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { WrenchScrewdriverIcon, ServerStackIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function ManagedIT() {
    return (
        <Layout title="Managed IT Services | Nemerald">
            
            {/* --- HERO SECTION --- */}
            <div className="relative isolate overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F08439] to-[#F08439]/20 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="mx-auto max-w-3xl">
                        <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-[#d97530] ring-1 ring-[#F08439]/15 mb-6">
                            Managed IT Services
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                            Focus on your business. We'll handle the tech.
                        </h1>
                        <p className="mt-6 text-lg md:text-xl font-medium leading-8 text-gray-600">
                            Proactive monitoring, network security, and responsive helpdesk support to keep your employees productive and your data safe.
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
                                title: "Proactive IT Support",
                                description: "We monitor your systems 24/7 to identify and resolve issues before they cause downtime for your team.",
                                icon: WrenchScrewdriverIcon,
                            },
                            {
                                title: "Network & Infrastructure",
                                description: "Expert management of your routers, switches, servers, and cloud environments to ensure peak performance.",
                                icon: ServerStackIcon,
                            },
                            {
                                title: "Cybersecurity & Backup",
                                description: "Protect your sensitive business data with enterprise-grade firewalls, antivirus, and automated cloud backups.",
                                icon: LockClosedIcon,
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
                                Ready to simplify your IT?
                            </h2>
                            <p className="text-lg 2xl:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Get a custom managed services plan tailored to the exact size and needs of your business.
                            </p>
                        </div>
                        <div className="mt-10 flex justify-center lg:justify-end lg:mt-0 lg:w-2/5">
                            <Link to="/contacts" className="rounded-full bg-white px-8 py-4 text-base 2xl:text-lg font-semibold text-[#F08439] shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                                Talk to an IT Expert
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    );
}