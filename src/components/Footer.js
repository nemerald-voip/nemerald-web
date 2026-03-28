import React from 'react';
import Link from '@docusaurus/Link';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  // Define the exact paths for your Services links
  const servicesLinks =[
    { name: 'Business Voice', href: '/' },
    { name: 'Internet', href: '/internet' },
    { name: 'Managed IT', href: '/managed-it' },
    { name: 'Pricing', href: '/pricing' },
    // External portal links pulled from your original site
    { name: 'Admin portal', href: 'https://portal.us.nemerald.net/' }, 
  ];

  // Define the exact paths for your Company links
  const companyLinks =[
    { name: 'Partners', href: '/partners' },
    { name: 'Why Nemerald', href: '/why-nemerald' },
    { name: 'Contacts', href: '/contacts' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Blog', href: '/blog' },
  ];

  const Icons = {
    Instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ),
    Facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-[1px]">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
    ),
    YouTube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    )
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 md:pt-24 pb-8">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 mb-16">
          
          {/* Column 1: Logo & Contact */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div>
              <img src="/img/logo.png" alt="Nemerald" className="h-12 w-auto" />
              <p className="text-sm text-gray-400 mt-4 leading-relaxed">Experience and innovation over 20 years.</p>
            </div>
            
            <div className="flex flex-col gap-4 text-sm text-gray-300 mt-2">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-[#F08439] shrink-0 mt-0.5" />
                <span>440 N Barranca Ave #2250<br/>Covina, CA 91723, USA</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-[#F08439] shrink-0" />
                <a href="tel:+13109292680" className="text-gray-300 no-underline hover:text-[#F08439] transition-colors">+1 (310) 929 2680</a>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-[#F08439] shrink-0" />
                <a href="mailto:info@nemerald.com" className="text-gray-300 no-underline hover:text-[#F08439] transition-colors">info@nemerald.com</a>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="h-5 w-5 text-[#F08439] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">Business Hours:</p>
                  <p className="mb-0 text-gray-400">Mon-Fri: 9am - 8pm</p>
                  <p className="mb-0 text-gray-400">Sat-Sun: 10am - 3pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-semibold mb-6 text-white tracking-wider">Services</h4>
            <ul className="list-none p-0 flex flex-col gap-4">
              {/* Map over the newly created objects to assign proper hrefs */}
              {servicesLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-gray-400 font-medium no-underline hover:text-[#F08439] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold mb-6 text-white tracking-wider">Company</h4>
            <ul className="list-none p-0 flex flex-col gap-4">
              {/* Map over the newly created objects to assign proper hrefs */}
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-gray-400 font-medium no-underline hover:text-[#F08439] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold mb-6 text-white tracking-wider">Connect with us</h4>
            <div className="flex gap-4">
              {[
                { name: 'Instagram', url: 'https://instagram.com/nemerald' },
                { name: 'Facebook', url: 'https://facebook.com/nemerald' },
                { name: 'YouTube', url: 'https://youtube.com/@nemerald' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#F08439] transition-all duration-300"
                >
                  {Icons[social.name]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 text-center sm:text-left">
          <p className="mb-0">© {new Date().getFullYear()} Nemerald Technologies LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-gray-500 no-underline hover:text-[#F08439] transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="text-gray-500 no-underline hover:text-[#F08439] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}