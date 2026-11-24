/** Hash router. Routes are plain #names (the host only passes #name hashes):
 *  #home · #ui · #c-<category> · #t-<topic> · #compare · #cmp-<id> · #glossary · #paths · #path-<id> · #ux */
import { useEffect, useState } from 'react';
export function parse(hash) {
    const h = decodeURIComponent(hash.replace(/^#/, ''));
    if (!h || h === 'home')
        return { name: 'home' };
    if (h === 'ui' || h === 'glossary' || h === 'compare' || h === 'paths' || h === 'ux')
        return { name: h };
    const m = h.match(/^(c|t|cmp|path)-(.+)$/);
    if (m)
        return { name: { c: 'cat', t: 'topic', cmp: 'cmp', path: 'path' }[m[1]], id: m[2] };
    return { name: 'notfound', hash: h };
}
export const href = {
    home: '#home', ui: '#ui', glossary: '#glossary', compare: '#compare', paths: '#paths', ux: '#ux',
    cat: (id) => '#c-' + id, topic: (id) => '#t-' + id, cmp: (id) => '#cmp-' + id, path: (id) => '#path-' + id,
};
const positions = new Map();
let programmatic = false;
/** Navigate with a View Transition where supported; always scroll new pages to the top. */
export function go(to) {
    if (location.hash === to) {
        window.scrollTo({ top: 0 });
        return;
    }
    positions.set(location.hash || '#home', window.scrollY);
    programmatic = true;
    const doc = document;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduce)
        doc.startViewTransition(() => { location.hash = to; });
    else
        location.hash = to;
}
export function useRoute() {
    const [route, setRoute] = useState(() => parse(location.hash));
    useEffect(() => {
        let last = location.hash || '#home';
        const onChange = () => {
            const next = location.hash || '#home';
            if (!programmatic)
                positions.set(last, window.scrollY);
            const restore = !programmatic && positions.has(next);
            const y = positions.get(next) || 0;
            programmatic = false;
            last = next;
            setRoute(parse(location.hash));
            requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: restore ? y : 0 })));
        };
        window.addEventListener('hashchange', onChange);
        return () => window.removeEventListener('hashchange', onChange);
    }, []);
    return route;
}
/** Intercept clicks on internal links so they use go() (view transitions + scroll handling). */
export function installLinkInterceptor() {
    document.addEventListener('click', e => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
            return;
        const a = e.target.closest?.('a[href^="#"]');
        if (!a || a.dataset.native !== undefined)
            return;
        const h = a.getAttribute('href');
        if (h.length < 2)
            return;
        e.preventDefault();
        go(h);
    });
}
