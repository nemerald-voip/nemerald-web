import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import PricingSection from '../components/PricingSection';

import {
    ClipboardDocumentCheckIcon,
    ArrowsRightLeftIcon,
    DevicePhoneMobileIcon,
    UserCircleIcon,
    InboxArrowDownIcon,
    ComputerDesktopIcon,
} from '@heroicons/react/24/outline'

export default function Home() {
    const[openFaq, setOpenFaq] = useState(0);

    return (
        <Layout title="Nemerald | Business Phone System Built for Modern Teams">

            {/* --- HERO SECTION --- */}
            <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#fffaf5] via-[#F08439]/15 to-[#F08439]/40 m-4 sm:m-6">

                {/* Background blurred blob */}
                <div
                    aria-hidden="true"
                    className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                        className="aspect-1108/632 w-277 bg-[#F08439] opacity-25"
                    />
                </div>

                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-20 lg:items-center lg:gap-x-12 2xl:gap-x-20">

                    <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:w-5/12 2xl:w-[40%] lg:pt-8">
                        <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                            AI-Powered Business Phone System Built for Modern Teams
                        </h1>
                        <p className="mt-8 text-base font-medium text-pretty text-gray-700 sm:text-lg lg:text-xl/8 2xl:text-2xl/9">
                            Desk phones, mobile apps, call routing, voicemail, and AI analytics in one business-ready system.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-4">
                            {/* Updated to link to Contacts page */}
                            <Link
                                to="/contacts"
                                className="rounded-full bg-[#F08439] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#d97530] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F08439] transition-colors 2xl:px-8 2xl:py-3.5 2xl:text-base"
                            >
                                Book a Demo
                            </Link>
                            {/* Updated to link to Pricing page */}
                            <Link 
                                to="/pricing" 
                                className="text-sm font-semibold text-gray-900 border border-gray-900 rounded-full px-6 py-2.5 hover:bg-gray-900 hover:text-white transition-colors 2xl:px-8 2xl:py-3.5 2xl:text-base"
                            >
                                See Pricing
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto mt-16 flex w-full max-w-2xl sm:mt-24 lg:mt-0 lg:max-w-none lg:w-7/12 2xl:w-[60%] justify-center">
                        <img
                            alt="App screenshot"
                            src="/img/home/main.png"
                            className="w-full h-auto object-contain drop-shadow-xl"
                        />
                    </div>
                </div>
            </div>

            {/* --- DEVICES GRID --- */}
            {/* Added id="devices" so we can smooth scroll here later */}
            <section id="devices" className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">

                    <div className="text-center mb-16 sm:mb-24">
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
                            Connect from Anywhere, on Any Device
                        </h2>
                        <p className="text-lg md:text-xl 2xl:text-2xl font-medium text-gray-600 max-w-3xl mx-auto">
                            Equip your team with premium VoIP hardware, download our powerful desktop and mobile apps, or <span className="text-[#F08439]">bring your existing devices</span> to maximize your savings.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 2xl:gap-12">
                        {[
                            { title: "Cordless", sub: "VoIP phones", img: "device-1.png" },
                            { title: "Desk", sub: "VoIP phones", img: "device-2.png" },
                            { title: "Conference", sub: "VoIP phones", img: "device-3.png" },
                            { title: "Network Equipment", sub: "VoIP", img: "device-4.png" },
                            { title: "Headsets", sub: "VoIP", img: "device-5.png" },
                            { title: "Desktop & Mobile", sub: "Applications", img: "device-6.png" },
                        ].map((device, i) => (
                            <div
                                key={i}
                                className="group relative bg-white rounded-3xl p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-lg hover:shadow-[#F08439]/10 hover:ring-[#F08439]/20 flex items-center overflow-hidden h-[220px] 2xl:h-[260px]"
                            >
                                <div className="absolute -left-12 -top-12 w-48 h-48 2xl:w-64 2xl:h-64 bg-gradient-to-br from-[#F08439]/40 to-[#F08439]/5 rounded-full blur-2xl group-hover:bg-[#F08439]/30 transition-colors duration-500 z-0"></div>

                                <div className="relative z-10 w-[45%] h-full flex items-center justify-center">
                                    <img
                                        src={`/img/home/${device.img}`}
                                        alt={device.title}
                                        className="max-h-[140px] 2xl:max-h-[170px] w-auto drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-xl transition-all duration-500 object-contain"
                                    />
                                </div>

                                <div className="relative z-10 w-[55%] pl-6 pr-2">
                                    <h3 className="text-xl 2xl:text-2xl font-semibold text-gray-900 leading-tight">
                                        {device.title}
                                    </h3>
                                    <p className="text-base 2xl:text-lg font-medium text-gray-500 mt-1">
                                        {device.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CORE FEATURES / BENEFITS --- */}
            <section className="py-24 sm:py-32 bg-[#fffaf5]">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            Everything your team needs to communicate better
                        </h2>
                        <p className="mt-6 text-lg md:text-xl 2xl:text-2xl font-medium text-gray-600">
                            From business calling and advanced routing to AI insights and contact center tools,
                            Nemerald brings your communications into one modern platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 2xl:gap-12">
                        {[
                            {
                                title: "Business Phone",
                                headline: "A reliable business phone system with AI-powered communications.",
                                description:
                                    "Unify desk phones, mobile apps, voicemail, messaging, and calling features in one platform built for modern business.",
                            },
                            {
                                title: "Call Routing",
                                headline: "Advanced routing that keeps your business available.",
                                description:
                                    "Use ring groups, IVRs, schedules, and failover rules to make sure every call reaches the right destination.",
                            },
                            {
                                title: "AI Insights",
                                headline: "Transform everyday calls into actionable insight.",
                                description:
                                    "AI call transcriptions with summaries and action items, AI voicemail transcriptions, recordings, call logs, and reporting help teams respond faster and make smarter decisions.",
                            },
                            {
                                title: "Contact Center",
                                headline: "Built-in tools for queues, agents, and customer experience.",
                                description:
                                    "Manage agents, call queues, and performance from one place with tools designed for growing teams.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-lg hover:shadow-[#F08439]/10 hover:ring-[#F08439]/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F08439]/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                <div className="relative z-10">
                                    <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-[#d97530] ring-1 ring-[#F08439]/15">
                                        {feature.title}
                                    </div>

                                    <h3 className="mt-6 text-2xl 2xl:text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
                                        {feature.headline}
                                    </h3>

                                    <p className="mt-4 text-base md:text-lg 2xl:text-xl leading-8 text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SWITCHING IS EASY --- */}
            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            Switching to Nemerald is simple
                        </h2>
                        <p className="mt-6 text-lg md:text-xl 2xl:text-2xl font-medium text-gray-600">
                            Choose the right plan, transfer your numbers, and go live with desk phones,
                            mobile apps, and desktop calling — with guided onboarding every step of the way.
                        </p>
                    </div>

                    <div className="relative mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold tracking-tight text-gray-900 leading-tight">
                                From signup to go-live, without the usual hassle
                            </h3>
                            <p className="mt-4 text-base md:text-lg 2xl:text-xl text-gray-600 leading-8">
                                We make it easy to move from your current provider with a clear rollout path
                                designed for modern business teams.
                            </p>

                            <dl className="mt-10 space-y-8">
                                {[
                                    {
                                        name: "Choose your plan",
                                        description:
                                            "Pick the right setup for your team, whether you need a simple business phone system or advanced contact center tools.",
                                        icon: ClipboardDocumentCheckIcon,
                                    },
                                    {
                                        name: "Transfer your numbers",
                                        description:
                                            "Move your existing business numbers with guided porting support to help make the transition smooth.",
                                        icon: ArrowsRightLeftIcon,
                                    },
                                    {
                                        name: "Go live with phones and apps",
                                        description:
                                            "Get your team connected with desk phones, mobile apps, and desktop softphones so everyone can start working quickly.",
                                        icon: DevicePhoneMobileIcon,
                                    },
                                ].map((item) => (
                                    <div key={item.name} className="relative pl-20">
                                        <dt className="text-lg md:text-xl font-semibold text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/15">
                                                <item.icon className="h-7 w-7" aria-hidden="true" />
                                            </div>
                                            {item.name}
                                        </dt>
                                        <dd className="mt-2 text-base md:text-lg text-gray-600 leading-8">
                                            {item.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#F08439]/10 via-[#F08439]/5 to-transparent blur-2xl"></div>
                            <div className="relative overflow-hidden rounded-[2rem] bg-[#fffaf5] shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8">
                                <img
                                    src="/img/home/switching-step-1.png"
                                    alt="Business phone onboarding with dashboard, desk phone, laptop, and mobile app"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-20 sm:mt-24 lg:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#F08439]/10 via-[#F08439]/5 to-transparent blur-2xl"></div>
                            <div className="relative overflow-hidden rounded-[2rem] bg-[#fffaf5] shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8">
                                <img
                                    src="/img/home/switching-step-2.png"
                                    alt="Guided onboarding and business communications setup with devices and support interface"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold tracking-tight text-gray-900 leading-tight">
                                Built to make switching easier
                            </h3>
                            <p className="mt-4 text-base md:text-lg 2xl:text-xl text-gray-600 leading-8">
                                From onboarding to hardware choices, we help remove the friction that usually
                                slows down business phone migrations.
                            </p>

                            <dl className="mt-10 space-y-8">
                                {[
                                    {
                                        name: "Guided onboarding",
                                        description:
                                            "Our team helps you plan, configure, and launch your service with confidence.",
                                        icon: UserCircleIcon,
                                    },
                                    {
                                        name: "Free number porting",
                                        description:
                                            "Keep your existing business numbers without extra porting fees.",
                                        icon: InboxArrowDownIcon,
                                    },
                                    {
                                        name: "Bring your own devices or buy hardware from us",
                                        description:
                                            "Use supported existing phones or choose new hardware from our lineup to fit your business.",
                                        icon: ComputerDesktopIcon,
                                    },
                                ].map((item) => (
                                    <div key={item.name} className="relative pl-20">
                                        <dt className="text-lg md:text-xl font-semibold text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F08439]/10 text-[#F08439] ring-1 ring-[#F08439]/15">
                                                <item.icon className="h-7 w-7" aria-hidden="true" />
                                            </div>
                                            {item.name}
                                        </dt>
                                        <dd className="mt-2 text-base md:text-lg text-gray-600 leading-8">
                                            {item.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SOCIAL PROOF / TRUST --- */}
            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
                        <div className="mx-auto w-full max-w-2xl lg:mx-0">
                            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                                Compatible with the brands businesses already trust
                            </h2>

                            <p className="mt-6 text-lg md:text-xl 2xl:text-2xl font-medium text-gray-600 leading-8">
                                Nemerald works with leading business communications brands for desk phones,
                                conference phones, headsets, and networking equipment — giving your team the
                                flexibility to deploy new hardware or keep compatible devices already in use.
                            </p>

                            <dl className="mt-8 space-y-4">
                                {[
                                    "Certified and supported vendor ecosystem",
                                    "Bring your own devices or purchase hardware from us",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#F08439] shrink-0" />
                                        <p className="text-base md:text-lg 2xl:text-xl text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </dl>

                            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-4">
                                {/* Updated to scroll up to the devices section smoothly */}
                                <Link
                                    to="#devices"
                                    className="rounded-full bg-[#F08439] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#d97530] transition-colors 2xl:px-8 2xl:py-3.5 2xl:text-base"
                                >
                                    Explore Devices
                                </Link>
                                {/* Updated to link to Contacts */}
                                <Link
                                    to="/contacts"
                                    className="text-sm font-semibold text-gray-900 border border-gray-900 rounded-full px-6 py-2.5 hover:bg-gray-900 hover:text-white transition-colors 2xl:px-8 2xl:py-3.5 2xl:text-base"
                                >
                                    Contact Sales
                                </Link>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="rounded-[2rem] bg-[#fffaf5] p-8 sm:p-10 2xl:p-12 shadow-sm ring-1 ring-gray-900/5">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 items-center">
                                    {[
                                        { name: "Yealink", src: "/img/logos/yealink.png" },
                                        { name: "Poly", src: "/img/logos/poly.png" },
                                        { name: "Grandstream", src: "/img/logos/grandstream.png" },
                                        { name: "Snom", src: "/img/logos/snom.png" },
                                        { name: "Cisco", src: "/img/logos/cisco.png" },
                                        { name: "Fanvil", src: "/img/logos/fanvil.png" },
                                        { name: "Jabra", src: "/img/logos/panasonic.png" },
                                        { name: "EPOS", src: "/img/logos/htek.png" },
                                        { name: "Algo", src: "/img/logos/algo.png" },
                                    ].map((logo) => (
                                        <div
                                            key={logo.name}
                                            className="flex items-center justify-center rounded-2xl bg-white/80 px-6 py-5 ring-1 ring-gray-900/5 transition-all duration-300 hover:bg-white hover:shadow-md"
                                        >
                                            <img
                                                src={logo.src}
                                                alt={logo.name}
                                                className="max-h-10 w-full object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRICING SECTION --- */}
            <PricingSection />


            {/* --- FAQ --- */}
            {/* Added id="faq" so we can smooth scroll here later */}
            <section id="faq" className="py-24 sm:py-32 bg-[#fffaf5]">
                <div className="mx-auto max-w-4xl 2xl:max-w-5xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            Frequently asked questions
                        </h2>
                        <p className="mt-6 text-lg md:text-xl 2xl:text-2xl font-medium text-gray-600 leading-8">
                            Everything you need to know about switching, setup, devices, and pricing.
                        </p>
                    </div>

                    <div className="mt-16 space-y-4">
                        {[
                            {
                                question: "Can I keep my existing business phone numbers?",
                                answer:
                                    "Yes. We offer number porting so you can keep your existing business numbers when moving to Nemerald.",
                            },
                            {
                                question: "Do you support desk phones, mobile apps, and desktop apps?",
                                answer:
                                    "Yes. Nemerald supports desk phones, mobile applications, and desktop softphones so your team can stay connected from anywhere.",
                            },
                            {
                                question: "Can I use my existing phones and hardware?",
                                answer:
                                    "In many cases, yes. We support a wide range of compatible devices, and we can also help you choose and deploy new hardware if needed.",
                            },
                            {
                                question: "How long does setup usually take?",
                                answer:
                                    "Setup time depends on the size of your deployment, number porting requirements, and hardware needs. Many teams can get up and running quickly with guided onboarding.",
                            },
                            {
                                question: "Do you offer help with onboarding and number porting?",
                                answer:
                                    "Yes. We provide guided onboarding and support throughout setup, provisioning, and number transfer.",
                            },
                            {
                                question: "Is Nemerald a good fit for remote or hybrid teams?",
                                answer:
                                    "Yes. Nemerald is built for modern teams and supports office, remote, and hybrid work with desk phones, mobile apps, and desktop calling.",
                            },
                            {
                                question: "Do you offer contact center features?",
                                answer:
                                    "Yes. Advanced plans include contact center tools for queues, agents, reporting, and customer experience workflows.",
                            },
                            {
                                question: "How does pricing work?",
                                answer:
                                    "Pricing varies based on the number of extensions and the plan you choose. You can preview starting prices on the homepage or contact us for a custom quote.",
                            },
                        ].map((item, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={item.question}
                                    className={`rounded-3xl bg-white shadow-sm ring-1 transition-all duration-300 ${isOpen
                                        ? 'ring-[#F08439]/20 shadow-lg shadow-[#F08439]/10'
                                        : 'ring-gray-900/5'
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                                    >
                                        <span className="text-lg md:text-xl font-semibold text-gray-900">
                                            {item.question}
                                        </span>
                                        <span
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen
                                                ? 'bg-[#F08439] text-white'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            <svg
                                                className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'
                                                    }`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
                                            </svg>
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 sm:px-8">
                                                <p className="text-base md:text-lg text-gray-600 leading-8">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                Still have questions?
                            </h2>
                            <p className="text-lg 2xl:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Our team of communication experts is here to help you find the perfect setup for your business. Let's talk it through.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 lg:mt-0 lg:w-2/5">
                            <Link
                                to="/contacts"
                                className="rounded-full bg-white px-8 py-4 text-base 2xl:text-lg font-semibold text-[#F08439] shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
                            >
                                Talk to an Expert
                            </Link>

                            {/* Updated to link to the new Tutorials page we built instead of a dead # link! */}
                            <Link
                                to="/tutorials"
                                className="text-sm 2xl:text-base font-semibold leading-6 text-white hover:text-white/80 transition-colors whitespace-nowrap px-4 py-2"
                            >
                                Watch Tutorials <span aria-hidden="true">→</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

        </Layout>
    );
}