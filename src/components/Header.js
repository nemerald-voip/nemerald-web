import React from 'react';
import Link from '@docusaurus/Link';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Partners', href: '/partners' },
    { name: 'Why Nemerald', href: '/why-nemerald' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacts', href: '/contacts' },
];

const services = [
    { name: 'Business Phone System', href: '/' }, // Points to your main homepage
    { name: 'Business Internet', href: '/internet' },
    { name: 'Managed IT Services', href: '/managed-it' },
];

export default function Header() {
    return (
        <Disclosure as="header" className="bg-white  sticky top-0 z-[100]">
            {({ open }) => (
                <>
                    <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                        {/* Reduced mobile height to 70px for a tighter look */}
                        <div className="relative flex h-[70px] xl:h-[130px] items-center">

                            {/* 1. LEFT: HAMBURGER BUTTON (Mobile Only) */}
                            <div className="flex items-center xl:hidden">
                                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>

                            {/* 2. LOGO SECTION - Pushed slightly right on mobile to clear the button */}
                            <div className="flex flex-1 items-center justify-center xl:justify-start ml-2 xl:ml-0">
                                <Link to="/" className="flex flex-shrink-0 flex-col items-start no-underline hover:no-underline group">
                                    <img
                                        className="h-8 sm:h-10 xl:h-16 w-auto"
                                        src="/img/logo.png"
                                        alt="Nemerald"
                                    />
                                    <span className="hidden xl:block text-[13px] text-gray-400 font-medium mt-1 whitespace-nowrap leading-none">
                                        Experience and innovation over 20 years
                                    </span>
                                </Link>

                                {/* DESKTOP LINKS (Hidden until 1280px) */}
                                <div className="hidden xl:ml-12 xl:flex xl:items-center xl:space-x-8">
                                    <Menu as="div" className="relative">
                                        <MenuButton className="inline-flex items-center gap-1 text-[17px] font-bold text-gray-900 bg-transparent border-none cursor-pointer hover:text-[#F08439]">
                                            Services
                                            <ChevronDownIcon className="h-4 w-4 text-[#F08439]" />
                                        </MenuButton>
                                        <MenuItems className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {services.map((service) => (
                                                <MenuItem key={service.name}>
                                                    {({ active }) => (
                                                        <Link
                                                            to={service.href}
                                                            className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700 no-underline`}
                                                        >
                                                            {service.name}
                                                        </Link>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>

                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="text-[17px] font-bold text-gray-900 no-underline hover:text-[#F08439]"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* 3. RIGHT SIDE CONTACT INFO - Hidden on smallest screens */}
                            <div className="hidden sm:flex flex-col items-end leading-tight text-right flex-shrink-0 ml-4">
                                <span className="hidden xl:block text-[11px] text-gray-500 font-semibold uppercase tracking-wider">24/7 Support | Sales</span>
                                <a
                                    href="tel:+13109292680"
                                    className="text-[20px] xl:text-[22px] font-black text-black no-underline hover:text-[#F08439] whitespace-nowrap"
                                >
                                    +1 (310) 929 2680
                                </a>
                                <span className="hidden xl:block text-[14px] font-bold text-black lowercase">info@nemerald.com</span>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE PANEL */}
                    <DisclosurePanel className="xl:hidden bg-white border-b">
                        <div className="space-y-1 pb-6 pt-2 px-6">
                            <div className="py-2 font-bold text-[#F08439] uppercase text-xs tracking-widest">Services</div>
                            {services.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as={Link}
                                    to={item.href}
                                    className="block py-3 text-lg font-bold text-gray-900 no-underline border-b border-gray-50"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                            <div className="py-4 font-bold text-[#F08439] uppercase text-xs tracking-widest mt-4">Company</div>
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as={Link}
                                    to={item.href}
                                    className="block py-3 text-lg font-bold text-gray-900 no-underline border-b border-gray-50"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                            {/* Phone number only appears in the mobile MENU drawer */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <span className="text-xs text-gray-500 block mb-1">Support & Sales</span>
                                <a href="tel:+13109292680" className="text-xl font-black text-black no-underline">+1 (310) 929 2680</a>
                                <div className="text-sm font-medium text-gray-600 mt-1">info@nemerald.com</div>
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}