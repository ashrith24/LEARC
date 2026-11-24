import { useEffect, useMemo, useRef, useState } from 'react';
import { search, suggestions } from '../search';
import { go } from '../router';
import { Icon } from './Icon';
const kindIcon = { Lesson: 'book', Topic: 'layers', Category: 'layers', Comparison: 'compare', Glossary: 'glossary', 'Learning path': 'path' };
export function SearchPalette({ open, onClose, initial = '' }) {
    const [q, setQ] = useState(initial);
    const [i, setI] = useState(0);
    const input = useRef(null);
    const list = useRef(null);
    const prevFocus = useRef(null);
    const hits = useMemo(() => search(q, 30), [q]);
    useEffect(() => {
        if (!open)
            return;
        prevFocus.current = document.activeElement;
        setQ(initial);
        setI(0);
        const t = setTimeout(() => input.current?.focus(), 10);
        document.body.style.overflow = 'hidden';
        return () => { clearTimeout(t); document.body.style.overflow = ''; prevFocus.current?.focus?.(); };
    }, [open, initial]);
    useEffect(() => setI(0), [q]);
    useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }); }, [i]);
    if (!open)
        return null;
    const choose = (h) => { if (!h)
        return; onClose(); setTimeout(() => go(h.to), 0); };
    const onKey = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setI(v => Math.min(v + 1, hits.length - 1));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setI(v => Math.max(v - 1, 0));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            choose(hits[i]);
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
        else if (e.key === 'Tab') {
            e.preventDefault();
            input.current?.focus();
        }
    };
    const groups = [];
    hits.forEach(h => { let g = groups.find(x => x[0] === h.kind); if (!g)
        groups.push(g = [h.kind, []]); g[1].push(h); });
    const flat = groups.flatMap(g => g[1]);
    const active = flat[i];
    return (<div className="pal-wrap" onMouseDown={e => { if (e.target === e.currentTarget)
        onClose(); }}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Search the encyclopedia" onKeyDown={onKey}>
        <div className="pal-in">
          <Icon n="search" s={18}/>
          <input ref={input} value={q} onChange={e => setQ(e.target.value)} placeholder="Search topics, aliases, comparisons, glossary…" role="combobox" aria-expanded={hits.length > 0} aria-controls="pal-list" aria-autocomplete="list" aria-activedescendant={active ? 'opt-' + flat.indexOf(active) : undefined} autoComplete="off" spellCheck={false}/>
          <button className="icon-btn" onClick={onClose} aria-label="Close search"><Icon n="x"/></button>
        </div>
        <div className="pal-res" ref={list}>
          {!q && (<>
            <div className="pal-grp label">Try searching for</div>
            <div className="pal-sugg">{suggestions.map(s => <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>)}</div>
          </>)}
          {q && hits.length === 0 && <div className="pal-empty"><p><b>No results for “{q}”.</b></p><p className="muted">Try a broader term, an alias (e.g. “CTA”, “dark mode”) or browse the <a href="#glossary" onClick={onClose}>glossary</a>.</p></div>}
          <div id="pal-list" role="listbox" aria-label="Results">
            {groups.map(([k, hs]) => (<div key={k} role="group" aria-label={k}>
                <div className="pal-grp label" aria-hidden="true">{k}s · {hs.length}</div>
                {hs.map(h => {
                const idx = flat.indexOf(h);
                return (<div key={h.to + h.title} id={'opt-' + idx} role="option" aria-selected={idx === i} className="pal-opt" onMouseMove={() => setI(idx)} onClick={() => choose(h)}>
                    <span className="ic"><Icon n={kindIcon[h.kind]}/></span>
                    <span><b>{h.title}</b><small>{h.sub}</small></span>
                    <span className="cat">{h.meta}</span>
                  </div>);
            })}
              </div>))}
          </div>
        </div>
        <div className="pal-foot" aria-hidden="true"><span><kbd>↑</kbd> <kbd>↓</kbd> move</span><span><kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span><span style={{ marginLeft: 'auto' }}>{q ? hits.length + ' results' : 'Titles · aliases · tags · definitions'}</span></div>
        <div className="sr-only" aria-live="polite">{q ? `${hits.length} results` : ''}</div>
      </div>
    </div>);
}
