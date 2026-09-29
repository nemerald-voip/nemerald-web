import React, { useEffect, useId, useRef, useState } from 'react';
import { usePrivacyPreferences } from './PrivacyPreferences';

export default function PrivacyVideo({ videoId, title }) {
    const [loaded, setLoaded] = useState(false);
    const { ready, gpc, optionalMediaAllowed, allowMedia } = usePrivacyPreferences();
    const loadButton = useRef(null);
    const unloadButton = useRef(null);
    const noticeId = useId();

    useEffect(() => {
        if (!optionalMediaAllowed) setLoaded(false);
    }, [optionalMediaAllowed]);

    useEffect(() => {
        if (loaded) unloadButton.current?.focus();
    }, [loaded]);

    function loadVideo() {
        // Explicit permission, with a fresh GPC check, precedes every new embed.
        if (allowMedia()) setLoaded(true);
    }

    function unloadVideo() {
        setLoaded(false);
        requestAnimationFrame(() => loadButton.current?.focus());
    }

    return (
        <div className="bg-gray-100">
            {loaded && optionalMediaAllowed ? (
                <>
                    <div className="aspect-video relative">
                        <iframe
                            className="absolute inset-0 h-full w-full border-0"
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?cc_load_policy=1`}
                            title={title}
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="encrypted-media; picture-in-picture; fullscreen"
                            allowFullScreen
                        />
                    </div>
                    <div className="p-4 text-center">
                        <button ref={unloadButton} type="button" onClick={unloadVideo} className="rounded-lg border-0 bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 underline cursor-pointer">
                            Unload video<span className="sr-only">: {title}</span>
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex min-h-64 flex-col items-center justify-center gap-4 p-6 text-center">
                    <p id={noticeId} className="m-0 text-sm text-gray-700">
                        {gpc
                            ? 'Your Global Privacy Control signal is enabled. This video can be watched directly on YouTube.'
                            : 'Loading this video connects to YouTube, which receives your IP address and may use cookies or similar technologies.'}
                    </p>
                    {!gpc && (
                        <button ref={loadButton} type="button" disabled={!ready} onClick={loadVideo} aria-describedby={noticeId} className="rounded-full border-0 bg-brand-fill px-6 py-3 text-sm font-semibold text-gray-900 disabled:opacity-60 cursor-pointer">
                            {optionalMediaAllowed ? 'Load video' : 'Allow YouTube & load video'}<span className="sr-only">: {title}</span>
                        </button>
                    )}
                    <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-900 underline">
                        Watch on YouTube<span className="sr-only">: {title} (opens in a new tab)</span>
                    </a>
                    <a href="https://policies.google.com/privacy" className="text-sm text-gray-900 underline">YouTube privacy information</a>
                </div>
            )}
        </div>
    );
}
