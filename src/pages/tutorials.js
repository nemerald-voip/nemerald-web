import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

export default function Tutorials() {
    // Array holding your tutorial videos
    const tutorials = [
        {
            id: 1,
            title: "Transferring Calls: Yealink T46 Series",
            description: "Master attended and blind transfers on your Yealink T46 desk phone to seamlessly route clients to the right department or team member.",
            videoUrl: "https://www.youtube.com/embed/yWbL1XJruEs",
        },
        {
            id: 2,
            title: "Call Parking & Retrieval: Yealink Phones",
            description: "Learn how to place an active call on hold in the cloud and safely retrieve it from any other Yealink extension in your office.",
            videoUrl: "https://www.youtube.com/embed/73XNbqshaaE",
        },
        {
            id: 3,
            title: "Call Parking & Retrieval: Polycom Phones",
            description: "Step-by-step instructions for parking active customer calls and seamlessly retrieving them from different Polycom devices within your network.",
            videoUrl: "https://www.youtube.com/embed/vyg_jFPV1AY",
        },
        {
            id: 4,
            title: "Hosting Local Conferences on Polycom",
            description: "Discover how to easily merge active calls and host a seamless, multi-party conference call directly from your Polycom desk phone.",
            videoUrl: "https://www.youtube.com/embed/JoPb9LuNhC0",
        },
        {
            id: 6,
            title: "Managing Voicemail & Custom Greetings",
            description: "Make a great first impression. Learn the fastest ways to access your voicemail inbox and record professional, personalized away greetings.",
            videoUrl: "https://www.youtube.com/embed/-Zib-gHSrCI",
        },
        {
            id: 7,
            title: "Transferring Calls: Polycom VVX 400 Series",
            description: "Understand the key differences between warm (attended) and cold (blind) transfers, and execute them flawlessly on your VVX 400 device.",
            videoUrl: "https://www.youtube.com/embed/lq9AXulZFaU",
        },
        {
            id: 8,
            title: "Transferring Calls: Polycom VVX 250 Series",
            description: "Ensure your clients always reach the right person. Learn the fastest, most reliable methods for routing active calls on your Polycom VVX 250.",
            videoUrl: "https://www.youtube.com/embed/ChtVZ8drvmQ",
        },
        {
            id: 9,
            title: "Hardware Setup: Power & Network Connections",
            description: "Get up and running in minutes. Explore the two methods for powering your devices (PoE vs. Power Adapters) and securely connecting to the internet.",
            videoUrl: "https://www.youtube.com/embed/S2Di5r_cu5Q",
        }
    ];

    return (
        <Layout title="Tutorials & Guides | Nemerald">

            <div className="relative isolate bg-[#f9fafb] min-h-screen pb-24">

                {/* --- AMBIENT BACKGROUND GLOW --- */}
                <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                    <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F08439] to-[#F08439]/10 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" />
                </div>

                {/* --- HERO SECTION --- */}
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 pt-24 pb-16 sm:pt-32 lg:px-8 text-center">
                    <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-[#d97530] ring-1 ring-[#F08439]/15 mb-6">
                        <PlayCircleIcon className="w-5 h-5 inline-block mr-2 -mt-0.5" />
                        Video Library
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl 2xl:text-6xl">
                        Tutorials & Guides
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                        Learn how to get the most out of your Nemerald phone system. From initial setup to advanced routing, we've got you covered.
                    </p>
                </div>

                {/* --- VIDEO GRID --- */}
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-12">
                        {tutorials.map((tutorial) => (
                            <div key={tutorial.id} className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-gray-900/5 hover:shadow-xl hover:shadow-[#F08439]/10 hover:ring-[#F08439]/20 transition-all duration-300">

                                {/* Video Iframe Container - aspect-video perfectly forces a 16:9 ratio */}
                                <div className="aspect-video w-full bg-gray-100 relative">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={tutorial.videoUrl}
                                        title={tutorial.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                {/* Text Container */}
                                <div className="flex flex-1 flex-col p-6 sm:p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#F08439] transition-colors">
                                        {tutorial.title}
                                    </h3>
                                    <p className="mt-3 text-base text-gray-600 leading-relaxed flex-1">
                                        {tutorial.description}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* --- REUSED CTA SECTION (For users who still need help) --- */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-[#F08439] rounded-[2.5rem] px-6 py-16 shadow-2xl shadow-[#F08439]/20 sm:px-16 md:py-20 lg:flex lg:items-center lg:justify-between lg:gap-x-20">
                        <div className="absolute -top-24 -right-24 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-tr from-white/30 to-white/10 opacity-40" />
                        </div>
                        <div className="text-center lg:text-left lg:w-3/5">
                            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-white mb-4">
                                Still need help?
                            </h2>
                            <p className="text-lg 2xl:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Our support team is available 24/7 to help you troubleshoot, configure, or optimize your system.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 lg:mt-0 lg:w-2/5">
                            <Link to="/contacts" className="rounded-full bg-white px-8 py-4 text-base 2xl:text-lg font-semibold text-[#F08439] shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    );
}