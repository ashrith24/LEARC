import { useState } from 'react';
import { register } from './registry';
import { Frame, Seg, Range, GoodBad } from './kit';
import { Icon } from '../components/Icon';
const st = { fill: 'none', stroke: '#7FBCF6', strokeWidth: 1.5 };
register({
    shapes: () => (<Frame label="Basic shapes and where they appear" caption="Each shape with a typical interface use.">
      <div className="shapes">{[
            ['Circle', <circle cx="40" cy="40" r="28" {...st}/>, 'Avatar, radio, status dot'],
            ['Oval', <ellipse cx="40" cy="40" rx="34" ry="22" {...st}/>, 'Decorative backgrounds'],
            ['Square', <rect x="14" y="14" width="52" height="52" {...st}/>, 'Checkbox, thumbnail, app icon'],
            ['Rectangle', <rect x="6" y="22" width="68" height="36" {...st}/>, 'Card, input, panel'],
            ['Rounded rect', <rect x="6" y="22" width="68" height="36" rx="10" {...st}/>, 'Buttons, cards'],
            ['Sharp corners', <rect x="6" y="22" width="68" height="36" rx="0" {...st} strokeWidth={2.5}/>, 'Editorial, technical'],
            ['Triangle', <path d="M40 12 L70 66 H10Z" {...st}/>, 'Play, warning, direction'],
            ['Polygon', <path d="M40 10 L68 30 L58 66 H22 L12 30Z" {...st}/>, 'Badges, achievements'],
            ['Hexagon', <path d="M40 8 L68 24 V56 L40 72 L12 56 V24Z" {...st}/>, 'Tech & game aesthetics'],
        ].map(([n, s, u]) => <div key={n}><svg viewBox="0 0 80 80">{s}</svg><b>{n}</b><span>{u}</span></div>)}</div>
    </Frame>),
    lines: () => (<Frame label="Lines, curves, diagonals, organic forms">
      <div className="lines">{[
            ['Horizontal', <line x1="10" y1="40" x2="150" y2="40" {...st}/>, 'Dividers, rules — stable'],
            ['Vertical', <line x1="80" y1="6" x2="80" y2="74" {...st}/>, 'Columns, timelines'],
            ['Diagonal', <><path d="M0 70 L160 20 V80 H0Z" fill="rgba(43,166,255,.15)"/><line x1="0" y1="70" x2="160" y2="20" {...st}/></>, 'Dynamic section edges'],
            ['Curve', <path d="M0 60 C40 10 80 80 160 30" {...st}/>, 'Waves, chart lines'],
            ['Organic', <path d="M40 18 C80 0 140 20 130 46 C122 70 70 76 42 64 C14 52 10 30 40 18Z" fill="rgba(43,166,255,.15)" {...st}/>, 'Friendly, natural brands'],
        ].map(([n, s, u]) => <div key={n}><svg viewBox="0 0 160 80" preserveAspectRatio="none">{s}</svg><b>{n}</b><span>{u}</span></div>)}</div>
    </Frame>),
    pills: () => (<Frame label="Pills, containers, silhouettes, negative space" caption="Radius = half the height produces a pill. Silhouettes and negative space make icons recognisable at small sizes.">
      <div className="pills">
        <div className="pl-row"><span className="pill">Design</span><span className="pill on">Filter: Open ✕</span><span className="pill-tg"><i /></span><span className="pill-search"><Icon n="search" s={14}/> Search</span></div>
        <div className="pl-row">
          <svg viewBox="0 0 64 64" width="64"><circle cx="32" cy="22" r="11" fill="#7FBCF6"/><rect x="14" y="36" width="36" height="22" rx="11" fill="#7FBCF6"/></svg><span className="arrow">=</span>
          <svg viewBox="0 0 64 64" width="64"><circle cx="32" cy="20" r="11" fill="#F9FAFC"/><path d="M12 58a20 20 0 0 1 40 0Z" fill="#F9FAFC"/></svg><span className="muted" style={{ fontSize: 13 }}>circle + capsule = person silhouette</span>
          <svg viewBox="0 0 80 64" width="80"><rect x="4" y="8" width="72" height="48" rx="8" fill="#2BA6FF"/><path d="M30 20 L50 32 L30 44Z" fill="#0B0D12"/></svg><span className="muted" style={{ fontSize: 13 }}>negative-space play glyph</span>
        </div>
        <div className="pattern" aria-hidden="true"/>
      </div>
    </Frame>),
    'shape-moods': () => (<Frame label="Conventional associations (contextual)" caption="These describe common design conventions, not universal psychological laws.">
      <div className="moods">{[['Circles & curves', <circle cx="50" cy="50" r="34" fill="#7FBCF6"/>, 'friendly · complete · soft'], ['Squares & rectangles', <rect x="18" y="18" width="64" height="64" fill="#2BA6FF"/>, 'stable · ordered · reliable'], ['Triangles & diagonals', <path d="M50 12 L88 84 H12Z" fill="#F5B544"/>, 'directional · dynamic · tense'], ['Organic forms', <path d="M30 20 C70 0 96 40 80 70 C62 98 20 86 14 60 C8 40 14 28 30 20Z" fill="#3DD68C"/>, 'natural · human · expressive']].map(([k, s, d]) => <div key={k}><svg viewBox="0 0 100 100">{s}</svg><b>{k}</b><span>{d}</span></div>)}</div>
    </Frame>),
    'shape-language': () => {
        const [m, setM] = useState('Soft');
        const r = m === 'Soft' ? [999, 20, 999, 16] : m === 'Precise' ? [2, 2, 4, 2] : [999, 2, 4, 20];
        return (<Frame label="One component set, three shape languages" controls={<Seg label="Shape language" options={['Soft', 'Precise', 'Mixed']} value={m} onChange={setM}/>} caption={m === 'Mixed' ? 'Mixed signals: pill buttons, sharp cards, square avatars and rounded badges do not feel like one family.' : `${m}: buttons, cards, avatars and badges share one corner logic.`}>
        <div className="sl" style={{ ['--rb']: r[0] + 'px', ['--rc']: r[1] + 'px', ['--ra']: r[2] + 'px', ['--rg']: r[3] + 'px' }}>
          <div className="sl-card"><div className="sl-top"><i className="sl-av"/><div><b>Mira Okafor</b><span>Product designer</span></div><span className="sl-badge">Pro</span></div><div className="sl-chart">{[30, 50, 40, 70, 55].map((v, i) => <i key={i} style={{ height: v }}/>)}</div><div className="sl-actions"><span className="sl-btn">Follow</span><span className="sl-btn ghost">Message</span></div></div>
        </div>
      </Frame>);
    },
    radius: () => {
        const [outer, setOuter] = useState(20);
        const [pad, setPad] = useState(8);
        const inner = Math.max(0, outer - pad);
        return (<Frame label="Corner-radius scale & nested radii" controls={<><Range label="Outer" value={outer} min={0} max={32} onChange={setOuter} unit="px"/><Range label="Gap" value={pad} min={0} max={20} onChange={setPad} unit="px"/></>} caption={`Nested rule: inner = outer − gap → ${outer} − ${pad} = ${inner}px. Using the same radius inside looks visibly off.`}>
        <div className="rad-scale">{[['none', 0], ['xs', 4], ['sm', 6], ['md', 10], ['lg', 14], ['xl', 20], ['full', 999]].map(([n, v]) => <div key={n}><i style={{ borderRadius: v }}/><code>{n}<br />{v === 999 ? '∞' : v}</code></div>)}</div>
        <div className="nest">
          <div><div className="o" style={{ borderRadius: outer, padding: pad }}><div className="i" style={{ borderRadius: inner }}/></div><span>✓ inner {inner}px</span></div>
          <div><div className="o" style={{ borderRadius: outer, padding: pad }}><div className="i" style={{ borderRadius: outer }}/></div><span>✕ inner {outer}px (same)</span></div>
        </div>
      </Frame>);
    },
    /* Typography */
    'type-anatomy': () => (<Frame label="Anatomy of a letterform" caption="Set in Schibsted Grotesk. Guide lines are drawn by hand to show where each metric sits; exact values differ from font to font.">
      <svg viewBox="0 0 720 300" className="ta" role="img" aria-label="Diagram of the word Hxgpa with baseline, x-height, cap height, ascender and descender lines labelled">
        {[[70, 'Ascender'], [86, 'Cap height'], [150, 'x-height'], [232, 'Baseline'], [276, 'Descender']].map(([y, l]) => <g key={l}><line x1="20" x2="700" y1={y} y2={y} stroke={l === 'Baseline' ? '#2BA6FF' : '#323B4B'} strokeDasharray={l === 'Baseline' ? '' : '4 4'}/><text x="700" y={y - 6} textAnchor="end" fill={l === 'Baseline' ? '#2BA6FF' : '#8B96A6'} fontFamily="JetBrains Mono" fontSize="12">{l}</text></g>)}
        <text x="34" y="232" fill="#F9FAFC" fontFamily="Schibsted Grotesk, Inter, sans-serif" fontSize="200" fontWeight="600" letterSpacing="-4">Hxgpd</text>
        <g fontFamily="JetBrains Mono" fontSize="11" fill="#7FBCF6"><text x="66" y="30">stem</text><line x1="80" y1="36" x2="80" y2="100" stroke="#7FBCF6"/><text x="345" y="196">counter</text><circle cx="372" cy="200" r="4" fill="#7FBCF6"/><text x="420" y="292">descender</text></g>
      </svg>
    </Frame>),
    'type-classes': () => (<Frame label="Classification specimens" caption="Display and script styles are for large, short text; sans-serif and serif carry UI and reading text; monospace carries code and data.">
      <div className="tclass">{[
            ['Sans-serif', 'Inter', 'var(--f-text)', 400, 'UI default'], ['Geometric/grotesque display', 'Schibsted Grotesk', 'var(--f-display)', 800, 'Headlines'], ['Serif', 'Instrument Serif', "'Instrument Serif', Georgia, serif", 400, 'Editorial'],
            ['Slab serif', 'Roboto Slab', "'Roboto Slab', Rockwell, serif", 700, 'Sturdy headlines'], ['Monospace', 'JetBrains Mono', 'var(--f-mono)', 500, 'Code, data'], ['Script', 'Caveat', "'Caveat', cursive", 500, 'Accents only'],
        ].map(([k, n, f, w, u]) => <div key={k}><span className="label">{k}</span><span className="spec" style={{ fontFamily: f, fontWeight: w }}>Rag 123</span><small>{n} · {u}</small></div>)}
        <div className="var"><span className="label">Variable font — weight axis</span><span className="spec vf">Wght</span><small>Schibsted Grotesk animates 400 → 900 on hover</small></div>
      </div>
    </Frame>),
    'font-props': () => {
        const [w, setW] = useState(500), [s, setS] = useState(18), [lh, setLh] = useState(1.55), [ls, setLs] = useState(0), [ws, setWs] = useState(0);
        return (<Frame label="Font properties" caption={`font: ${w} ${s}px/${lh} Inter; letter-spacing: ${ls}em; word-spacing: ${ws}em`}>
        <div className="fp">
          <div className="fp-ctrl"><Range label="Weight" value={w} min={300} max={700} step={100} onChange={setW}/><Range label="Size" value={s} min={12} max={40} onChange={setS} unit="px"/><Range label="Line height" value={lh} min={1} max={2.2} step={0.05} onChange={setLh}/><Range label="Letter spacing" value={ls} min={-0.05} max={0.2} step={0.01} onChange={setLs} unit="em"/><Range label="Word spacing" value={ws} min={0} max={0.5} step={0.05} onChange={setWs} unit="em"/></div>
          <p style={{ fontWeight: w, fontSize: s, lineHeight: lh, letterSpacing: ls + 'em', wordSpacing: ws + 'em', margin: 0 }}>Typography is the craft of arranging type so that written language is legible, readable and appealing when displayed on a screen.</p>
        </div>
      </Frame>);
    },
    pairing: () => {
        const pairs = [['Contrast: serif + sans', "'Instrument Serif', serif", 400, 'var(--f-text)', 'Works: clear role contrast, compatible proportions.'], ['Single family', 'var(--f-display)', 800, 'var(--f-display)', 'Works: one family, hierarchy from weight and size.'], ['Too similar', 'Arial, Helvetica, sans-serif', 700, 'var(--f-text)', 'Weak: two near-identical sans-serifs look accidental.'], ['Two expressive faces', "'Caveat', cursive", 500, "'Roboto Slab', serif", 'Weak: both faces compete for attention.']];
        const [i, setI] = useState(0);
        const p = pairs[i];
        return (<Frame label="Font pairing" controls={<Seg label="Pair" options={pairs.map(x => x[0])} value={p[0]} onChange={v => setI(pairs.findIndex(x => x[0] === v))}/>} caption={p[4]}>
        <div className="pair"><h4 style={{ fontFamily: p[1], fontWeight: p[2] }}>The shape of good interfaces</h4><p style={{ fontFamily: p[3] }}>Body copy sets the reading rhythm. The heading face sets personality; the body face does the quiet, constant work of being read.</p></div>
      </Frame>);
    },
    'type-hierarchy': () => (<Frame label="Nine text roles" caption="Each role differs from its neighbours in at least two properties.">
      <div className="th">
        <div><span className="role">Overline</span><span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.1em', color: 'var(--blue)' }}>CASE STUDY · 2026</span></div>
        <div><span className="role">Display</span><span style={{ fontFamily: 'var(--f-display)', fontSize: 52, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>Ship calmer</span></div>
        <div><span className="role">Heading</span><span style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700 }}>Release checklist</span></div>
        <div><span className="role">Subheading</span><span style={{ fontSize: 18, color: 'var(--tx-2)' }}>Everything to verify before launch</span></div>
        <div><span className="role">Body</span><span style={{ fontSize: 16, lineHeight: 1.6 }}>Run the accessibility audit, confirm analytics and write release notes for support.</span></div>
        <div><span className="role">Label</span><span style={{ fontSize: 14, fontWeight: 600 }}>Release date</span></div>
        <div><span className="role">Helper text</span><span style={{ fontSize: 13, color: 'var(--tx-2)' }}>Use the date customers will see the change.</span></div>
        <div><span className="role">Caption</span><span style={{ fontSize: 13, color: 'var(--tx-3)', fontStyle: 'italic' }}>Fig. 2 — Release timeline for Q4.</span></div>
        <div><span className="role">Metadata</span><span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--tx-3)' }}>Updated 24 Nov · 4 min read</span></div>
      </div>
    </Frame>),
    'type-scale': () => {
        const [r, setR] = useState(1.25);
        const [vw, setVw] = useState('Desktop');
        const ratioUsed = vw === 'Mobile' ? Math.min(r, 1.2) : r;
        const names = ['caption', 'body', 'h4', 'h3', 'h2', 'h1', 'display'];
        return (<Frame label="Responsive type scale" controls={<><Seg label="Ratio" options={['1.2', '1.25', '1.333', '1.5']} value={String(r)} onChange={v => setR(+v)}/><Seg label="Viewport" options={['Mobile', 'Desktop']} value={vw} onChange={setVw}/></>} caption={`Base 16px. ${vw === 'Mobile' ? 'Mobile caps the ratio at 1.2 so headings fit.' : 'Desktop uses the full ratio.'}`}>
        <div className="tscale">{names.map((n, i) => { const px = Math.round(16 * ratioUsed ** (i - 1)); return <div key={n}><code>{n}</code><code>{px}px</code><span style={{ fontSize: Math.min(px, 80), fontFamily: i > 1 ? 'var(--f-display)' : 'var(--f-text)', fontWeight: i > 1 ? 700 : 400, letterSpacing: i > 3 ? '-.03em' : 0 }}>Interface</span></div>; })}</div>
      </Frame>);
    },
    measure: () => {
        const [w, setW] = useState(66);
        const [tr, setTr] = useState(false);
        const txt = 'Comfortable line length lets the eye return to the start of the next line without losing its place. Very long lines tire the reader; very short lines break phrases apart and make the text feel choppy.';
        return (<Frame label="Measure, wrapping & truncation" controls={<><Range label="Measure" value={w} min={25} max={110} onChange={setW} unit="ch"/><Seg label="Overflow" options={['Wrap', 'Truncate']} value={tr ? 'Truncate' : 'Wrap'} onChange={v => setTr(v === 'Truncate')}/></>} caption={w < 45 ? 'Too short: choppy.' : w > 80 ? 'Too long: hard to track back to the next line.' : 'Within the often-cited 45–75 character range.'}>
        <p className={'meas' + (tr ? ' trunc' : '')} style={{ maxWidth: w + 'ch' }} title={tr ? txt : undefined}>{txt}</p>
        <div className="truncs"><div><span className="label">Single-line ellipsis</span><span className="t1">Quarterly-financial-report-final-v3-approved.pdf</span></div><div><span className="label">No-wrap for units</span><span style={{ whiteSpace: 'nowrap' }}>Total: $1,240.00 USD</span></div></div>
      </Frame>);
    },
    numerals: () => (<Frame label="Numerals & case" caption="Tabular figures keep digits in fixed-width columns; proportional figures look better in running text.">
      <div className="nums">
        <div><span className="label">Proportional</span><pre style={{ fontVariantNumeric: 'proportional-nums', fontFamily: 'var(--f-text)' }}>{'1,111.11\n9,999.99\n  401.20'}</pre></div>
        <div><span className="label">Tabular</span><pre style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--f-text)' }}>{'1,111.11\n9,999.99\n  401.20'}</pre></div>
        <div className="cases"><span className="label">Case</span><span>Sentence case: Save changes</span><span>Title Case: Save Changes</span><span style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 13 }}>All caps: save changes</span></div>
      </div>
    </Frame>),
    legibility: () => (<Frame label="Legibility: telling characters apart" caption="Codes, passwords and IDs need fonts where I, l and 1 — and O and 0 — differ clearly.">
      <div className="leg">{[['Inter', 'var(--f-text)'], ['JetBrains Mono', 'var(--f-mono)'], ['Arial', 'Arial, sans-serif'], ['Georgia', 'Georgia, serif']].map(([n, f]) => <div key={n}><span className="label">{n}</span><span style={{ fontFamily: f }}>Il1 O0 rn m</span></div>)}</div>
    </Frame>),
    fallbacks: () => {
        const [f, setF] = useState('Web font loaded');
        return (<Frame label="Font stacks & multilingual text" controls={<Seg label="State" options={['Web font loaded', 'Fallback only', 'Missing glyphs']} value={f} onChange={setF}/>} caption="font-family: 'Schibsted Grotesk', 'Inter', system-ui, sans-serif — the stack always ends with a generic family.">
        <div className="fb" style={{ fontFamily: f === 'Fallback only' ? 'system-ui, sans-serif' : 'var(--f-display)' }}>
          <span>Größe · Café · Ångström</span>
          <span dir="rtl" lang="ar">مرحبا بالعالم</span>
          <span lang="ja">{f === 'Missing glyphs' ? '□□□□□' : 'こんにちは'}</span>
          <span lang="de" className="muted" style={{ fontSize: 14 }}>„Kontoeinstellungen speichern“ is ~40% longer than “Save account settings”.</span>
        </div>
      </Frame>);
    },
    /* Icons */
    'icon-styles': () => {
        const icons = ['home', 'bell', 'heart', 'star', 'folder', 'user'];
        const styles = [['Outline', { w: 1.75 }], ['Filled', { fill: true }], ['Duotone', { duo: true }], ['Rounded', { w: 2.5 }], ['Sharp', { sharp: true }], ['Thin', { w: 1 }]];
        return (<Frame label="One icon set, six styles" caption="Switch outline → filled to show selection, as many navigation bars do. Match stroke weight to surrounding text weight.">
        <div className="istyles">{styles.map(([n, o]) => <div key={n}><span className="label">{n}</span><div className={'irow' + (o.fill ? ' fill' : '') + (o.duo ? ' duo' : '') + (o.sharp ? ' sharp' : '')}>{icons.map(i => <Icon key={i} n={i} s={26} w={o.w || 1.75}/>)}</div></div>)}</div>
      </Frame>);
    },
    'icon-grid': () => (<Frame label="24 × 24 icon grid with keylines" caption="Bounding box 24, live area 20 (2px padding), keylines: circle Ø20, square 18, portrait 16×20, landscape 20×16. Stroke 2px, round caps and joins.">
      <div className="igrid">
        <svg viewBox="0 0 24 24" role="img" aria-label="Icon construction grid with a bell icon">
          {Array.from({ length: 25 }, (_, i) => <g key={i}><line x1={i} y1="0" x2={i} y2="24" stroke="#1E2430" strokeWidth=".05"/><line x1="0" y1={i} x2="24" y2={i} stroke="#1E2430" strokeWidth=".05"/></g>)}
          <rect x="2" y="2" width="20" height="20" fill="rgba(43,166,255,.06)" stroke="#2BA6FF" strokeWidth=".08" strokeDasharray=".4 .3"/>
          <circle cx="12" cy="12" r="10" fill="none" stroke="#F5B544" strokeWidth=".06"/><rect x="3" y="3" width="18" height="18" fill="none" stroke="#F5B544" strokeWidth=".06"/><rect x="4" y="2" width="16" height="20" fill="none" stroke="#3DD68C" strokeWidth=".06"/><rect x="2" y="4" width="20" height="16" fill="none" stroke="#3DD68C" strokeWidth=".06"/>
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8m4 12a2 2 0 0 0 4 0" fill="none" stroke="#F9FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9"/>
        </svg>
        <ul className="ilegend"><li><i style={{ background: '#2BA6FF' }}/>Live area (20×20)</li><li><i style={{ background: '#F5B544' }}/>Circle & square keylines</li><li><i style={{ background: '#3DD68C' }}/>Portrait & landscape keylines</li><li><i style={{ background: '#F9FAFC' }}/>2px stroke, round cap & join</li></ul>
      </div>
    </Frame>),
    'icon-categories': () => (<Frame label="Symbol families">
      <div className="icats">{[['Action', ['plus', 'edit', 'trash', 'share', 'download']], ['Navigation', ['home', 'menu', 'chevL', 'x', 'ext']], ['Communication', ['mail', 'chat', 'phone', 'bell']], ['Status', ['ok', 'warn', 'err', 'info']], ['Security', ['lock', 'shield', 'eye']], ['Finance', ['card', 'wallet']], ['Media', ['play', 'pause', 'volume', 'cc', 'full']], ['Social', ['heart', 'star', 'bookmark']], ['Abstract', ['sparkle', 'layers', 'tool']]].map(([k, is]) => <div key={k}><span className="label">{k}</span><div>{is.map((i) => <Icon key={i} n={i} s={22}/>)}</div></div>)}</div>
    </Frame>),
    'icon-usage': () => (<Frame label="Icon-only vs icon + label" caption="Familiar actions survive icon-only treatment; abstract ones need labels. Hover or focus the icon-only buttons to see their tooltips.">
      <GoodBad bad={<div className="iu">{['sparkle', 'layers', 'tool', 'path'].map(i => <button key={i} className="icon-btn" title="What does this do?" aria-label="Unlabelled action (example)"><Icon n={i} s={20}/></button>)}</div>} good={<div className="iu col">{[['sparkle', 'Insights'], ['layers', 'Workspaces'], ['tool', 'Integrations'], ['path', 'Automations']].map(([i, l]) => <button key={i} className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }}><Icon n={i}/>{l}</button>)}<div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{[['search', 'Search'], ['x', 'Close'], ['more', 'More actions']].map(([i, l]) => <button key={i} className="icon-btn tipped" aria-label={l} data-tip={l}><Icon n={i} s={18}/></button>)}</div></div>} badNote="Abstract icons with no labels: people must guess." goodNote="Labels for abstract concepts; icon-only only for universal actions, with names and tooltips."/>
    </Frame>),
    'icon-ambiguity': () => (<Frame label="One symbol, many meanings" caption="Test icon recognition with your audience; when meanings compete, add a label.">
      <div className="amb">{[['heart', ['Like', 'Favourite', 'Save', 'Health']], ['star', ['Rate', 'Favourite', 'Featured', 'Premium']], ['bookmark', ['Save', 'Read later', 'Tag']], ['gear', ['Settings', 'Preferences', 'Admin', 'Tools']], ['eye', ['Show password', 'Preview', 'Watch', 'Views']]].map(([i, ms]) => <div key={i}><Icon n={i} s={30}/><span>{ms.join(' · ')}</span></div>)}</div>
    </Frame>),
});
