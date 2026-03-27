import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
    MapPinIcon, 
    DocumentCheckIcon, 
    ServerStackIcon, 
    ArrowsRightLeftIcon, 
    ClockIcon, 
    SparklesIcon 
} from '@heroicons/react/24/outline';

export default function WhyNemerald() {
    return (
        <Layout title="Why Nemerald | Modern Business Communications">
            
            {/* --- HERO SECTION --- */}
            <div className="relative isolate overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F08439] to-[#F08439]/20 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:gap-x-16 2xl:gap-x-24">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:w-1/2 lg:flex-auto">
                            <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-[#d97530] ring-1 ring-[#F08439]/15 mb-6">
                                The Nemerald Difference
                            </div>
                            <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl 2xl:text-6xl leading-tight">
                                National reliability. <br/><span className="text-[#F08439]">Local dedication.</span>
                            </h1>
                            <p className="mt-6 text-lg md:text-xl 2xl:text-2xl leading-8 text-gray-600 font-medium">
                                We combine the enterprise-grade infrastructure of a massive telecom provider with the hands-on, localized support of a dedicated IT partner. No contracts, no compromises.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link to="/contacts" className="rounded-full bg-[#F08439] px-8 py-3.5 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-[#d97530] hover:shadow-md transition-all duration-300">
                                    Get Started Today
                                </Link>
                                <a href="#core-benefits" className="text-sm md:text-base font-semibold leading-6 text-gray-900 hover:text-[#F08439] transition-colors">
                                    See why we're different <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        
                        <div className="mt-16 lg:mt-0 lg:w-1/2 lg:flex-shrink-0">
                            <img
                                src="/img/why-nemerald/nemerald-cloud-infrastructure.png" 
                                alt="Nemerald Cloud Infrastructure"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- STATS BANNER --- */}
            <section className="bg-gray-900 py-16 sm:py-20 relative isolate overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F08439]/20 to-transparent opacity-20"></div>
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8 relative z-10">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-12 text-center sm:grid-cols-3">
                        {[
                            { id: 1, name: 'Years of continuous innovation', value: '20+' },
                            { id: 2, name: 'Active, satisfied business customers', value: '500+' },
                            { id: 3, name: 'Industry partners actively scaling with us', value: '100+' },
                        ].map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-3">
                                <dt className="text-base font-medium leading-7 text-gray-400">{stat.name}</dt>
                                <dd className="order-first text-5xl sm:text-6xl font-semibold tracking-tight text-white">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* --- CORE BENEFITS GRID --- */}
            <section id="core-benefits" className="py-24 sm:py-32 bg-[#fffaf5]">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-24">
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            Why Southern California businesses are switching to Nemerald
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 font-medium">
                            Giant telecom companies trap you in contracts and leave you on hold. We believe in earning your business every single month through superior tech and relentless support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-12">
                        {[
                            {
                                title: "No Long-Term Contracts",
                                description: "We don't lock you in. No rigid commitments and no cancellation fees. This motivates our team to work our hardest to fully satisfy your needs every single day.",
                                icon: DocumentCheckIcon,
                            },
                            {
                                title: "We Are Local",
                                description: "Based right here in SoCal. We can fully set up your office with the needed devices in no time, providing a hands-on, personal approach the giants can't match.",
                                icon: MapPinIcon,
                            },
                            {
                                title: "24/7 Expert Support",
                                description: "Our engineering and support teams work around the clock. When you reach out, you get immediate assistance so your business can keep flowing freely.",
                                icon: ClockIcon,
                            },
                            {
                                title: "Secure & Reliable",
                                description: "Powered by multiple geographically redundant US data centers. We monitor our servers 24/7/365 to guarantee high-quality, secure connections at all times.",
                                icon: ServerStackIcon,
                            },
                            {
                                title: "Free Number Porting",
                                description: "Keep your established business identity. We seamlessly transfer your existing numbers over to our system, so you never have to worry about losing a lead.",
                                icon: ArrowsRightLeftIcon,
                            },
                            {
                                title: "Enterprise Features, Standard",
                                description: "From AI-transcription and true HD Voice to unlimited calls across the US, Canada, and Mexico—you get premium capabilities without the premium price tag.",
                                icon: SparklesIcon,
                            },
                        ].map((feature, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg hover:shadow-[#F08439]/10 hover:ring-[#F08439]/20 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F08439]/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"></div>
                                <div className="relative z-10">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-900 ring-1 ring-gray-900/10 group-hover:bg-[#F08439] group-hover:text-white group-hover:ring-[#F08439] transition-all duration-300">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- OUR MISSION / ABOUT TEXT --- */}
            <section className="py-24 sm:py-32 bg-white overflow-hidden">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                                    Empowering teams through seamless technology.
                                </h2>
                                <div className="mt-8 space-y-6 text-lg md:text-xl text-gray-600 leading-8">
                                    <p>
                                        At Nemerald, we are deeply passionate about the services we provide. Our goal isn't just to sell you a phone system; it's to solve the IT and telecommunications challenges that slow your business down.
                                    </p>
                                    <p>
                                        As communication tools evolve rapidly, businesses are forced to adapt. We view our role as both a provider and an educator—simplifying complex technology, demonstrating its unlimited capabilities, and making the transition completely painless.
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        We build the best solutions in the industry so you can focus on building your business.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Image Container with premium decorative background */}
                        <div className="relative">
                            <div className="absolute -inset-y-12 -inset-x-12 bg-gradient-to-br from-[#F08439]/10 to-transparent rounded-[3rem] blur-2xl z-0"></div>
                            <img
                                src="/img/why-nemerald/nemerald-team-collaborating.png"
                                alt="Nemerald Team Collaborating"
                                className="relative z-10 rounded-[2.5rem] shadow-2xl ring-1 ring-gray-900/10 w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- REUSED CTA SECTION --- */}
            <section className="py-24 bg-[#fffaf5]">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-[#F08439] rounded-[2.5rem] px-6 py-16 shadow-2xl shadow-[#F08439]/20 sm:px-16 md:py-20 lg:flex lg:items-center lg:justify-between lg:gap-x-20">
                        <div className="absolute -top-24 -right-24 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-tr from-white/30 to-white/10 opacity-40" />
                        </div>
                        <div className="text-center lg:text-left lg:w-3/5">
                            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-white mb-4">
                                Ready to upgrade your communications?
                            </h2>
                            <p className="text-lg 2xl:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Ditch the contracts and experience the power of truly modern business voice. Let our local experts find the perfect setup for your team.
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