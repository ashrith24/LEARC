import { useState } from 'react';
import { register } from './registry';
import { Frame, Seg, Range, GoodBad, Ann } from './kit';
/** Mini screen used across foundation demos. */
const Line = ({ w, h = 8, c = 'var(--bd-strong)', mb = 8 }) => <div style={{ width: w, height: h, background: c, borderRadius: 3, marginBottom: mb }}/>;
register({
    'ui-layers': () => {
        const [l, setL] = useState('Component');
        const on = (k) => l === k;
        return (<Frame label="Interface → screen → layout → pattern → component" controls={<Seg label="Highlight level" options={['Interface', 'Screen', 'Layout', 'Pattern', 'Component']} value={l} onChange={setL}/>} caption="Select a level to see which part of the product it refers to.">
        <div className={'uil' + (on('Interface') ? ' hl' : '')}>
          {[0, 1].map(s => (<div key={s} className={'uil-screen' + (on('Screen') && s === 0 ? ' hl' : '')}>
              <div className={'uil-layout' + (on('Layout') && s === 0 ? ' hl' : '')}>
                <div className="uil-nav"/>
                <div className="uil-main">
                  <div className={'uil-pattern' + (on('Pattern') && s === 0 ? ' hl' : '')}>
                    <Line w="60%" h={10} c="var(--tx-2)"/>
                    <div className="uil-field"/><div className="uil-field"/>
                    <div className={'uil-btn' + (on('Component') && s === 0 ? ' hl' : '')}>Sign in</div>
                  </div>
                </div>
              </div>
            </div>))}
        </div>
        <p className="uil-cap"><b>{l}:</b> {{ Interface: 'everything a person perceives and operates across the product — both screens here.', Screen: 'one view shown at a time.', Layout: 'the arrangement of regions within the screen (navigation + main).', Pattern: 'a recurring solution — this sign-in form.', Component: 'a reusable building block — this button.' }[l]}</p>
      </Frame>);
    },
    hierarchy: () => {
        const [m, setM] = useState('Hierarchy');
        const h = m === 'Hierarchy';
        return (<Frame label="Same content, two hierarchies" controls={<Seg label="Version" options={['Flat', 'Hierarchy']} value={m} onChange={setM}/>} caption="Squint at each version. In the flat version nothing wins; in the hierarchical version the eye lands on the title, then the price, then the action.">
        <div className={'hier ' + (h ? 'on' : 'off')}>
          <span className="h-over">Annual plan</span>
          <span className="h-title">Pro workspace</span>
          <span className="h-price">$96 <small>/ year</small></span>
          <span className="h-body">Unlimited projects, version history and priority support for small teams.</span>
          <span className="h-actions"><span className="h-btn">Start free trial</span><span className="h-link">Compare plans</span></span>
          {h && <><Ann style={{ top: 34, right: 10 }}>1 · focal point</Ann><Ann style={{ top: 90, right: 10 }}>2 · supporting</Ann><Ann style={{ bottom: 22, right: 10 }}>3 · action</Ann></>}
        </div>
      </Frame>);
    },
    'contrast-principle': () => (<Frame label="Kinds of contrast" caption="Each pair differs in one property only. Value (light/dark) contrast is the strongest and survives greyscale.">
      <div className="cgrid">
        {[['Value', <><i style={{ background: '#F9FAFC' }}/><i style={{ background: '#323B4B' }}/></>], ['Hue', <><i style={{ background: '#2BA6FF' }}/><i style={{ background: '#F5B544' }}/></>], ['Size', <><i style={{ width: 54, height: 54 }}/><i style={{ width: 18, height: 18 }}/></>], ['Weight', <><b style={{ fontWeight: 800, fontSize: 30 }}>Aa</b><b style={{ fontWeight: 300, fontSize: 30 }}>Aa</b></>], ['Shape', <><i style={{ borderRadius: '50%' }}/><i style={{ borderRadius: 0, transform: 'rotate(45deg) scale(.8)' }}/></>], ['Space', <><span className="dense">{Array.from({ length: 9 }, (_, i) => <i key={i}/>)}</span><span className="airy"><i /></span></>]].map(([k, v]) => <div key={k} className="cg"><div className="cg-v">{v}</div><span className="label">{k}</span></div>)}
      </div>
    </Frame>),
    balance: () => {
        const [m, setM] = useState('Asymmetrical');
        return (<Frame label="Distributing visual weight" controls={<Seg label="Balance" options={['Symmetrical', 'Asymmetrical', 'Unbalanced']} value={m} onChange={setM}/>} caption={m === 'Unbalanced' ? 'All weight sits on the left; the composition appears to tip.' : m === 'Symmetrical' ? 'Mirrored around the centre axis — calm and formal.' : 'One heavy block balanced by several lighter elements and space — dynamic but stable.'}>
        <div className={'bal ' + m.toLowerCase()}>
          <div className="axis"/>
          <div className="b1"/><div className="b2"/><div className="b3"/><div className="b4"/>
          <div className="fulcrum"/>
        </div>
      </Frame>);
    },
    alignment: () => {
        const [on, setOn] = useState(true);
        return (<Frame label="Shared edges" controls={<Seg label="Alignment" options={['Misaligned', 'Aligned']} value={on ? 'Aligned' : 'Misaligned'} onChange={v => setOn(v === 'Aligned')}/>} caption="Aligned: every element touches one invisible start edge (shown in blue). Misaligned: four slightly different edges.">
        <div className={'align ' + (on ? 'on' : 'off')}>
          {on && <div className="guide"/>}
          <div className="a-av"/><Line w="55%" h={14} c="var(--tx-1)"/><Line w="80%"/><Line w="70%"/>
          <div className="a-row"><span className="a-b"/><span className="a-b ghost"/></div>
        </div>
      </Frame>);
    },
    proximity: () => {
        const [ok, setOk] = useState(true);
        const F = ({ l }) => <div className="px-f"><span>{l}</span><i /></div>;
        return (<Frame label="Label-to-field spacing" controls={<Seg label="Spacing" options={['Equal spacing', 'Grouped']} value={ok ? 'Grouped' : 'Equal spacing'} onChange={v => setOk(v === 'Grouped')}/>} caption={ok ? 'Labels sit 6px from their own field and 24px from the previous one — each pair reads as a unit.' : 'Labels are equidistant between fields — which label belongs to which field is ambiguous.'}>
        <div className={'px ' + (ok ? 'ok' : 'bad')}><F l="First name"/><F l="Last name"/><F l="Email"/></div>
      </Frame>);
    },
    consistency: () => (<Frame label="Same meaning, same look" caption="One button style per role, used everywhere, lets people learn the interface once.">
      <GoodBad bad={<div className="cons">{['#2BA6FF', '#3DD68C', '#F5B544'].map((c, i) => <span key={c} style={{ background: c, borderRadius: [4, 20, 0][i], padding: ['8px 12px', '6px 20px', '10px 10px'][i], color: '#08111c', fontWeight: [700, 500, 800][i] }}>{['Save', 'Submit', 'Send'][i]}</span>)}</div>} good={<div className="cons">{['Save', 'Submit', 'Send'].map(t => <span key={t} className="cons-b">{t}</span>)}</div>} badNote="Three primary actions, three styles — people wonder whether they behave differently." goodNote="One primary style; the label carries the difference."/>
    </Frame>),
    scale: () => {
        const [r, setR] = useState(1.25);
        const steps = [-1, 0, 1, 2, 3, 4].map(n => +(16 * r ** n).toFixed(1));
        return (<Frame label="Modular scale" controls={<Seg label="Ratio" options={['1.125', '1.25', '1.333', '1.5', '1.618']} value={String(r)} onChange={v => setR(+v)}/>} caption={`Base 16px × ${r}ⁿ. Larger ratios create more dramatic contrast between levels.`}>
        <div className="scale">{steps.map((s, i) => <div key={i} className="sc-row"><span className="mono">{s}px</span><span style={{ fontSize: Math.min(s, 72), fontFamily: 'var(--f-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-.02em' }}>Scale</span></div>)}</div>
      </Frame>);
    },
    rhythm: () => {
        const [m, setM] = useState('Alternating');
        return (<Frame label="Rhythm" controls={<Seg label="Rhythm type" options={['Regular', 'Alternating', 'Progressive']} value={m} onChange={setM}/>} caption="Repeated intervals make long pages predictable; the pattern sets the tempo.">
        <div className={'rhy ' + m.toLowerCase()}>{[0, 1, 2, 3].map(i => <div key={i} className="rh" style={m === 'Progressive' ? { marginBottom: 6 + i * 10, opacity: 1 - i * .15 } : undefined}><i /><span><Line w="70%" h={10} c="var(--tx-2)"/><Line w="90%"/><Line w="50%" mb={0}/></span></div>)}</div>
      </Frame>);
    },
    whitespace: () => {
        const [d, setD] = useState(16);
        return (<Frame label="Density" controls={<Range label="Spacing" value={d} min={2} max={32} onChange={setD} unit="px"/>} caption={d < 8 ? 'Compact: more fits, but groups blur together.' : d > 22 ? 'Spacious: calm and focused, but more scrolling.' : 'Comfortable: a balance for most product UI.'}>
        <div className="ws" style={{ gap: d, padding: d }}>
          {['Inbox', 'Starred', 'Drafts', 'Sent'].map((t, i) => <div key={t} className="ws-row" style={{ padding: `${Math.max(4, d / 2)}px ${d / 2 + 6}px` }}><i /><b>{t}</b><span>{[12, 3, 1, 48][i]}</span></div>)}
        </div>
      </Frame>);
    },
    'visual-weight': () => (<Frame label="What pulls the eye" caption="Each tile's right element has more visual weight than its left one. On dark backgrounds, brightness and saturation add the most weight.">
      <div className="vw">{[['Size', [14, 44]], ['Brightness', ['#323B4B', '#F9FAFC']], ['Saturation', ['#5A6678', '#2BA6FF']], ['Complexity', ['plain', 'pattern']], ['Isolation', ['crowd', 'alone']]].map(([k, v]) => (<div key={k} className="vw-t"><div className="vw-s">
          {k === 'Size' && <><i style={{ width: v[0], height: v[0] }}/><i style={{ width: v[1], height: v[1] }}/></>}
          {(k === 'Brightness' || k === 'Saturation') && <><i style={{ background: v[0] }}/><i style={{ background: v[1] }}/></>}
          {k === 'Complexity' && <><i /><i className="pat"/></>}
          {k === 'Isolation' && <><span className="crowd">{Array.from({ length: 6 }, (_, j) => <i key={j}/>)}</span><i /></>}
        </div><span className="label">{k}</span></div>))}</div>
    </Frame>),
    gestalt: () => {
        const items = [
            ['Proximity', <svg viewBox="0 0 120 70"><g fill="#7FBCF6">{[0, 1, 2].map(i => [0, 1].map(j => <circle key={i + '' + j} cx={10 + i * 14} cy={22 + j * 14} r="5"/>))}{[0, 1, 2].map(i => [0, 1].map(j => <circle key={'b' + i + j} cx={74 + i * 14} cy={22 + j * 14} r="5"/>))}</g></svg>],
            ['Similarity', <svg viewBox="0 0 120 70">{[0, 1, 2, 3, 4, 5].map(i => [0, 1, 2].map(j => i % 2 ? <rect key={i + '' + j} x={8 + i * 18} y={10 + j * 18} width="10" height="10" fill="#2BA6FF"/> : <circle key={i + '' + j} cx={13 + i * 18} cy={15 + j * 18} r="5" fill="#5A6678"/>))}</svg>],
            ['Continuity', <svg viewBox="0 0 120 70"><path d="M5 60 C40 0 80 0 115 60" fill="none" stroke="#2BA6FF" strokeWidth="3"/><path d="M5 10 C40 70 80 70 115 10" fill="none" stroke="#5A6678" strokeWidth="3"/></svg>],
            ['Closure', <svg viewBox="0 0 120 70"><g fill="none" stroke="#7FBCF6" strokeWidth="4"><path d="M35 12 A23 23 0 0 1 82 20"/><path d="M86 38 A23 23 0 0 1 60 58"/><path d="M48 57 A23 23 0 0 1 37 22"/></g></svg>],
            ['Figure–ground', <svg viewBox="0 0 120 70"><rect width="120" height="70" fill="#1E2430"/><rect x="30" y="12" width="60" height="46" rx="6" fill="#F9FAFC"/><rect x="40" y="22" width="30" height="5" rx="2" fill="#1E2430"/></svg>],
            ['Common region', <svg viewBox="0 0 120 70"><rect x="4" y="8" width="54" height="54" rx="8" fill="none" stroke="#2BA6FF"/>{[0, 1, 2, 3, 4, 5].map(i => <circle key={i} cx={16 + i * 18} cy="35" r="5" fill="#7FBCF6"/>)}</svg>],
            ['Connectedness', <svg viewBox="0 0 120 70"><line x1="16" y1="35" x2="52" y2="35" stroke="#2BA6FF" strokeWidth="2"/>{[0, 1, 2, 3, 4, 5].map(i => <circle key={i} cx={16 + i * 18} cy="35" r="5" fill="#7FBCF6"/>)}</svg>],
        ];
        return (<Frame label="Seven Gestalt principles in UI" caption="Each panel shows the principle with dots and lines — the same mechanics cards, lists, steppers and modals rely on.">
        <div className="gest">{items.map(([k, s]) => <div key={k}><div className="g-s">{s}</div><b>{k}</b></div>)}</div>
      </Frame>);
    },
    affordance: () => (<Frame label="Signifiers before hover" caption="Left: a flat label and a clickable element look identical. Right: shape, underline, cursor and chevron signal what can be done.">
      <GoodBad bad={<div className="aff"><span>Download report</span><span>Settings</span><span>Annual plan</span></div>} good={<div className="aff good"><span className="aff-btn">Download report</span><a href="#home" onClick={e => e.preventDefault()}>Settings</a><span className="aff-static">Annual plan</span><span className="aff-drag" aria-hidden="true">⋮⋮ Drag to reorder</span></div>} badNote="Mystery meat: nothing reveals which item is interactive until hover — and touch has no hover." goodNote="Button shape, link underline and drag handle are visible at rest; static text stays plain."/>
    </Frame>),
    mistakes: () => {
        const [i, setI] = useState(0);
        const cases = [
            { k: 'Everything emphasised', bad: <div className="mk"><b style={{ color: '#FF6B6B', fontSize: 20 }}>SALE!</b><b style={{ color: '#2BA6FF', fontSize: 20 }}>NEW!</b><b style={{ color: '#F5B544', fontSize: 20 }}>HOT!</b><span className="mk-b">BUY</span></div>, good: <div className="mk"><span className="label">New</span><b style={{ fontSize: 22 }}>Winter collection</b><span className="muted">20% off until Friday</span><span className="mk-b">Shop now</span></div>, fix: 'One focal point and three levels.' },
            { k: 'Low-contrast text', bad: <div className="mk"><p style={{ color: '#3a4150', margin: 0 }}>Your password must contain 12 characters.</p></div>, good: <div className="mk"><p style={{ color: '#B8C0CC', margin: 0 }}>Your password must contain 12 characters.</p></div>, fix: 'Meet 4.5:1 for body text (WCAG 2.2 SC 1.4.3).' },
            { k: 'Equal spacing', bad: <div className="mk" style={{ gap: 14 }}><b>Account</b><span>Email</span><b>Billing</b><span>Card</span></div>, good: <div className="mk" style={{ gap: 4 }}><b>Account</b><span>Email</span><b style={{ marginTop: 18 }}>Billing</b><span>Card</span></div>, fix: 'Tighter inside groups, looser between them.' },
            { k: 'Color-only meaning', bad: <div className="mk"><span style={{ color: '#3DD68C' }}>● Payments</span><span style={{ color: '#FF6B6B' }}>● Webhooks</span></div>, good: <div className="mk"><span style={{ color: '#8BEBBE' }}>✓ Payments — operational</span><span style={{ color: '#FFA3A3' }}>✕ Webhooks — failing</span></div>, fix: 'Add text and shape to every color-coded status.' },
        ];
        const c = cases[i];
        return (<Frame label="Common mistakes" controls={<Seg label="Mistake" options={cases.map(x => x.k)} value={c.k} onChange={v => setI(cases.findIndex(x => x.k === v))}/>} caption={<><b>Fix:</b> {c.fix}</>}>
        <GoodBad bad={c.bad} good={c.good} badNote={c.k} goodNote={c.fix}/>
      </Frame>);
    },
});
