import React from 'react';
import Header from '@site/src/components/Header';
import Footer from '@site/src/components/Footer';

export default function Root({children}) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* 1. Our Custom Tailwind Header */}
      <Header />
      
      {/* 2. The Docusaurus Content (The middle part) */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* 3. Our Custom Tailwind Footer */}
      <Footer />
    </div>
  );
}