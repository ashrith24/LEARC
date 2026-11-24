import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, topics, topicsIn, DOMAINS, order, comparisons, paths } from '../content';
import { href } from '../router';
import { Icon } from './Icon';
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
export const modKey = isMac ? '⌘' : 'Ctrl';
export function Header({ route, onSearch, onMenu, sidebar }) {
    const [m, setM] = useState(false);
    const bar = useRef(null);
    useEffect(() => setM(false), [route]);
    useEffect(() => {
        const on = () => { const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight); if (bar.current)
            bar.current.style.width = (p * 100).toFixed(2) + '%'; };
        on();
        window.addEventListener('scroll', on, { passive: true });
        window.addEventListener('resize', on);
        return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
    }, [route]);
    const cur = (names) => names.includes(route.name) ? 'page' : undefined;
    const links = [
        { to: href.home, label: 'Home', cur: cur(['home']) },
        { to: href.ui, label: 'UI Encyclopedia', cur: cur(['ui', 'cat', 'topic']) },
        { to: href.ux, label: 'UX Encyclopedia', soon: true, cur: cur(['ux']) },
        { to: href.glossary, label: 'Glossary', cur: cur(['glossary']) },
        { to: href.paths, label: 'Learning Paths', cur: cur(['paths', 'path']) },
        { to: href.compare, label: 'Comparisons', cur: cur(['compare', 'cmp']) },
    ];
    return (<>
      <header className="hdr">
        {sidebar && <button className="icon-btn hdr-mobile" onClick={onMenu} aria-label="Open topic index"><Icon n="list" s={20}/></button>}
        <a className="brand" href={href.home} aria-label="Complete UI/UX Encyclopedia — home">
          <span className="brand-mark" aria-hidden="true">Ui</span>
          <span>Encyclopedia</span><small>Vol.1 · UI</small>
        </a>
        <nav className="gnav" aria-label="Primary">
          {links.map(l => <a key={l.to} href={l.to} aria-current={l.cur}>{l.label}{l.soon && <span className="soon">Soon</span>}</a>)}
        </nav>
        <span className="spacer"/>
        <button className="search-btn" onClick={onSearch} aria-label="Search the encyclopedia" aria-keyshortcuts="Control+K Meta+K /">
          <Icon n="search"/><span>Search 200+ concepts</span><kbd>{modKey} K</kbd>
        </button>
        <button className="icon-btn hdr-mobile" onClick={() => setM(v => !v)} aria-expanded={m} aria-controls="mnav" aria-label="Site menu"><Icon n={m ? 'x' : 'menu'} s={20}/></button>
        <div className="progress" ref={bar} aria-hidden="true"/>
      </header>
      {m && (<>
        <div className="scrim" onClick={() => setM(false)}/>
        <nav id="mnav" className="mnav" aria-label="Primary (mobile)">
          {links.map(l => <a key={l.to} href={l.to} aria-current={l.cur}>{l.label}{l.soon ? <span className="soon">Coming later</span> : <Icon n="chev"/>}</a>)}
        </nav>
      </>)}
    </>);
}
const loadOpen = () => { try {
    return JSON.parse(localStorage.getItem('enc.open') || '[]');
}
catch {
    return [];
} };
const saveOpen = (v) => { try {
    localStorage.setItem('enc.open', JSON.stringify(v));
}
catch { /* storage unavailable */ } };
function hl(text, q) {
    if (!q)
        return text;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0)
        return text;
    return <>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}
export function Sidebar({ route, open, onClose }) {
    const curTopic = route.name === 'topic' ? topics[route.id] : undefined;
    const curCat = route.name === 'cat' ? route.id : curTopic?.category;
    const [exp, setExp] = useState(() => Array.from(new Set([...loadOpen(), ...(curCat ? [curCat] : [])])));
    const [q, setQ] = useState('');
    const ref = useRef(null);
    useEffect(() => { if (curCat && !exp.includes(curCat))
        setExp(e => [...e, curCat]); }, [curCat]);
    useEffect(() => saveOpen(exp), [exp]);
    useEffect(() => { const a = ref.current?.querySelector('[aria-current="page"]'); a?.scrollIntoView({ block: 'nearest' }); }, [route]);
    useEffect(() => {
        if (!open)
            return;
        const k = (e) => { if (e.key === 'Escape')
            onClose(); };
        document.addEventListener('keydown', k);
        setTimeout(() => ref.current?.querySelector('input')?.focus(), 50);
        return () => document.removeEventListener('keydown', k);
    }, [open]);
    const toggle = (id) => setExp(e => e.includes(id) ? e.filter(x => x !== id) : [...e, id]);
    const ql = q.trim().toLowerCase();
    const match = (id) => { const t = topics[id]; return !ql || t.title.toLowerCase().includes(ql) || (t.aliases || []).some(a => a.toLowerCase().includes(ql)); };
    const anyHit = useMemo(() => !ql || order.some(match), [ql]);
    return (<>
      {open && <div className="scrim" onClick={onClose}/>}
      <aside ref={ref} className={'side' + (open ? ' open' : '')} aria-label="UI Encyclopedia index" id="side">
        <div className="side-head"><span className="label">Topic index</span><button className="icon-btn" onClick={onClose} aria-label="Close topic index"><Icon n="x"/></button></div>
        <div className="side-search">
          <Icon n="search"/>
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Filter 203 topics…" aria-label="Filter topics in the index"/>
        </div>
        <div className="side-tools">
          <a href={href.ui} className="label" style={{ textDecoration: 'none' }}>All 19 subjects</a>
          <span>
            <button onClick={() => setExp(categories.map(c => c.id))}>Expand all</button>
            <button onClick={() => setExp(curCat ? [curCat] : [])}>Collapse</button>
          </span>
        </div>
        {!anyHit && <p className="side-empty">No topics match “{q}”. Try the global search for glossary terms.</p>}
        <nav aria-label="Subjects and topics">
          {DOMAINS.map(d => {
            const cats = categories.filter(c => c.domain === d && (!ql || topicsIn(c.id).some(t => match(t.id))));
            if (!cats.length)
                return null;
            return (<div key={d}>
                <div className="side-domain label">{d}</div>
                {cats.map(c => {
                    const isOpen = !!ql || exp.includes(c.id);
                    return (<div key={c.id}>
                      <button className={'cat-btn' + (curCat === c.id ? ' current' : '')} aria-expanded={isOpen} aria-controls={'cl-' + c.id} onClick={() => toggle(c.id)}>
                        <span className="n">{c.num}</span><span>{c.short}</span><Icon n="chev" s={14} className="chev"/>
                      </button>
                      {isOpen && (<ul className="cat-list" id={'cl-' + c.id}>
                          {!ql && <li><a href={href.cat(c.id)} aria-current={route.name === 'cat' && route.id === c.id ? 'page' : undefined} className="cat-overview" onClick={onClose}>Overview</a></li>}
                          {c.groups.map(g => {
                                const ts = g.topics.filter(match);
                                if (!ts.length)
                                    return null;
                                return (<li key={g.title}>
                                <div className="grp" aria-hidden="true">{g.title}</div>
                                <ul style={{ listStyle: 'none', padding: 0 }} aria-label={g.title}>
                                  {ts.map(id => <li key={id}><a href={href.topic(id)} aria-current={curTopic?.id === id ? 'page' : undefined} onClick={onClose}>{hl(topics[id].title, q.trim())}</a></li>)}
                                </ul>
                              </li>);
                            })}
                        </ul>)}
                    </div>);
                })}
              </div>);
        })}
        </nav>
        <div className="side-ux"><b style={{ color: 'var(--tx-2)' }}>UX Encyclopedia</b> — the final planned release. Not part of V1. <a href={href.ux}>See the roadmap</a></div>
      </aside>
    </>);
}
export function Crumbs({ items }) {
    return (<nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map(([label, to], i) => <li key={i}>{to && i < items.length - 1 ? <a href={to}>{label}</a> : <span aria-current="page">{label}</span>}</li>)}
      </ol>
    </nav>);
}
export function Footer() {
    return (<footer className="foot">
      <div className="foot-in">
        <div>
          <a className="brand" href={href.home} style={{ marginBottom: 12 }}><span className="brand-mark" aria-hidden="true">Ui</span><span>Encyclopedia</span></a>
          <p style={{ maxWidth: '40ch' }}>The Complete UI/UX Encyclopedia — V1: the static UI Encyclopedia. {order.length} entries across 19 subjects. The UX Encyclopedia is the final planned release.</p>
          <p className="mono">Content reviewed 2026-11-24 · Examples cite official documentation and are dated.</p>
        </div>
        <div><h3>Encyclopedia</h3><a href={href.ui}>All subjects</a><a href={href.cat('foundations')}>Foundations</a><a href={href.cat('elements')}>Elements</a><a href={href.cat('page-layouts')}>Page layouts</a></div>
        <div><h3>Learn</h3><a href={href.paths}>Learning paths ({paths.length})</a><a href={href.compare}>Comparisons ({comparisons.length})</a><a href={href.glossary}>Glossary</a></div>
        <div><h3>Roadmap</h3><a href={href.ux}>UX Encyclopedia — later</a><span style={{ display: 'block', padding: '4px 0' }}>V2 Playground — planned</span><span style={{ display: 'block', padding: '4px 0' }}>V3 Design Studio — planned</span></div>
      </div>
    </footer>);
}
/** Adds .in to .reveal elements as they enter the viewport. */
export function useReveal(dep) {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll('.reveal:not(.in)'));
        if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
            els.forEach(e => e.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        } }), { rootMargin: '0px 0px -8% 0px' });
        els.forEach(e => io.observe(e));
        return () => io.disconnect();
    }, [dep]);
}
