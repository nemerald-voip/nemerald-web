import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './PrivacyPreferences.module.css';

// Bump the version when purposes or vendors change; an old choice must not grant new permissions.
const STORAGE_KEY = 'nemerald-privacy-preferences';
const VERSION = 1;
const LIFETIME = 365 * 24 * 60 * 60 * 1000;
const PrivacyContext = createContext(null);

function readChoice() {
    try {
        const choice = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
        if (choice?.version === VERSION && typeof choice.optionalMedia === 'boolean'
            && Number.isFinite(choice.savedAt) && choice.savedAt <= Date.now()
            && Date.now() - choice.savedAt < LIFETIME) return choice;
    } catch { /* Unavailable or invalid storage leaves optional content off. */ }
    return null;
}

export function usePrivacyPreferences() {
    return useContext(PrivacyContext);
}

export default function PrivacyPreferences({ children }) {
    const [ready, setReady] = useState(false);
    const [choice, setChoice] = useState(null);
    const [gpc, setGpc] = useState(false);
    const [storageFailed, setStorageFailed] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [draftMedia, setDraftMedia] = useState(false);
    const [status, setStatus] = useState('');
    const dialog = useRef(null);
    const banner = useRef(null);
    const returnFocus = useRef(null);
    const memoryChoice = useRef(null);
    const useMemoryChoice = useRef(false);
    const location = useLocation();

    const saveChoice = useCallback((optionalMedia) => {
        const signal = navigator.globalPrivacyControl === true;
        const next = { version: VERSION, optionalMedia: optionalMedia && !signal, savedAt: Date.now() };
        memoryChoice.current = next;
        let saved = true;
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
        catch {
            saved = false;
            // A failed withdrawal must not leave an old grant for the next visit.
            try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be entirely disabled. */ }
        }
        useMemoryChoice.current = !saved;
        setStorageFailed(!saved);
        setChoice(next);
        setGpc(signal);
        setStatus(saved ? 'Cookie preferences saved.' : 'Your browser could not save this choice. It applies to this visit only.');
        return next.optionalMedia;
    }, []);

    useEffect(() => {
        function sync(event) {
            if (event?.type === 'storage' && event.key !== null && event.key !== STORAGE_KEY) return;
            const signal = navigator.globalPrivacyControl === true;
            let next = readChoice();
            // A blocked storage API must not undo a choice made during this visit.
            if (event?.type === 'storage') {
                useMemoryChoice.current = false;
            } else if (useMemoryChoice.current) {
                next = memoryChoice.current;
            } else {
                try { window.localStorage.getItem(STORAGE_KEY); }
                catch { next = memoryChoice.current; }
            }
            if (next && Date.now() - next.savedAt >= LIFETIME) next = null;
            if (signal && (!next || next.optionalMedia)) {
                saveChoice(false);
            } else {
                memoryChoice.current = next;
                setChoice(next);
                setGpc(signal);
            }
            setReady(true);
        }
        sync();
        window.addEventListener('storage', sync);
        window.addEventListener('focus', sync);
        document.addEventListener('visibilitychange', sync);
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('focus', sync);
            document.removeEventListener('visibilitychange', sync);
        };
    }, [saveChoice]);

    useEffect(() => {
        if (!choice) return undefined;
        // Check at least daily, avoiding the browser's maximum timeout overflow.
        let timeout;
        function checkExpiry() {
            if (Date.now() - choice.savedAt >= LIFETIME) {
                memoryChoice.current = null;
                setChoice(null);
            } else {
                timeout = window.setTimeout(checkExpiry, Math.min(LIFETIME - (Date.now() - choice.savedAt), 24 * 60 * 60 * 1000));
            }
        }
        checkExpiry();
        return () => window.clearTimeout(timeout);
    }, [choice]);

    const optionalMediaAllowed = ready && !gpc && choice?.optionalMedia === true;
    const showBanner = ready && !choice && !gpc;

    function openSettings() {
        returnFocus.current = document.activeElement;
        const signal = navigator.globalPrivacyControl === true;
        setGpc(signal);
        if (signal && choice?.optionalMedia) saveChoice(false);
        setDraftMedia(optionalMediaAllowed && !signal);
        setSettingsOpen(true);
    }

    function closeSettings() {
        setSettingsOpen(false);
        // Keep the reading position if saving removes the banner that opened the dialog.
        requestAnimationFrame(() => {
            const target = returnFocus.current?.isConnected
                ? returnFocus.current : document.querySelector('main');
            if (target?.tagName === 'MAIN') target.setAttribute('tabindex', '-1');
            target?.focus({ preventScroll: true });
        });
    }

    function commit(optionalMedia) {
        saveChoice(optionalMedia);
        if (settingsOpen) closeSettings();
    }

    function keepDialogFocus(event) {
        if (event.key !== 'Tab') return;
        const controls = Array.from(dialog.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])'));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
            event.preventDefault();
            last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
        }
    }

    useEffect(() => {
        if (gpc) setDraftMedia(false);
    }, [gpc]);

    useEffect(() => {
        if (!settingsOpen) return undefined;
        dialog.current?.showModal();
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            dialog.current?.close();
            document.body.style.overflow = overflow;
        };
    }, [settingsOpen]);

    useEffect(() => {
        // Privacy links remain usable from the dialog on every route.
        setSettingsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!showBanner || !banner.current) return undefined;
        const root = document.documentElement;
        function resize() {
            root.style.setProperty('--cookie-banner-height', `${banner.current?.offsetHeight || 0}px`);
        }
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(banner.current);
        return () => {
            observer.disconnect();
            root.style.removeProperty('--cookie-banner-height');
        };
    }, [showBanner]);

    return (
        <PrivacyContext.Provider value={{ ready, gpc, optionalMediaAllowed, allowMedia: () => saveChoice(true), openSettings }}>
            {children}
            <p className="sr-only" role="status">{status}</p>
            {showBanner && <>
                <div className={styles.spacer} aria-hidden="true" />
                <section ref={banner} className={styles.banner} aria-labelledby="cookie-banner-title">
                    <div className={styles.bannerInner}>
                        <div>
                            <h2 id="cookie-banner-title">Cookies & privacy</h2>
                            <p>We use essential technologies to run this site and prevent spam. Optional YouTube videos stay off until you allow them. Change your choice anytime in Cookie settings. <Link to="/cookies">Cookie notice</Link>.</p>
                        </div>
                        <div className={styles.actions}>
                            <button type="button" className={styles.choice} onClick={() => commit(false)}>Reject optional</button>
                            <button type="button" className={styles.choice} onClick={() => commit(true)}>Allow optional</button>
                            <button type="button" className={styles.textButton} onClick={openSettings} aria-haspopup="dialog">Manage choices</button>
                        </div>
                    </div>
                </section>
            </>}
            <dialog ref={dialog} className={styles.dialog} aria-labelledby="cookie-settings-title" onKeyDown={keepDialogFocus} onCancel={(event) => { event.preventDefault(); closeSettings(); }}>
                <div className={styles.dialogBody}>
                    <h2 id="cookie-settings-title" tabIndex={-1} autoFocus>Cookie settings</h2>
                    <p>Choose whether this website can load optional embedded videos. You can browse and contact us with optional content turned off.</p>
                    <div className={styles.category}>
                        <h3>Essential technologies <span>Always on</span></h3>
                        <p>Remember your privacy choices and protect the contact form using Cloudflare Turnstile.</p>
                    </div>
                    <div className={styles.category}>
                        <label className={styles.checkbox}>
                            <input type="checkbox" checked={draftMedia && !gpc} disabled={gpc} onChange={(event) => setDraftMedia(event.target.checked)} aria-describedby="cookie-media-description" />
                            <span>YouTube videos</span>
                        </label>
                        <p id="cookie-media-description">When you load a video, Google / YouTube receives your IP address and browser information and may use cookies or similar technologies. Allowing videos does not automatically play them.</p>
                    </div>
                    {gpc && <p className={styles.notice}>Global Privacy Control is enabled in your browser. Optional videos are blocked.</p>}
                    {storageFailed && <p role="status">Your browser could not save this choice. It applies to this visit only.</p>}
                    <p>Choices are saved in this browser for 365 days. Turning videos off removes loaded players; it cannot erase data already sent to YouTube. <Link to="/cookies" onClick={closeSettings}>Cookie notice</Link> · <Link to="/privacy-policy" onClick={closeSettings}>Privacy Policy</Link></p>
                    <div className={styles.actions}>
                        <button type="button" className={styles.choice} onClick={() => commit(false)}>Reject optional</button>
                        <button type="button" className={styles.choice} onClick={() => commit(draftMedia)}>Save choices</button>
                        <button type="button" className={styles.textButton} onClick={closeSettings}>Close without saving</button>
                    </div>
                </div>
            </dialog>
        </PrivacyContext.Provider>
    );
}
