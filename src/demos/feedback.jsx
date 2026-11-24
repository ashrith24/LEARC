import { useEffect, useRef, useState } from 'react';
import { register } from './registry';
import { Frame } from './kit';
import { Icon } from '../components/Icon';
/** Focus trap + Escape + return focus for in-demo overlays. */
function useOverlay(open, close) {
    const ref = useRef(null);
    const prev = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        prev.current = document.activeElement;
        const el = ref.current;
        const f = () => Array.from(el?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || []);
        setTimeout(() => (el?.querySelector('[data-autofocus]') || f()[0])?.focus(), 30);
        const k = (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                close();
            }
            if (e.key === 'Tab') {
                const l = f();
                if (!l.length)
                    return;
                const a = l[0], b = l[l.length - 1];
                if (e.shiftKey && document.activeElement === a) {
                    e.preventDefault();
                    b.focus();
                }
                else if (!e.shiftKey && document.activeElement === b) {
                    e.preventDefault();
                    a.focus();
                }
            }
        };
        document.addEventListener('keydown', k, true);
        return () => { document.removeEventListener('keydown', k, true); prev.current?.focus?.(); };
    }, [open]);
    return ref;
}
function Stage({ children, label }) { return <div className="ov-stage" aria-label={label}><div className="ov-page"><b>Project settings</b>{[80, 60, 70, 50].map((w, i) => <i key={i} style={{ width: w + '%' }}/>)}</div>{children}</div>; }
register({
    alerts: () => {
        const [shown, setShown] = useState(true);
        return (<Frame label="Alerts, inline messages & banners">
        <div className="alx">
          {shown ? <div className="banner" role="region" aria-label="Announcement"><Icon n="info"/><span><b>Scheduled maintenance</b> on 30 Nov, 02:00–03:00 UTC.</span><button className="icon-btn" aria-label="Dismiss announcement" onClick={() => setShown(false)}><Icon n="x"/></button></div> : <button className="btn btn-sm" onClick={() => setShown(true)}>Show banner again</button>}
          {[['ok', 'Success', 'Your changes were published.'], ['warn', 'Warning', 'Your trial ends in 3 days. Add a payment method to keep access.'], ['err', 'Error', 'We could not save the file. Check your connection and try again.'], ['info', 'Information', 'This workspace is managed by your organisation.']].map(([k, t, m]) => <div key={k} className={'alert ' + k}><Icon n={k === 'info' ? 'info' : k}/><div><b>{t}</b><p>{m}</p></div></div>)}
          <div className="inline-msg"><input className="ui-in err" defaultValue="mira@" aria-label="Email (inline message example)" aria-describedby="im"/><span id="im" className="fl-err">✕ Enter a complete email address</span></div>
          <div className="callout"><b>Note</b> Inset text and callouts hold supporting information — not warnings.</div>
        </div>
      </Frame>);
    },
    toast: () => {
        const [ts, setTs] = useState([]);
        const [last, setLast] = useState('');
        const add = (m, a) => { const id = Date.now(); setTs(v => [...v.slice(-2), { id, m, a }]); setTimeout(() => setTs(v => v.filter(t => t.id !== id)), 5000); };
        return (<Frame label="Toasts / snackbars" controls={<span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><button className="btn btn-sm" onClick={() => add('Link copied')}>Show toast</button><button className="btn btn-sm" onClick={() => add('Message archived', 'Undo')}>With action</button></span>} caption={`Auto-dismiss after 5 s; stack of max 3; announced politely to screen readers. ${last}`}>
        <div className="toast-stage"><div className="ov-page"><b>Inbox</b>{[80, 60, 70].map((w, i) => <i key={i} style={{ width: w + '%' }}/>)}</div>
          <div className="toasts" role="status" aria-live="polite">{ts.map(t => <div key={t.id} className="toast"><Icon n="ok"/><span>{t.m}</span>{t.a && <button onClick={() => { setTs(v => v.filter(x => x.id !== t.id)); setLast('Undo clicked — message restored.'); }}>{t.a}</button>}<button className="icon-btn" aria-label="Dismiss" onClick={() => setTs(v => v.filter(x => x.id !== t.id))}><Icon n="x" s={14}/></button></div>)}</div></div>
      </Frame>);
    },
    'notification-center': () => {
        const [open, setOpen] = useState(true);
        const [tab, setTab] = useState('All');
        const [items, setItems] = useState([{ w: 'Mira', a: 'mentioned you in', o: 'Q4 planning', t: '2m', u: true, m: true }, { w: 'Jun', a: 'assigned you', o: 'Checkout bug', t: '1h', u: true, m: false }, { w: 'Billing', a: 'invoice ready for', o: 'November', t: '1d', u: false, m: false }]);
        const unread = items.filter(i => i.u).length;
        const list = items.filter(i => tab === 'All' || (tab === 'Unread' && i.u) || (tab === 'Mentions' && i.m));
        return (<Frame label="Notification centre">
        <div className="ncx"><button className="icon-btn bell" aria-expanded={open} onClick={() => setOpen(v => !v)} aria-label={`Notifications, ${unread} unread`}><Icon n="bell" s={20}/>{unread > 0 && <i>{unread}</i>}</button>
          {open && <div className="ncp"><div className="nc-h"><b>Notifications</b><button className="link-btn" onClick={() => setItems(v => v.map(i => ({ ...i, u: false })))}>Mark all as read</button></div>
            <div className="segc" role="group" aria-label="Filter">{['All', 'Unread', 'Mentions'].map(x => <button key={x} aria-pressed={tab === x} onClick={() => setTab(x)}>{x}</button>)}</div>
            <ul>{list.length ? list.map(i => <li key={i.o} className={i.u ? 'u' : ''} onClick={() => setItems(v => v.map(x => x.o === i.o ? { ...x, u: false } : x))}><span className="av sm">{i.w.slice(0, 2).toUpperCase()}</span><span><b>{i.w}</b> {i.a} <b>{i.o}</b><time>{i.t} ago</time></span>{i.u && <i className="ud" aria-label="Unread"/>}</li>) : <li className="empty-n">You're all caught up.</li>}</ul></div>}
        </div>
      </Frame>);
    },
    modal: () => {
        const [open, setOpen] = useState(false);
        const [res, setRes] = useState('');
        const ref = useOverlay(open, () => setOpen(false));
        return (<Frame label="Modal confirmation dialog" controls={<button className="btn btn-sm btn-primary" onClick={() => setOpen(true)}>Delete project…</button>} caption={`Focus moves into the dialog, Tab is trapped, Escape closes, focus returns to the trigger. ${res}`}>
        <Stage>{open && <><div className="ov-scrim" onClick={() => setOpen(false)}/><div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dlg-t" aria-describedby="dlg-d" ref={ref}>
          <h4 id="dlg-t">Delete “Atlas redesign”?</h4><p id="dlg-d">This permanently deletes 48 files and cannot be undone.</p>
          <div className="dlg-a"><button className="ub ghost" data-autofocus onClick={() => { setOpen(false); setRes('Result: cancelled.'); }}>Cancel</button><button className="ub danger" onClick={() => { setOpen(false); setRes('Result: deleted (demo).'); }}>Delete project</button></div>
          <button className="icon-btn dlg-x" aria-label="Close" onClick={() => setOpen(false)}><Icon n="x"/></button></div></>}</Stage>
      </Frame>);
    },
    drawer: () => {
        const [k, setK] = useState('');
        const ref = useOverlay(!!k, () => setK(''));
        return (<Frame label="Drawer · side sheet · bottom sheet · full-screen" controls={<span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><button className="btn btn-sm" onClick={() => setK('side')}>Side sheet</button><button className="btn btn-sm" onClick={() => setK('bottom')}>Bottom sheet</button><button className="btn btn-sm" onClick={() => setK('full')}>Full-screen</button></span>}>
        <Stage>{k && <><div className="ov-scrim" onClick={() => setK('')}/><div className={'sheet ' + k} role="dialog" aria-modal="true" aria-label={k === 'side' ? 'Filters' : k === 'bottom' ? 'Share' : 'Search'} ref={ref}>
          {k === 'bottom' && <span className="grab" aria-hidden="true"/>}
          <div className="sh-h"><b>{k === 'side' ? 'Filters' : k === 'bottom' ? 'Share' : 'Search'}</b><button className="icon-btn" aria-label="Close" onClick={() => setK('')}><Icon n="x"/></button></div>
          {k === 'side' && <div className="sh-b">{['Open', 'In review', 'Done'].map(x => <label key={x} className="ck"><input type="checkbox"/>{x}</label>)}<button className="ub primary z-full" onClick={() => setK('')}>Apply filters</button></div>}
          {k === 'bottom' && <div className="sh-b grid4">{[['mail', 'Email'], ['chat', 'Message'], ['share', 'Link'], ['download', 'Save']].map(([i, l]) => <button key={l} className="sh-opt" onClick={() => setK('')}><Icon n={i} s={20}/>{l}</button>)}</div>}
          {k === 'full' && <div className="sh-b"><input className="ui-in" placeholder="Search everything" data-autofocus aria-label="Search"/></div>}
        </div></>}</Stage>
      </Frame>);
    },
    tooltips: () => {
        const [pop, setPop] = useState(false);
        const [hc, setHc] = useState(false);
        const [tip, setTip] = useState(false);
        return (<Frame label="Tooltip · popover · hover card" caption="Tooltip on hover and focus (Esc hides). Popover on click, holds controls. Hover card previews linked content.">
        <div className="ttx" onKeyDown={e => { if (e.key === 'Escape') {
            setTip(false);
            setPop(false);
            setHc(false);
        } }}>
          <span className="tt-anchor"><button className="icon-btn" aria-describedby={tip ? 'tt1' : undefined} onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)} onFocus={() => setTip(true)} onBlur={() => setTip(false)} aria-label="Duplicate"><Icon n="layers" s={18}/></button>{tip && <span role="tooltip" id="tt1" className="tooltip">Duplicate <kbd>⌘ D</kbd></span>}<small>Tooltip</small></span>
          <span className="tt-anchor"><button className="btn btn-sm" aria-expanded={pop} onClick={() => setPop(v => !v)}>Display options <Icon n="chevD"/></button>{pop && <div className="popover" role="dialog" aria-label="Display options"><label className="ck"><input type="checkbox" defaultChecked/>Show completed</label><label className="ck"><input type="checkbox"/>Compact rows</label><button className="ub primary z-sm" onClick={() => setPop(false)}>Done</button></div>}<small>Popover</small></span>
          <span className="tt-anchor"><a href="#t-tooltips-popovers" onClick={e => e.preventDefault()} onMouseEnter={() => setHc(true)} onMouseLeave={() => setHc(false)} onFocus={() => setHc(true)} onBlur={() => setHc(false)}>@mira</a>{hc && <div className="hovercard" role="tooltip"><span className="av md">MO</span><span><b>Mira Okafor</b><small>Product designer · London</small></span></div>}<small>Hover card</small></span>
        </div>
      </Frame>);
    },
    lightbox: () => {
        const [i, setI] = useState(null);
        const ref = useOverlay(i !== null, () => setI(null));
        const n = 4;
        const bg = (k) => `linear-gradient(135deg, hsl(${200 + k * 30} 50% 20%), hsl(${200 + k * 30} 80% 55%))`;
        return (<Frame label="Lightbox gallery" caption="Click a thumbnail. Arrow keys move, Escape closes.">
        <div className="lbx">{Array.from({ length: n }, (_, k) => <button key={k} className="thumb" style={{ background: bg(k) }} onClick={() => setI(k)} aria-label={`Open image ${k + 1} of ${n}`}/>)}
          {i !== null && <div className="lb" role="dialog" aria-modal="true" aria-label={`Image ${i + 1} of ${n}`} ref={ref} onKeyDown={e => { if (e.key === 'ArrowRight')
                setI((i + 1) % n); if (e.key === 'ArrowLeft')
                setI((i - 1 + n) % n); }}>
            <div className="lb-img" style={{ background: bg(i) }}/><button className="icon-btn lb-x" onClick={() => setI(null)} aria-label="Close" data-autofocus><Icon n="x"/></button><button className="icon-btn lb-p" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous image"><Icon n="chevL"/></button><button className="icon-btn lb-n" onClick={() => setI((i + 1) % n)} aria-label="Next image"><Icon n="chev"/></button><span className="lb-c">{i + 1} / {n}</span></div>}
        </div>
      </Frame>);
    },
    'command-palette': () => {
        const cmds = ['Create issue', 'Go to inbox', 'Toggle dark mode', 'Invite teammate', 'Open settings', 'Search docs'];
        const [q, setQ] = useState('');
        const [i, setI] = useState(0);
        const l = cmds.filter(c => c.toLowerCase().includes(q.toLowerCase()));
        return (<Frame label="Mini command palette" caption="This site's own search (Ctrl/⌘ K or /) is a full command palette.">
        <div className="cpx"><div className="cp-in"><Icon n="search"/><input value={q} onChange={e => { setQ(e.target.value); setI(0); }} placeholder="Type a command…" aria-label="Command" onKeyDown={e => { if (e.key === 'ArrowDown') {
            e.preventDefault();
            setI(Math.min(i + 1, l.length - 1));
        } if (e.key === 'ArrowUp') {
            e.preventDefault();
            setI(Math.max(i - 1, 0));
        } }}/><kbd>Esc</kbd></div>
          <ul role="listbox" aria-label="Commands">{l.map((c, k) => <li key={c} role="option" aria-selected={k === i} onMouseMove={() => setI(k)}><Icon n="hash"/>{c}{k === 0 && <kbd>↵</kbd>}</li>)}{!l.length && <li className="none">No commands</li>}</ul></div>
      </Frame>);
    },
    'overlay-anatomy': () => (<Frame label="Overlay anatomy & responsive transformation">
      <div className="ova">
        <div className="ova-d"><div className="ov-scrim static"/><div className="dialog static"><h4>Title</h4><p>Body</p><div className="dlg-a"><span className="ub ghost z-sm">Cancel</span><span className="ub primary z-sm">Confirm</span></div></div>
          {[['Scrim (inert background)', '6%', '8%'], ['Container + title (labels the dialog)', '58%', '18%'], ['Actions', '58%', '70%'], ['Focus starts here, returns to trigger', '6%', '86%']].map(([t, l, tp]) => <span key={t} className="call" style={{ left: l, top: tp }}>{t}</span>)}</div>
        <div className="ova-t"><div><span className="label">Desktop</span><div className="dev d"><i className="pop"/></div><small>Popover</small></div><span>→</span><div><span className="label">Phone</span><div className="dev m"><i className="bs"/></div><small>Bottom sheet</small></div></div>
      </div>
    </Frame>),
    loaders: () => {
        const [loaded, setLoaded] = useState(false);
        return (<Frame label="Spinner & skeleton" controls={<button className="btn btn-sm" onClick={() => { setLoaded(false); setTimeout(() => setLoaded(true), 1600); }}>Reload</button>}>
        <div className="ldx">
          <div className="ld-c"><span className="spinner" role="status" aria-label="Loading"/><small>Spinner — short, unknown wait</small><button className="ub primary z-sm" aria-busy="true"><span className="spin" aria-hidden="true"/>Saving…</button></div>
          <div className="ld-c wide" aria-busy={!loaded}>{loaded ? <div className="sk-real"><span className="av md">MO</span><div><b>Mira Okafor</b><p>Shipped the new onboarding checklist.</p></div></div> : <div className="sk"><i className="c"/><div><i className="l1"/><i className="l2"/><i className="l3"/></div></div>}<small>Skeleton — known layout</small></div>
        </div>
      </Frame>);
    },
    progress: () => {
        const [v, setV] = useState(35);
        useEffect(() => { const t = setInterval(() => setV(x => x >= 100 ? 0 : x + 5), 600); if (matchMedia('(prefers-reduced-motion: reduce)').matches)
            clearInterval(t); return () => clearInterval(t); }, []);
        return (<Frame label="Determinate progress">
        <div className="pgs">
          <div><span className="lbl">Exporting report <output>{v}%</output></span><div className="bar" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label="Export progress"><i style={{ width: v + '%' }}/></div></div>
          <div className="ring-w"><svg viewBox="0 0 44 44" className="ring" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label="Sync progress"><circle cx="22" cy="22" r="18"/><circle cx="22" cy="22" r="18" className="f" style={{ strokeDashoffset: 113 - 113 * v / 100 }}/></svg><span>{v}%</span></div>
          <div className="upl">{[['design.fig', 100], ['brief.pdf', 64], ['video.mp4', 12]].map(([n, p]) => <div key={n}><Icon n="file"/><span>{n}</span><div className="bar sm"><i style={{ width: p + '%' }}/></div><small>{p === 100 ? 'Done' : p + '%'}</small></div>)}</div>
          <div><span className="lbl">Step progress</span><div className="segbar">{[1, 2, 3, 4, 5].map(k => <i key={k} className={k <= 2 ? 'on' : ''}/>)}</div><small className="hint">Step 2 of 5</small></div>
          <div className="indet"><span className="lbl">Indeterminate</span><div className="bar"><i className="ind"/></div></div>
        </div>
      </Frame>);
    },
    'system-states': () => {
        const S = {
            'Empty · first use': ['folder', 'No projects yet', 'Projects keep files, people and tasks together.', 'Create project'],
            'Empty · no results': ['search', 'No results for “invoce”', 'Check the spelling or remove a filter.', 'Clear filters'],
            'Error': ['err', 'We couldn’t load your reports', 'The server didn’t respond. Your data is safe.', 'Try again'],
            'Success': ['ok', 'Payment received', 'We emailed a receipt to mira@example.com.', 'View receipt'],
            'Warning': ['warn', 'Storage almost full', 'You have used 95% of 10 GB.', 'Manage storage'],
            'Offline': ['wifiOff', 'You’re offline', 'Showing saved data from 09:14. Changes will sync when you reconnect.', 'Retry now'],
            'Permission denied': ['lock', 'You don’t have access', 'Ask a workspace admin to share “Payroll”.', 'Request access'],
            'Maintenance': ['tool', 'Down for maintenance', 'Back by 03:00 UTC. Status updates on our status page.', 'Check status'],
        };
        const [k, setK] = useState(Object.keys(S)[0]);
        const [ic, t, d, a] = S[k];
        return (<Frame label="System states" controls={<select className="dsel" value={k} onChange={e => setK(e.target.value)} aria-label="State">{Object.keys(S).map(x => <option key={x}>{x}</option>)}</select>} caption="Every state answers: what happened, and what can I do now?">
        <div className={'ss ' + k.split(' ')[0].toLowerCase()}><span className="ss-ic"><Icon n={ic} s={28}/></span><b>{t}</b><p>{d}</p><span className="ub primary">{a}</span></div>
      </Frame>);
    },
    /* Comparison previews */
    'cmp-overlays': () => (<Frame label="Same task, three overlays">
      <div className="cmpov">{[['Modal', 'm'], ['Drawer', 'd'], ['Bottom sheet', 'b']].map(([l, c]) => <div key={c}><div className={'dev2 ' + c}><i className="pg"/><i className="sc"/><i className="ov"/></div><b>{l}</b></div>)}</div>
    </Frame>),
    'cmp-surfaces': () => (<Frame label="Card vs panel vs container">
      <div className="cmpsf"><div className="cs-container"><span className="tagc">Container (max-width, padding)</span><div className="cs-row"><div className="cs-panel"><span className="tagc">Panel · Inspector</span><i /><i /><i /></div><div className="cs-cards">{[0, 1, 2, 3].map(i => <div key={i} className="cs-card"><i /><b /></div>)}<span className="tagc">Cards · repeated items</span></div></div></div></div>
    </Frame>),
    'cmp-button-link': () => (<Frame label="Go somewhere vs do something">
      <div className="cmpbl"><div><a href="#c-elements" className="standalone">View invoice history <Icon n="arrow"/></a><small>Link → changes the URL; supports new tab</small></div><div><button className="ub primary">Pay invoice</button><small>Button → performs the action here</small></div><div><a href="#c-elements" className="ub primary">Start free trial</a><small>Link styled as a button for a prominent call to action — still a link</small></div></div>
    </Frame>),
    'cmp-tabs-seg': () => {
        const [t, setT] = useState('Overview');
        const [v, setV] = useState('List');
        return (<Frame label="Tabs change content · segmented control changes the view">
        <div className="cmpts"><div><div className="tbx mini"><div role="tablist" aria-label="Record">{['Overview', 'Files', 'Activity'].map(x => <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)}>{x}</button>)}</div><div role="tabpanel"><p>{t} content</p></div></div></div>
          <div><div className="segc" role="radiogroup" aria-label="View">{['List', 'Grid'].map(x => <button key={x} role="radio" aria-checked={v === x} onClick={() => setV(x)}>{x}</button>)}</div><div className={'mini-items ' + v.toLowerCase()}>{[0, 1, 2, 3].map(i => <i key={i}/>)}</div></div></div>
      </Frame>);
    },
    'cmp-messages': () => (<Frame label="Where each message lives">
      <div className="cmpmsg"><div className="ov-page"><div className="alert warn small"><Icon n="warn"/><span>Alert — in the page, persists</span></div>{[70, 50, 60].map((w, i) => <i key={i} style={{ width: w + '%' }}/>)}<div className="toast fl"><Icon n="ok"/>Toast — floats, disappears</div><div className="snack">Snackbar — bottom, one action <b>UNDO</b></div></div></div>
    </Frame>),
    'cmp-nav': () => (<Frame label="Navbar · sidebar · rail">
      <div className="cmpov">{[['Navbar', 'n'], ['Sidebar', 's'], ['Rail', 'r']].map(([l, c]) => <div key={c}><div className={'dev3 ' + c}><i className="nv"/><i className="ct"/></div><b>{l}</b></div>)}</div>
    </Frame>),
    'cmp-accordion-menu': () => {
        const [a, setA] = useState(true);
        const [m, setM] = useState(true);
        return (<Frame label="Inline expansion vs floating menu">
        <div className="cmpam"><div><button className="acc-h" aria-expanded={a} onClick={() => setA(v => !v)}>Shipping details <Icon n="chevD"/></button>{a && <p className="acc-p">Content pushes the page down — for reading.</p>}<i className="after"/><small>Accordion</small></div>
          <div style={{ position: 'relative' }}><button className="btn btn-sm" aria-expanded={m} onClick={() => setM(v => !v)}>Actions <Icon n="chevD"/></button>{m && <ul className="menu" style={{ position: 'absolute', top: 44 }}>{['Edit', 'Duplicate', 'Archive'].map(x => <li key={x}><button onClick={() => setM(false)}>{x}</button></li>)}</ul>}<i className="after"/><small style={{ position: 'absolute', bottom: 0 }}>Dropdown menu — floats over content</small></div></div>
      </Frame>);
    },
    'cmp-hero-banner': () => (<Frame label="Hero vs banner">
      <div className="cmphb"><div className="hb-banner"><Icon n="sparkle"/>Banner — New: dark mode is here. <u>Learn more</u><Icon n="x"/></div><div className="hb-hero"><b>Hero — introduces the whole page</b><span>Headline · explanation · primary action · visual</span><span className="ub primary z-sm">Get started</span></div></div>
    </Frame>),
    'cmp-loading': () => (<Frame label="Three ways to wait">
      <div className="cmpld"><div><div className="sk"><i className="c"/><div><i className="l1"/><i className="l2"/></div></div><b>Skeleton</b><small>Shape known</small></div><div><span className="spinner"/><b>Spinner</b><small>Short, unknown</small></div><div><div className="bar"><i style={{ width: '62%' }}/></div><b>Progress · 62%</b><small>Measurable</small></div></div>
    </Frame>),
});
