import { useMemo, useRef, useState } from 'react';
import { register } from './registry';
import { Frame, Seg } from './kit';
import { Icon } from '../components/Icon';
const rows = [
    { id: 'INV-2041', client: 'Northwind Studio', status: 'Paid', amount: 1250, date: '2026-11-02' },
    { id: 'INV-2042', client: 'Kestrel Labs', status: 'Overdue', amount: 4800, date: '2026-10-21' },
    { id: 'INV-2043', client: 'Harbour & Co', status: 'Draft', amount: 320, date: '2026-11-18' },
    { id: 'INV-2044', client: 'Atlas Freight', status: 'Paid', amount: 9100, date: '2026-11-09' },
    { id: 'INV-2045', client: 'Juniper Health', status: 'Sent', amount: 2640, date: '2026-11-14' },
    { id: 'INV-2046', client: 'Orbit Media', status: 'Sent', amount: 780, date: '2026-11-20' },
    { id: 'INV-2047', client: 'Fern & Field', status: 'Overdue', amount: 1500, date: '2026-10-30' },
];
const stTag = (s) => <span className={'tag ' + { Paid: 'ok', Overdue: 'err', Sent: 'info', Draft: '' }[s]}>{{ Paid: '✓ ', Overdue: '! ', Sent: '→ ', Draft: '' }[s]}{s}</span>;
function Chart({ kind }) {
    const d = [32, 48, 41, 66, 58, 79, 72];
    const W = 300, H = 150, max = 90;
    const x = (i) => 24 + i * ((W - 36) / (d.length - 1));
    const y = (v) => H - 20 - (v / max) * (H - 36);
    const line = d.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
    const axes = <g stroke="#323B4B"><line x1="20" y1={H - 20} x2={W - 6} y2={H - 20}/><line x1="20" y1="10" x2="20" y2={H - 20}/></g>;
    switch (kind) {
        case 'Bar': return <svg viewBox={`0 0 ${W} ${H}`}>{axes}{d.map((v, i) => <rect key={i} x={28 + i * 39} y={y(v)} width="26" height={H - 20 - y(v)} rx="3" fill={i === 5 ? '#2BA6FF' : '#2A3B55'}/>)}</svg>;
        case 'Line': return <svg viewBox={`0 0 ${W} ${H}`}>{axes}<path d={line} fill="none" stroke="#2BA6FF" strokeWidth="2.5"/>{d.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#0B0D12" stroke="#2BA6FF" strokeWidth="2"/>)}</svg>;
        case 'Area': return <svg viewBox={`0 0 ${W} ${H}`}>{axes}<path d={line + `L${x(6)} ${H - 20} L${x(0)} ${H - 20}Z`} fill="rgba(43,166,255,.22)"/><path d={d.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v * .55)}`).join(' ') + `L${x(6)} ${H - 20} L${x(0)} ${H - 20}Z`} fill="rgba(245,181,68,.3)"/><path d={line} fill="none" stroke="#2BA6FF" strokeWidth="2"/></svg>;
        case 'Donut': {
            const parts = [45, 30, 15, 10], cols = ['#2BA6FF', '#F5B544', '#3DD68C', '#8E4EC6'];
            let a = 0;
            return <svg viewBox={`0 0 ${W} ${H}`}>{parts.map((p, i) => { const a0 = a, a1 = a + p / 100 * Math.PI * 2; a = a1; const r = 55, cx = 110, cy = 75; const large = a1 - a0 > Math.PI ? 1 : 0; return <path key={i} d={`M${cx + r * Math.sin(a0)} ${cy - r * Math.cos(a0)} A${r} ${r} 0 ${large} 1 ${cx + r * Math.sin(a1)} ${cy - r * Math.cos(a1)}`} fill="none" stroke={cols[i]} strokeWidth="22"/>; })}<text x="110" y="80" textAnchor="middle" fill="#F9FAFC" fontSize="16" fontFamily="Inter" fontWeight="700">45%</text>{['Direct', 'Search', 'Social', 'Other'].map((l, i) => <g key={l}><rect x="200" y={36 + i * 22} width="10" height="10" rx="2" fill={cols[i]}/><text x="216" y={45 + i * 22} fill="#B8C0CC" fontSize="11" fontFamily="Inter">{l} {parts[i]}%</text></g>)}</svg>;
        }
        case 'Scatter': return <svg viewBox={`0 0 ${W} ${H}`}>{axes}{Array.from({ length: 28 }, (_, i) => { const xv = (i * 37) % 100, yv = xv * .7 + ((i * 53) % 30); return <circle key={i} cx={24 + xv * 2.6} cy={y(yv)} r="4" fill="rgba(43,166,255,.7)"/>; })}<line x1="24" y1={y(10)} x2={W - 10} y2={y(85)} stroke="#F5B544" strokeDasharray="4 4"/></svg>;
        case 'Histogram': return <svg viewBox={`0 0 ${W} ${H}`}>{axes}{[4, 10, 22, 38, 52, 44, 30, 16, 8, 3].map((v, i) => <rect key={i} x={22 + i * 27} y={y(v * 1.5)} width="27" height={H - 20 - y(v * 1.5)} fill="#2A3B55" stroke="#0B0D12"/>)}</svg>;
        case 'Heatmap': return <svg viewBox={`0 0 ${W} ${H}`}>{Array.from({ length: 7 }, (_, r) => Array.from({ length: 12 }, (_, c) => { const v = (Math.sin(r * 1.3 + c * .6) + 1) / 2; return <rect key={r + '-' + c} x={40 + c * 21} y={10 + r * 18} width="19" height="16" rx="2" fill={`hsl(205 85% ${12 + v * 50}%)`}/>; }))}{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <text key={i} x="26" y={22 + i * 18} fill="#8B96A6" fontSize="10" fontFamily="JetBrains Mono">{d}</text>)}</svg>;
        case 'Progress': return <svg viewBox={`0 0 ${W} ${H}`}>{[['Storage', 72], ['Seats', 45], ['API calls', 91]].map(([l, v], i) => <g key={l}><text x="20" y={34 + i * 42} fill="#B8C0CC" fontSize="12" fontFamily="Inter">{l}</text><text x={W - 20} y={34 + i * 42} textAnchor="end" fill="#F9FAFC" fontSize="12" fontFamily="Inter">{v}%</text><rect x="20" y={42 + i * 42} width={W - 40} height="8" rx="4" fill="#1E2430"/><rect x="20" y={42 + i * 42} width={(W - 40) * v / 100} height="8" rx="4" fill={v > 90 ? '#FF6B6B' : '#2BA6FF'}/></g>)}</svg>;
        default: return <svg viewBox={`0 0 ${W} ${H}`}>{['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => <g key={q}><rect x={30 + i * 66} y={y([40, 52, 48, 70][i])} width="22" height={H - 20 - y([40, 52, 48, 70][i])} fill="#2A3B55"/><rect x={54 + i * 66} y={y([46, 60, 62, 81][i])} width="22" height={H - 20 - y([46, 60, 62, 81][i])} fill="#2BA6FF"/><text x={53 + i * 66} y={H - 6} textAnchor="middle" fill="#8B96A6" fontSize="10" fontFamily="Inter">{q}</text></g>)}{axes}</svg>;
    }
}
register({
    cards: () => {
        const [k, setK] = useState('Product');
        const [sel, setSel] = useState(1);
        return (<Frame label="Card types" controls={<Seg label="Card type" options={['Product', 'Pricing', 'KPI', 'Profile', 'Article', 'Selectable']} value={k} onChange={setK}/>} caption="Sample names and numbers are illustrative.">
        <div className="cardx">
          {k === 'Product' && [0, 1, 2].map(i => <article key={i} className="uc prod"><div className="img" style={{ background: ['linear-gradient(135deg,#14448C,#2BA6FF)', 'linear-gradient(135deg,#3a2b10,#F5B544)', 'linear-gradient(135deg,#123a29,#3DD68C)'][i] }}/><span className="label">Lamp</span><b>{['Halo desk lamp', 'Arc floor lamp', 'Moss pendant'][i]}</b><span className="stars-s">★★★★☆ <small>(128)</small></span><span className="price">${[89, 149, 119][i]}</span></article>)}
          {k === 'Pricing' && ['Starter', 'Team', 'Business'].map((p, i) => <article key={p} className={'uc pri' + (i === 1 ? ' rec' : '')}>{i === 1 && <span className="rec-tag">Recommended</span>}<b>{p}</b><span className="pp">${[0, 12, 24][i]}<small>/user/mo</small></span><ul>{['Projects', 'Version history', 'SSO'].slice(0, i + 1).map(f => <li key={f}>✓ {f}</li>)}</ul><span className={'ub ' + (i === 1 ? 'primary' : 'secondary') + ' z-full'}>Choose {p}</span></article>)}
          {k === 'KPI' && [['Revenue', '$84.2k', '+12.4%', true], ['Active users', '9,184', '+3.1%', true], ['Churn', '2.8%', '+0.6 pt', false]].map(([l, v, d, up]) => <article key={l} className="uc kpi"><span className="label">{l}</span><b>{v}</b><span className={up ? 'up' : 'down'}>{up ? '▲' : '▲'} {d} <small>vs last month</small></span><svg viewBox="0 0 100 24"><path d={up ? 'M0 20 L20 16 L40 18 L60 10 L80 8 L100 3' : 'M0 18 L20 17 L40 14 L60 15 L80 9 L100 6'} fill="none" stroke={up ? '#3DD68C' : '#FF6B6B'} strokeWidth="2"/></svg></article>)}
          {k === 'Profile' && [0, 1].map(i => <article key={i} className="uc prof"><span className="av lg" style={{ background: ['#8E4EC6', '#30A46C'][i] }}>{['JL', 'SK'][i]}</span><b>{['Jun Li', 'Sana Kader'][i]}</b><span className="muted">{['Design lead', 'Researcher'][i]}</span><div style={{ display: 'flex', gap: 6 }}><span className="ub secondary z-sm">Message</span><span className="ub primary z-sm">Follow</span></div></article>)}
          {k === 'Article' && [0, 1].map(i => <article key={i} className="uc art hz"><div className="img" style={{ background: ['linear-gradient(135deg,#1E2430,#2BA6FF)', 'linear-gradient(135deg,#1E2430,#8E4EC6)'][i] }}/><div><span className="label">Guide · 6 min</span><b><a href="#t-cards" onClick={e => e.preventDefault()} className="stretch">{['Designing empty states that help', 'A field guide to focus rings'][i]}</a></b><p>{['What to show when there is nothing to show.', 'Visible, consistent, never removed.'][i]}</p><small className="mono">24 Nov 2026</small></div></article>)}
          {k === 'Selectable' && ['Monthly', 'Annual', 'Lifetime'].map((p, i) => <label key={p} className={'uc selc' + (sel === i ? ' on' : '')}><input type="radio" name="plan-c" checked={sel === i} onChange={() => setSel(i)}/><b>{p}</b><span>{['Billed monthly', 'Save 20%', 'One payment'][i]}</span></label>)}
        </div>
      </Frame>);
    },
    lists: () => (<Frame label="List types">
      <div className="lsts">
        <div><span className="label">Two-line with metadata</span><ul className="ul2">{[['Q4 planning', 'Edited by Mira · 2h'], ['Brand refresh', 'Edited by Jun · 1d'], ['Hiring plan', 'Edited by Sana · 3d']].map(([a, b]) => <li key={a}><Icon n="file"/><span><b>{a}</b><small>{b}</small></span><Icon n="more"/></li>)}</ul></div>
        <div><span className="label">Description list</span><dl className="dl2">{[['Plan', 'Team'], ['Seats', '12 of 15'], ['Renews', '1 Jan 2027']].map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></div>
        <div><span className="label">Grouped & dense</span><ul className="ul2 dense"><li className="gh">Today</li>{['Invoice paid', 'New comment'].map(x => <li key={x}>{x}</li>)}<li className="gh">Yesterday</li>{['Project created', 'Member joined'].map(x => <li key={x}>{x}</li>)}</ul></div>
      </div>
    </Frame>),
    'data-table': () => {
        const [sort, setSort] = useState({ k: 'date', d: -1 });
        const [sel, setSel] = useState([]);
        const [q, setQ] = useState('');
        const [page, setPage] = useState(0);
        const per = 4;
        const data = useMemo(() => rows.filter(r => !q || (r.client + r.id + r.status).toLowerCase().includes(q.toLowerCase())).sort((a, b) => (a[sort.k] > b[sort.k] ? 1 : -1) * sort.d), [sort, q]);
        const pages = Math.max(1, Math.ceil(data.length / per));
        const view = data.slice(page * per, page * per + per);
        const H = ({ k, l, num }) => <th scope="col" aria-sort={sort.k === k ? (sort.d === 1 ? 'ascending' : 'descending') : 'none'} className={num ? 'num' : ''}><button onClick={() => setSort({ k, d: sort.k === k ? -sort.d : 1 })}>{l}<Icon n="sort" s={12}/></button></th>;
        return (<Frame label="Sortable, filterable, selectable data table" caption="Click headers to sort. Select rows to reveal bulk actions. Filter to zero results to see the empty state. Client names are fictional." pad={false}>
        <div className="dtx">
          <div className="dt-bar">{sel.length ? <div className="bulk"><b>{sel.length} selected</b><button className="ub secondary z-sm">Send reminder</button><button className="ub danger z-sm">Delete</button><button className="ub ghost z-sm" onClick={() => setSel([])}>Clear</button></div> : <div className="dt-search"><Icon n="search"/><input value={q} onChange={e => { setQ(e.target.value); setPage(0); }} placeholder="Filter invoices" aria-label="Filter invoices"/></div>}</div>
          <div className="scroll"><table className="ut">
            <caption className="sr-only">Invoices, sorted by {sort.k} {sort.d === 1 ? 'ascending' : 'descending'}</caption>
            <thead><tr><th scope="col" className="cbc"><input type="checkbox" aria-label="Select all on page" checked={view.length > 0 && view.every(r => sel.includes(r.id))} onChange={e => setSel(e.target.checked ? Array.from(new Set([...sel, ...view.map(r => r.id)])) : sel.filter(s => !view.some(r => r.id === s)))}/></th><H k="id" l="Invoice"/><H k="client" l="Client"/><H k="status" l="Status"/><H k="date" l="Issued"/><H k="amount" l="Amount" num/></tr></thead>
            <tbody>{view.length ? view.map(r => <tr key={r.id} className={sel.includes(r.id) ? 'sel' : ''}><td className="cbc"><input type="checkbox" aria-label={'Select ' + r.id} checked={sel.includes(r.id)} onChange={() => setSel(s => s.includes(r.id) ? s.filter(x => x !== r.id) : [...s, r.id])}/></td><td className="mono">{r.id}</td><td>{r.client}</td><td>{stTag(r.status)}</td><td className="mono">{r.date}</td><td className="num">${r.amount.toLocaleString('en-US')}</td></tr>)
                : <tr><td colSpan={6}><div className="t-empty"><Icon n="search" s={22}/><b>No invoices match “{q}”</b><span>Try a client name or status.</span><button className="ub secondary z-sm" onClick={() => setQ('')}>Clear filter</button></div></td></tr>}</tbody>
          </table></div>
          <div className="dt-foot"><span>{data.length ? `${page * per + 1}–${Math.min(data.length, page * per + per)} of ${data.length}` : '0 results'}</span><span><button className="icon-btn" disabled={page === 0} onClick={() => setPage(p => p - 1)} aria-label="Previous page"><Icon n="chevL"/></button><button className="icon-btn" disabled={page >= pages - 1} onClick={() => setPage(p => p + 1)} aria-label="Next page"><Icon n="chev"/></button></span></div>
        </div>
      </Frame>);
    },
    accordion: () => {
        const [open, setOpen] = useState([0]);
        const items = [['What is included in the free plan?', 'Up to three projects, unlimited viewers and 30 days of version history.'], ['Can I change plans later?', 'Yes. Upgrades apply immediately; downgrades apply at the end of the billing period.'], ['Do you offer discounts for education?', 'Verified students and teachers can apply for an education plan.']];
        return (<Frame label="Accordion (multi-open)" caption="Headers are buttons inside headings with aria-expanded.">
        <div className="acc">{items.map(([q, a], i) => { const o = open.includes(i); return <div key={i} className={o ? 'o' : ''}><h4><button aria-expanded={o} aria-controls={'acc-' + i} id={'acch-' + i} onClick={() => setOpen(v => o ? v.filter(x => x !== i) : [...v, i])}>{q}<Icon n="chevD"/></button></h4><div id={'acc-' + i} role="region" aria-labelledby={'acch-' + i} hidden={!o}><p>{a}</p></div></div>; })}</div>
      </Frame>);
    },
    carousel: () => {
        const track = useRef(null);
        const [i, setI] = useState(0);
        const n = 6;
        const goTo = (k) => { const t = track.current; if (!t)
            return; const c = t.children[Math.max(0, Math.min(n - 1, k))]; t.scrollTo({ left: c.offsetLeft - t.offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
        return (<Frame label="Scroll-snap carousel" controls={<span style={{ display: 'flex', gap: 6 }}><button className="icon-btn" onClick={() => goTo(i - 1)} aria-label="Previous slide"><Icon n="chevL"/></button><button className="icon-btn" onClick={() => goTo(i + 1)} aria-label="Next slide"><Icon n="chev"/></button></span>} caption={`Slide ${i + 1} of ${n}. Native horizontal scrolling with snap, visible controls and arrow-key support.`}>
        <div className="car" ref={track} tabIndex={0} aria-roledescription="carousel" aria-label="Gallery" onScroll={e => { const t = e.currentTarget; setI(Math.round(t.scrollLeft / (t.children[0].offsetWidth + 12))); }} onKeyDown={e => { if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(i + 1);
        } if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(i - 1);
        } }}>
          {Array.from({ length: n }, (_, k) => <div key={k} className="slide" role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`} style={{ background: `linear-gradient(135deg, hsl(${200 + k * 22} 60% 22%), hsl(${200 + k * 22} 80% 50%))` }}><span>{String(k + 1).padStart(2, '0')}</span></div>)}
        </div>
        <div className="dots">{Array.from({ length: n }, (_, k) => <button key={k} aria-label={'Go to slide ' + (k + 1)} aria-current={k === i} onClick={() => goTo(k)}/>)}</div>
      </Frame>);
    },
    media: () => {
        const [p, setP] = useState(false);
        const [t, setT] = useState(38);
        const [cc, setCc] = useState(true);
        return (<Frame label="Media player anatomy" caption="A static teaching mock-up: controls are operable to show states; no media file is loaded.">
        <div className="mp"><div className="mp-screen">{cc && <span className="caption-line">[Captions] Welcome to the design review.</span>}<button className="mp-big" onClick={() => setP(v => !v)} aria-label={p ? 'Pause' : 'Play'}><Icon n={p ? 'pause' : 'play'} s={26}/></button></div>
          <div className="mp-bar"><button className="icon-btn" onClick={() => setP(v => !v)} aria-label={p ? 'Pause' : 'Play'}><Icon n={p ? 'pause' : 'play'}/></button><span className="mono">{`0:${String(Math.round(t * .6)).padStart(2, '0')}`} / 1:00</span><input type="range" value={t} min={0} max={100} onChange={e => setT(+e.target.value)} aria-label="Seek" aria-valuetext={`${Math.round(t * .6)} seconds`}/><button className="icon-btn" aria-label="Volume"><Icon n="volume"/></button><button className="icon-btn" aria-pressed={cc} onClick={() => setCc(v => !v)} aria-label="Captions"><Icon n="cc"/></button><span className="mono speed">1×</span><button className="icon-btn" aria-label="Fullscreen"><Icon n="full"/></button></div></div>
      </Frame>);
    },
    codeblock: () => (<Frame label="Code block">
      <figure className="cb"><figcaption><span className="mono">tokens.css</span><span className="chip">CSS</span></figcaption><pre tabIndex={0}><code>{[[':root', ' {'], ['  --color-action-primary', ': var(--blue-500);'], ['  --radius-md', ': 10px;'], ['  --motion-standard', ': 200ms cubic-bezier(.4, 0, .2, 1);'], ['}', '']].map(([a, b], i) => <span key={i} className="ln"><i>{i + 1}</i><span className={i && i < 4 ? 'tk-p' : 'tk-s'}>{a}</span><span className="tk-v">{b}</span>{'\n'}</span>)}</code></pre></figure>
      <p style={{ marginTop: 12 }}>Inline: set <code className="ic">font-variant-numeric: tabular-nums</code> on tables.</p>
    </Frame>),
    'file-preview': () => (<Frame label="File previews">
      <div className="fpv">{[['PDF', 'Q4-report.pdf', '2.4 MB', '#E5484D'], ['PNG', 'hero-v2.png', '840 KB', '#2BA6FF'], ['XLSX', 'budget-2027.xlsx', '96 KB', '#30A46C'], ['FIG', 'components.fig', '12.1 MB', '#8E4EC6']].map(([t, n, s, c]) => <div key={n}><span className="ft" style={{ background: c }}>{t}</span><span><b>{n}</b><small>{t} · {s}</small></span><button className="icon-btn" aria-label={'Download ' + n}><Icon n="download"/></button></div>)}</div>
    </Frame>),
    timeline: () => (<Frame label="Timeline & activity feed">
      <div className="tl2">
        <ol className="tl">{[['Order placed', '24 Nov · 09:12', 1], ['Payment confirmed', '24 Nov · 09:13', 1], ['Packed', '24 Nov · 15:40', 1], ['Out for delivery', 'Expected 26 Nov', 0], ['Delivered', '—', 0]].map(([a, b, d]) => <li key={a} className={d ? 'd' : ''}><i /><b>{a}</b><time>{b}</time></li>)}</ol>
        <ul className="feed">{[['MO', 'Mira', 'commented on', 'Homepage v3', '2m'], ['JL', 'Jun', 'moved', 'Checkout bug', '1h'], ['SK', 'Sana', 'uploaded', 'Interview notes', '3h']].map(([i, w, v, o, t]) => <li key={o}><span className="av sm">{i}</span><span><b>{w}</b> {v} <b>{o}</b></span><time>{t} ago</time></li>)}</ul>
      </div>
    </Frame>),
    comments: () => (<Frame label="Comments & reviews" caption="Content shown is illustrative sample text, not real reviews.">
      <div className="cmts">
        <div className="rv-sum"><b>4.6</b><span className="stars" style={{ ['--v']: 4.6 }}>★★★★★</span><small>Sample distribution</small>{[5, 4, 3, 2, 1].map((s, i) => <div key={s} className="rv-bar"><span>{s}★</span><i><b style={{ width: [72, 18, 6, 2, 2][i] + '%' }}/></i></div>)}</div>
        <ul className="thread"><li><span className="av sm">MO</span><div><b>Mira Okafor</b> <time>2h</time><p>Can we tighten the spacing inside the card header?</p><span className="react">👍 3 · <button className="link-btn">Reply</button></span>
          <ul><li><span className="av sm" style={{ background: '#8E4EC6' }}>JL</span><div><b>Jun Li</b> <time>1h</time><p>Done — moved to the 12px step.</p></div></li></ul></div></li></ul>
      </div>
    </Frame>),
    charts: () => {
        const [k, setK] = useState('Bar');
        const q = { Bar: 'Compare categories', Line: 'Trend over time', Area: 'Volume & parts over time', Donut: 'Parts of a whole (few)', Scatter: 'Relationship between two variables', Histogram: 'Distribution of one variable', Heatmap: 'Values across two dimensions', Progress: 'Value against a goal', Comparison: 'Grouped comparison' };
        return (<Frame label="Chart types" controls={<select className="dsel" value={k} onChange={e => setK(e.target.value)} aria-label="Chart type">{Object.keys(q).map(x => <option key={x}>{x}</option>)}</select>} caption={<><b>Answers:</b> {q[k]}. Sample data.</>}>
        <div className="chartx" role="img" aria-label={`${k} chart example showing ${q[k].toLowerCase()}`}><Chart kind={k}/></div>
      </Frame>);
    },
    'chart-anatomy': () => (<Frame label="Annotated chart anatomy">
      <svg viewBox="0 0 640 300" className="chan" role="img" aria-label="Line chart showing sign-ups rising from 1,200 in January to 3,400 in June, with labelled axes, gridlines, direct labels and an annotation.">
        <text x="40" y="26" fill="#F9FAFC" fontFamily="Schibsted Grotesk" fontWeight="700" fontSize="16">Sign-ups nearly tripled after the redesign</text>
        {[0, 1, 2, 3].map(i => <g key={i}><line x1="70" x2="560" y1={250 - i * 55} y2={250 - i * 55} stroke="#1E2430"/><text x="62" y={254 - i * 55} textAnchor="end" fill="#8B96A6" fontSize="11" fontFamily="JetBrains Mono">{i * 1}k</text></g>)}
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => <text key={m} x={90 + i * 90} y="270" textAnchor="middle" fill="#8B96A6" fontSize="11" fontFamily="Inter">{m}</text>)}
        <path d="M90 184 L180 178 L270 170 L360 120 L450 88 L540 63" fill="none" stroke="#2BA6FF" strokeWidth="2.5"/><path d="M90 200 L180 196 L270 194 L360 186 L450 182 L540 176" fill="none" stroke="#8B96A6" strokeWidth="2" strokeDasharray="5 4"/>
        <text x="548" y="60" fill="#7FBCF6" fontSize="12" fontFamily="Inter" fontWeight="600">Sign-ups 3.4k</text><text x="548" y="180" fill="#B8C0CC" fontSize="12" fontFamily="Inter">Target</text>
        <line x1="315" y1="70" x2="315" y2="250" stroke="#F5B544" strokeDasharray="3 3"/><text x="322" y="80" fill="#F5B544" fontSize="11" fontFamily="Inter">Redesign launched</text>
        <text x="40" y="292" fill="#5A6678" fontSize="10" fontFamily="JetBrains Mono">Source: sample data · Updated 24 Nov 2026</text>
      </svg>
      <ul className="chan-leg">{['Title states the finding', 'Axes with units and subtle gridlines', 'Direct labels instead of a distant legend', 'Dashed line + text for the target (not color alone)', 'Annotation for the event', 'Source and date'].map(x => <li key={x}>{x}</li>)}</ul>
    </Frame>),
    /* Navigation */
    navbars: () => {
        const [k, setK] = useState('Floating');
        return (<Frame label="Top navigation variants" controls={<Seg label="Navbar type" options={['Static', 'Sticky', 'Transparent', 'Floating']} value={k} onChange={setK}/>} caption={{ Static: 'Scrolls away with the page.', Sticky: 'Sticks to the top once reached; gains a border/blur.', Transparent: 'Sits over the hero; needs a scrim for contrast.', Floating: 'Detached, pill-shaped, with margin around it.' }[k]}>
        <div className={'nbx ' + k.toLowerCase()}><div className="nb"><b>Logo</b><span><i className="on">Product</i><i>Pricing</i><i>Docs</i><i>Blog</i></span><span className="ub primary z-sm">Sign up</span></div><div className="nb-hero"/></div>
      </Frame>);
    },
    sidebar: () => {
        const [col, setCol] = useState(false);
        const [open, setOpen] = useState(['Projects']);
        const [cur, setCur] = useState('Roadmap');
        const tree = [['home', 'Overview', []], ['folder', 'Projects', ['Roadmap', 'Website', 'Mobile app']], ['user', 'Team', ['Members', 'Roles']], ['gear', 'Settings', []]];
        return (<Frame label="Collapsible sidebar with nesting" controls={<button className="btn btn-sm" onClick={() => setCol(v => !v)} aria-pressed={col}>{col ? 'Expand' : 'Collapse'} sidebar</button>}>
        <div className="sbx"><nav className={'sbn' + (col ? ' col' : '')} aria-label="Example sidebar">{tree.map(([ic, l, kids]) => (<div key={l}><button className={'sb-i' + (cur === l ? ' cur' : '')} aria-expanded={kids.length ? open.includes(l) : undefined} onClick={() => kids.length ? setOpen(o => o.includes(l) ? o.filter(x => x !== l) : [...o, l]) : setCur(l)} title={col ? l : undefined}><Icon n={ic}/><span>{l}</span>{kids.length > 0 && <Icon n="chev" s={12} className={'ch' + (open.includes(l) ? ' r' : '')}/>}</button>
            {!col && kids.length > 0 && open.includes(l) && <div className="sb-k">{kids.map(k => <button key={k} className={'sb-i sub' + (cur === k ? ' cur' : '')} aria-current={cur === k ? 'page' : undefined} onClick={() => setCur(k)}>{k}</button>)}</div>}</div>))}</nav><div className="sb-main"><span className="label">Current</span><b>{cur}</b></div></div>
      </Frame>);
    },
    'rail-bottom': () => {
        const [cur, setCur] = useState(0);
        const items = [['home', 'Home'], ['search', 'Search'], ['bell', 'Activity'], ['user', 'Profile']];
        const Items = ({ cls }) => <>{items.map(([ic, l], i) => <button key={l} className={cls + (i === cur ? ' on' : '')} aria-current={i === cur ? 'page' : undefined} onClick={() => setCur(i)}><span className="pillbg"><Icon n={ic} s={20}/></span><span>{l}</span></button>)}</>;
        return (<Frame label="Bottom navigation (phone) · navigation rail (tablet)" caption="Same destinations, same current state, adapted to device. Icons + always-visible labels.">
        <div className="rbx"><div className="phone"><div className="scr"><b>{items[cur][1]}</b></div><nav className="bnav" aria-label="Bottom navigation example"><Items cls="bn"/></nav></div>
          <div className="tablet"><nav className="rail" aria-label="Navigation rail example"><span className="fab"><Icon n="plus"/></span><Items cls="rl"/></nav><div className="scr"><b>{items[cur][1]}</b></div></div></div>
      </Frame>);
    },
    'responsive-nav': () => {
        const [w, setW] = useState('Mobile');
        const [o, setO] = useState(false);
        return (<Frame label="Navigation across breakpoints" controls={<Seg label="Device" options={['Desktop', 'Tablet', 'Mobile']} value={w} onChange={v => { setW(v); setO(false); }}/>} caption={{ Desktop: 'All links visible in the top bar.', Tablet: 'Priority+ — the top links stay, the rest move into "More".', Mobile: 'A labelled Menu button opens a drawer; focus moves into it and Escape closes.' }[w]}>
        <div className={'rnx ' + w.toLowerCase()}><div className="rn-bar"><b>Logo</b>
          {w === 'Desktop' && <span className="rn-l">{['Products', 'Solutions', 'Pricing', 'Docs', 'Company'].map(x => <i key={x}>{x}</i>)}</span>}
          {w === 'Tablet' && <span className="rn-l">{['Products', 'Pricing', 'Docs'].map(x => <i key={x}>{x}</i>)}<i>More ▾</i></span>}
          {w === 'Mobile' && <button className="btn btn-sm" aria-expanded={o} onClick={() => setO(v => !v)}><Icon n={o ? 'x' : 'menu'}/>Menu</button>}</div>
          {w === 'Mobile' && o && <div className="rn-drawer">{['Products', 'Solutions', 'Pricing', 'Docs', 'Company'].map(x => <span key={x}>{x}<Icon n="chev" s={14}/></span>)}</div>}
        </div>
      </Frame>);
    },
    menus: () => {
        const [open, setOpen] = useState(false);
        const [ctx, setCtx] = useState(null);
        const [last, setLast] = useState('—');
        const [sub, setSub] = useState(false);
        const items = ['Rename', 'Duplicate', 'Move to…', 'Delete'];
        return (<Frame label="Dropdown, nested & context menus" caption={`Last action: ${last}. Right-click (or long-press) the file card for a context menu.`}>
        <div className="mnx" onClick={() => { setOpen(false); setCtx(null); }}>
          <div className="mn-wrap" onClick={e => e.stopPropagation()}><button className="btn btn-sm" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(v => !v)}>Actions <Icon n="chevD"/></button>
            {open && <ul className="menu" role="menu" onKeyDown={e => { if (e.key === 'Escape')
            setOpen(false); }}>{items.map(x => x === 'Move to…' ? <li key={x} role="none" onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)}><button role="menuitem" aria-haspopup="menu" aria-expanded={sub} onClick={() => setSub(v => !v)}>{x}<Icon n="chev" s={12}/></button>{sub && <ul className="menu sub" role="menu">{['Archive', 'Design', 'Research'].map(f => <li key={f} role="none"><button role="menuitem" onClick={() => { setLast('Move to ' + f); setOpen(false); setSub(false); }}>{f}</button></li>)}</ul>}</li> : <li key={x} role="none"><button role="menuitem" className={x === 'Delete' ? 'danger' : ''} onClick={() => { setLast(x); setOpen(false); }}>{x}{x === 'Rename' && <kbd>F2</kbd>}</button></li>)}</ul>}
          </div>
          <div className="mn-file" onContextMenu={e => { e.preventDefault(); const r = e.currentTarget.parentElement.getBoundingClientRect(); setCtx({ x: e.clientX - r.left, y: e.clientY - r.top }); }} tabIndex={0} onKeyDown={e => { if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
            e.preventDefault();
            setCtx({ x: 40, y: 40 });
        } }}><Icon n="file" s={22}/><b>roadmap.pdf</b><small>Right-click me</small></div>
          {ctx && <ul className="menu" role="menu" style={{ position: 'absolute', left: ctx.x, top: ctx.y }} onClick={e => e.stopPropagation()}>{['Open', 'Share', 'Download', 'Delete'].map(x => <li key={x} role="none"><button role="menuitem" className={x === 'Delete' ? 'danger' : ''} onClick={() => { setLast(x + ' (context)'); setCtx(null); }}>{x}</button></li>)}</ul>}
          <div className="mega"><span className="label">Mega menu (schematic)</span><div>{['Products', 'Solutions', 'Resources'].map(c => <div key={c}><b>{c}</b>{[1, 2, 3].map(i => <i key={i}/>)}</div>)}</div></div>
        </div>
      </Frame>);
    },
    breadcrumbs: () => (<Frame label="Breadcrumb variants">
      <div className="bcx">
        <nav aria-label="Breadcrumb example"><ol className="crumbs"><li><a href="#ui">Home</a></li><li><a href="#c-navigation">Navigation</a></li><li><a href="#t-breadcrumbs" onClick={e => e.preventDefault()}>Wayfinding</a></li><li><span aria-current="page">Breadcrumbs</span></li></ol></nav>
        <nav aria-label="Collapsed breadcrumb example"><ol className="crumbs"><li><a href="#ui">Home</a></li><li><button className="link-btn" aria-label="Show 3 hidden levels">…</button></li><li><a href="#c-navigation">Patterns</a></li><li><span aria-current="page">Breadcrumbs</span></li></ol></nav>
        <a href="#c-navigation" className="back-link"><Icon n="chevL" s={14}/>Back to Navigation</a>
      </div>
    </Frame>),
    tabs: () => {
        const tabs = ['Overview', 'Activity', 'Settings'];
        const [i, setI] = useState(0);
        const refs = useRef([]);
        const key = (e) => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d)
            return; const n = (i + d + tabs.length) % tabs.length; setI(n); refs.current[n]?.focus(); };
        return (<Frame label="Tabs (ARIA pattern)" caption="Arrow keys move between tabs; Tab moves into the panel.">
        <div className="tbx"><div role="tablist" aria-label="Project" onKeyDown={key}>{tabs.map((t, k) => <button key={t} ref={el => { if (el)
            refs.current[k] = el; }} role="tab" aria-selected={k === i} tabIndex={k === i ? 0 : -1} aria-controls={'tp-' + k} id={'tb-' + k} onClick={() => setI(k)}>{t}{k === 1 && <span className="counter-s">4</span>}</button>)}</div>
          {tabs.map((t, k) => <div key={t} role="tabpanel" id={'tp-' + k} aria-labelledby={'tb-' + k} hidden={k !== i} tabIndex={0}><p>{['Project summary, owners and key dates.', 'Four new updates since your last visit.', 'Visibility, notifications and integrations.'][k]}</p></div>)}</div>
      </Frame>);
    },
    pagination: () => {
        const [p, setP] = useState(4);
        const total = 12;
        const pages = [1, ...[p - 1, p, p + 1].filter(x => x > 1 && x < total), total];
        return (<Frame label="Numbered pagination">
        <nav aria-label="Pagination example" className="pgx"><button className="ub ghost z-sm" disabled={p === 1} onClick={() => setP(p - 1)}><Icon n="chevL"/>Previous</button>
          {pages.map((n, k) => <span key={n} style={{ display: 'contents' }}>{k > 0 && n - pages[k - 1] > 1 && <span className="ell">…</span>}<button className={'pg' + (n === p ? ' cur' : '')} aria-current={n === p ? 'page' : undefined} aria-label={'Page ' + n} onClick={() => setP(n)}>{n}</button></span>)}
          <button className="ub ghost z-sm" disabled={p === total} onClick={() => setP(p + 1)}>Next<Icon n="chev"/></button></nav>
        <div className="loadmore"><span className="muted">Alternative:</span><button className="ub secondary z-sm">Load 20 more</button><span className="muted">Showing 40 of 236</span></div>
      </Frame>);
    },
    stepper: () => {
        const [s, setS] = useState(1);
        const steps = ['Cart', 'Delivery', 'Payment', 'Review'];
        return (<Frame label="Stepper" controls={<span style={{ display: 'flex', gap: 6 }}><button className="btn btn-sm" onClick={() => setS(Math.max(0, s - 1))}>Back</button><button className="btn btn-sm btn-primary" onClick={() => setS(Math.min(4, s + 1))}>Next</button></span>}>
        <ol className="stp">{steps.map((x, i) => <li key={x} className={i < s ? 'done' : i === s ? 'cur' : ''} aria-current={i === s ? 'step' : undefined}><i>{i < s ? '✓' : i + 1}</i><span>{x}<small>{i < s ? 'Complete' : i === s ? 'Current' : 'Upcoming'}</small></span></li>)}</ol>
        <p className="hint" style={{ textAlign: 'center' }}>{s < 4 ? `Step ${s + 1} of 4: ${steps[s]}` : 'All steps complete'}</p>
      </Frame>);
    },
    toc: () => (<Frame label="This page is the demonstration" caption="The “On this page” panel to the right (or the collapsible list at the top on smaller screens) highlights the section in view as you scroll — scroll-spy — and the bar in the header shows reading progress.">
      <div className="tocx"><div className="toc-mini"><span className="label">On this page</span>{['Definition', 'Why it exists', 'Visual demonstration', 'Types & variants', 'Accessibility'].map((x, i) => <span key={x} className={i === 2 ? 'on' : ''}>{x}</span>)}</div><div className="toc-doc">{[0, 1, 2, 3, 4].map(i => <div key={i} className={i === 2 ? 'on' : ''}><b /><i /><i /></div>)}</div></div>
    </Frame>),
    'nav-states': () => (<Frame label="Navigation states">
      <div className="nsx">{[['Default', ''], ['Hover', 'hov'], ['Focus', 'foc'], ['Current page', 'cur'], ['Expanded', 'exp'], ['Disabled', 'dis'], ['Overflow', 'ovf']].map(([l, c]) => <div key={l}><span className={'ns ' + c}>{c === 'exp' ? <>Projects <Icon n="chevD" s={12}/></> : c === 'ovf' ? <>More <Icon n="more" s={12}/></> : 'Projects'}</span><small>{l}</small></div>)}</div>
    </Frame>),
});
