import React, { useEffect, useRef } from 'react';
import { SkipToContentFallbackId } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';

export default function SkipLink() {
    const container = useRef(null);
    const location = useLocation();
    const previousLocation = useRef(location);

    useEffect(() => {
        if (previousLocation.current !== location && !location.hash) container.current?.focus();
        previousLocation.current = location;
    }, [location]);

    function skipToContent(event) {
        const target = document.querySelector('main') ?? document.getElementById(SkipToContentFallbackId);
        if (!target) return;
        event.preventDefault();
        // Keep tabindex while focused: removing it immediately can lose focus in Chrome.
        target.setAttribute('tabindex', '-1');
        target.focus();
    }

    return (
        <div ref={container} tabIndex={-1} role="region" aria-label="Skip to main content">
            <a className="site-skip-link" href={`#${SkipToContentFallbackId}`} onClick={skipToContent}>
                Skip to main content
            </a>
        </div>
    );
}
