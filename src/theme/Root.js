import React from 'react';
import Header from '@site/src/components/Header';
import Footer from '@site/src/components/Footer';
import SkipLink from '@site/src/components/SkipLink';
import PrivacyPreferences from '@site/src/components/PrivacyPreferences';

export default function Root({children}) {
  return (
    <PrivacyPreferences>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <SkipLink />
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </PrivacyPreferences>
  );
}
