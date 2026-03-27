import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
    CurrencyDollarIcon, 
    HandThumbUpIcon, 
    ShieldCheckIcon, 
    UserGroupIcon,
    ComputerDesktopIcon,
    BuildingOfficeIcon,
    WifiIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

export default function Partners() {
    return (
        <Layout title="Partner Program | Nemerald">
            
            {/* --- HERO SECTION --- */}
            <div className="relative isolate overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F08439] to-[#F08439]/20 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:gap-x-16 2xl:gap-x-24">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:w-1/2 lg:flex-auto">
                            <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-[#d97530] ring-1 ring-[#F08439]/15 mb-6">
                                Nemerald Partner Program
                            </div>
                            <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl 2xl:text-6xl leading-tight">
                                Grow your business with industry-leading communications.
                            </h1>
                            <p className="mt-6 text-lg md:text-xl 2xl:text-2xl leading-8 text-gray-600 font-medium">
                                Build a powerful stream of lifetime recurring revenue. Partner with Nemerald to offer your clients an AI-powered, enterprise-grade business phone system without the enterprise hassle.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link to="/contacts" className="rounded-full bg-[#F08439] px-8 py-3.5 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-[#d97530] hover:shadow-md transition-all duration-300">
                                    Become a Partner
                                </Link>
                                <a href="#how-it-works" className="text-sm md:text-base font-semibold leading-6 text-gray-900 hover:text-[#F08439] transition-colors">
                                    View Commission Tiers <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        
                        <div className="mt-16 lg:mt-0 lg:w-1/2 lg:flex-shrink-0">
                            {/* NOTE: Replace this image source with the AI generated Hero Image */}
                            <div className="relative rounded-[2.5rem] bg-gray-50 ring-1 ring-gray-900/5 shadow-2xl p-4 sm:p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F08439]/10 to-transparent opacity-50 z-0"></div>
                                <img
                                    src="/img/partners/partnership.png" 
                                    alt="Partnership collaboration"
                                    className="relative z-10 w-full h-auto object-contain rounded-2xl drop-shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- WHY PARTNER WITH US --- */}
            <section className="py-24 sm:py-32 bg-[#fffaf5]">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            Why become a Nemerald Partner?
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 font-medium">
                            We don't just hand you a product and walk away. We provide the tools, the support, and the revenue share you need to actually grow your bottom line.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-12">
                        {[
                            {
                                title: "Lifetime Revenue Share",
                                description: "Earn lucrative, recurring monthly commissions for the entire lifespan of every client you refer to us. If they stay with us, you keep getting paid.",
                                icon: CurrencyDollarIcon,
                            },
                            {
                                title: "Zero Channel Conflict",
                                description: "We protect our partners. When you register a deal with Nemerald, it's yours. We work alongside you to help close the account, not compete against you.",
                                icon: ShieldCheckIcon,
                            },
                            {
                                title: "White-Glove Onboarding",
                                description: "You don't need to be a telecom expert. You bring the client, and our dedicated engineering team handles the porting, provisioning, and onboarding.",
                                icon: HandThumbUpIcon,
                            },
                            {
                                title: "Dedicated Channel Support",
                                description: "Get direct access to a dedicated partner success manager. No jumping through hoops or waiting on generic support queues when your clients need help.",
                                icon: UserGroupIcon,
                            },
                        ].map((feature, i) => (
                            <div key={i} className="relative overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg hover:shadow-[#F08439]/10 hover:ring-[#F08439]/20 transition-all duration-300 group">
                                <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-bl from-[#F08439]/20 to-transparent rounded-full blur-3xl group-hover:bg-[#F08439]/30 transition-colors duration-500 z-0"></div>
                                <div className="relative z-10">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/15">
                                        <feature.icon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl 2xl:text-2xl font-semibold tracking-tight text-gray-900 mb-4">{feature.title}</h3>
                                    <p className="text-base 2xl:text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- EARNING POTENTIAL --- */}
            <section id="how-it-works" className="py-24 sm:py-32 bg-white border-b border-gray-100">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-24">
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            Limitless earning potential
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 font-medium">
                            There are no caps on your commissions. Whether you refer a handful of local businesses or hundreds of enterprise accounts, your recurring revenue scales effortlessly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-12 text-center">
                        {[
                            { clients: "5 Clients", revenue: "$6,000", subtitle: "Estimated yearly revenue" },
                            { clients: "20 Clients", revenue: "$24,000", subtitle: "Estimated yearly revenue", popular: true },
                            { clients: "100+ Clients", revenue: "$120,000+", subtitle: "Estimated yearly revenue" },
                        ].map((tier, i) => (
                            <div key={i} className={`rounded-[2rem] p-8 sm:p-10 transition-all duration-300 flex flex-col items-center justify-center relative ${
                                tier.popular 
                                ? 'bg-gradient-to-b from-[#fffaf5] to-white ring-2 ring-[#F08439] shadow-xl shadow-[#F08439]/15 scale-105 z-10' 
                                : 'bg-white ring-1 ring-gray-200 shadow-sm hover:shadow-lg'
                            }`}>
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex rounded-full bg-[#F08439] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                                            Partner Average
                                        </span>
                                    </div>
                                )}
                                <div className="inline-flex items-center justify-center rounded-full bg-gray-50 px-4 py-1.5 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/20 mb-6">
                                    {tier.clients}
                                </div>
                                <div className="text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3">
                                    {tier.revenue}
                                </div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{tier.subtitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- WHO IS THIS FOR --- */}
            <section className="py-24 sm:py-32 bg-[#fffaf5]">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                        
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                                The perfect addition to your service portfolio.
                            </h2>
                            <p className="mt-6 text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
                                You don't need to be a telecom provider to sell Nemerald. If you help businesses modernize their tech stack, manage their networks, or improve their operations, a premium voice solution is the ultimate value-add for your clients.
                            </p>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { name: "Managed Service Providers (MSPs)", icon: ComputerDesktopIcon },
                                { name: "IT Consultants & Integrators", icon: CpuChipIcon },
                                { name: "Web Agencies & Digital Studios", icon: WifiIcon },
                                { name: "Commercial Real Estate Firms", icon: BuildingOfficeIcon },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
                                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#F08439]/10 text-[#F08439]">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-base font-semibold text-gray-900">{item.name}</div>
                                </div>
                            ))}
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
                                Ready to grow together?
                            </h2>
                            <p className="text-lg 2xl:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Leave your details and our Channel Management team will reach out with the complete partner package, commission breakdowns, and onboarding details.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 lg:mt-0 lg:w-2/5">
                            <Link to="/contacts" className="rounded-full bg-white px-8 py-4 text-base 2xl:text-lg font-semibold text-[#F08439] shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                                Apply to Partner Program
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    );
}