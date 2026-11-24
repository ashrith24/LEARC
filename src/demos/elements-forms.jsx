import { useEffect, useMemo, useRef, useState } from 'react';
import { register } from './registry';
import { Frame, Seg, GoodBad } from './kit';
import { Icon } from '../components/Icon';
const STATES = ['Default', 'Hover', 'Focus', 'Pressed', 'Loading', 'Disabled'];
function UButton({ v = 'primary', st = 'Default', icon, children, size = 'md' }) {
    return (<button type="button" className={`ub ${v} s-${st.toLowerCase()} z-${size}`} aria-disabled={st === 'Disabled' || undefined} aria-busy={st === 'Loading' || undefined} tabIndex={-1}>
      {st === 'Loading' ? <span className="spin" aria-hidden="true"/> : icon ? <Icon n={icon}/> : null}{children}
    </button>);
}
register({
    buttons: () => {
        const [st, setSt] = useState('Default');
        return (<Frame label="Button variants × states" controls={<Seg label="State" options={STATES} value={st} onChange={setSt}/>} caption="Every variant must define every state. Focus uses a 2px ring offset from the button; disabled lowers contrast and removes pointer feedback.">
        <div className="btn-anat">
          <div className="ba-spec"><UButton st={st === 'Default' ? 'Focus' : st} icon="download">Download</UButton>
            <span className="call c1">Container</span><span className="call c2">Leading icon</span><span className="call c3">Label (verb)</span><span className="call c4">Focus ring</span></div>
        </div>
        <div className="bgrid">
          {[['primary', 'Primary'], ['secondary', 'Secondary'], ['tertiary', 'Tertiary'], ['outline', 'Outline'], ['ghost', 'Ghost'], ['link', 'Text / link'], ['danger', 'Destructive']].map(([v, l]) => <div key={v}><span className="label">{l}</span><UButton v={v} st={st}>{v === 'danger' ? 'Delete' : 'Continue'}</UButton></div>)}
          <div><span className="label">Icon</span><UButton v="icon" st={st} icon="share"/></div>
          <div><span className="label">Split</span><span className="split-btn"><UButton st={st}>Merge</UButton><UButton st={st} icon="chevD"/></span></div>
          <div><span className="label">Toggle</span><UButton v="toggle on" st={st} icon="bookmark">Saved</UButton></div>
          <div><span className="label">Group</span><span className="bgroup"><UButton v="secondary" st={st}>Day</UButton><UButton v="secondary on" st={st}>Week</UButton><UButton v="secondary" st={st}>Month</UButton></span></div>
          <div><span className="label">FAB</span><UButton v="fab" st={st} icon="plus"/></div>
        </div>
        <div className="sizes"><span className="label">Sizes</span><UButton size="sm">Small</UButton><UButton>Medium</UButton><UButton size="lg">Large</UButton><div style={{ flexBasis: '100%' }}/><span className="label">Full-width</span><UButton size="full">Continue to payment</UButton></div>
      </Frame>);
    },
    links: () => (<Frame label="Link types & states" caption="Inline links keep an underline so they are distinguishable without color (WCAG 2.2 SC 1.4.1).">
      <div className="lnk">
        <p>Read the <a href="#t-buttons">button guidelines</a> before choosing a variant, or check the <a href="#t-buttons" className="visited">visited link style</a>.</p>
        <div className="lnk-row"><a href="#t-links" onClick={e => e.preventDefault()} className="standalone">View all orders <Icon n="arrow"/></a><a href="https://www.w3.org/WAI/ARIA/apg/patterns/link/" target="_blank" rel="noopener noreferrer">APG link pattern <Icon n="ext" s={13}/></a><span className="fake-hover">Hover state</span><span className="fake-focus">Focus state</span><span className="disabled-l" aria-disabled="true">Disabled presentation</span></div>
        <nav className="lnk-nav" aria-label="Example navigation"><a href="#t-links" onClick={e => e.preventDefault()} aria-current="page">Overview</a><a href="#t-links" onClick={e => e.preventDefault()}>Usage</a><a href="#t-links" onClick={e => e.preventDefault()}>Accessibility</a></nav>
      </div>
    </Frame>),
    'icon-buttons': () => (<Frame label="Small controls" caption="The visible glyph can be 16–20px while the target stays at least 24×24 CSS px (WCAG 2.2 AA) — here 40×40. Dashed outlines show target areas.">
      <div className="smallc">
        {[['x', 'Close'], ['more', 'More actions'], ['drag', 'Drag handle'], ['chevD', 'Expand'], ['heart', 'Like']].map(([i, l]) => <div key={i}><button className="icon-btn target" aria-label={l}><Icon n={i} s={18}/></button><span>{l}</span></div>)}
        <div className="dragrow"><span className="h"><Icon n="drag"/></span><span>Reorderable item</span><button className="btn btn-sm btn-ghost" aria-label="Move up">↑</button><button className="btn btn-sm btn-ghost" aria-label="Move down">↓</button></div>
      </div>
    </Frame>),
    labels: () => (<Frame label="Label, hint, placeholder" caption="The label stays visible while typing; the hint explains format; the placeholder only shows an example.">
      <GoodBad bad={<div className="lab"><input className="ui-in" placeholder="Date of birth" aria-label="Date of birth (example of placeholder-only label)"/></div>} good={<div className="lab"><label htmlFor="dob-ex">Date of birth</label><span className="hint" id="dob-h">For example, 27 3 2007</span><input id="dob-ex" className="ui-in" aria-describedby="dob-h" placeholder="DD MM YYYY"/><span className="opt">Optional fields say “(optional)”</span></div>} badNote="Placeholder as label: it disappears on typing and often has low contrast." goodNote="Persistent label, hint linked by aria-describedby, example placeholder."/>
    </Frame>),
    badges: () => {
        const [chips, setChips] = useState(['Design', 'Research']);
        const [f, setF] = useState(['Open']);
        return (<Frame label="Badge · tag · chip" caption="Badges annotate; tags label (read-only); chips are interactive — filter chips toggle, input chips can be removed.">
        <div className="btc">
          <div><span className="label">Badges</span><div className="row"><span className="bwrap"><Icon n="bell" s={22}/><i className="badge-n" aria-label="3 unread">3</i></span><span className="bwrap"><Icon n="chat" s={22}/><i className="badge-d" aria-label="New messages"/></span><span className="badge-new">New</span><span className="counter">Inbox <b>12</b></span></div></div>
          <div><span className="label">Tags (status)</span><div className="row"><span className="tag ok">✓ Completed</span><span className="tag warn">! Due soon</span><span className="tag err">✕ Overdue</span><span className="tag">Draft</span></div></div>
          <div><span className="label">Filter chips</span><div className="row">{['Open', 'Assigned to me', 'High priority'].map(x => <button key={x} className={'fchip' + (f.includes(x) ? ' on' : '')} aria-pressed={f.includes(x)} onClick={() => setF(v => v.includes(x) ? v.filter(y => y !== x) : [...v, x])}>{f.includes(x) && <Icon n="check" s={14}/>}{x}</button>)}</div></div>
          <div><span className="label">Input chips</span><div className="row">{chips.map(c => <span key={c} className="ichip">{c}<button aria-label={'Remove ' + c} onClick={() => setChips(v => v.filter(y => y !== c))}><Icon n="x" s={12}/></button></span>)}{chips.length < 2 && <button className="btn btn-sm btn-ghost" onClick={() => setChips(['Design', 'Research'])}>Reset</button>}</div></div>
        </div>
      </Frame>);
    },
    status: () => (<Frame label="Status with color + shape + text">
      <div className="stat">{[['ok', 'Operational', '●'], ['warn', 'Degraded', '▲'], ['err', 'Outage', '■'], ['off', 'Offline', '○']].map(([k, t, s]) => <div key={k} className={k}><i>{s}</i><span>{t}</span></div>)}
        <div className="pres">{[['ok', 'Online'], ['warn', 'Away'], ['err', 'Busy'], ['off', 'Offline']].map(([k, t]) => <span key={k}><span className="av">AK<i className={k}/></span>{t}</span>)}</div>
      </div>
    </Frame>),
    kbd: () => (<Frame label="Keyboard-shortcut labels">
      <div className="kbdx">{[['Search', ['⌘', 'K']], ['Command palette', ['Ctrl', 'Shift', 'P']], ['Go to inbox', ['G', 'then', 'I']], ['Close', ['Esc']], ['Help', ['?']]].map(([a, ks]) => <div key={a}><span>{a}</span><span>{ks.map((k, i) => k === 'then' ? <small key={i}> then </small> : <kbd key={i}>{k}</kbd>)}</span></div>)}</div>
    </Frame>),
    avatars: () => (<Frame label="Avatars" caption="Initials avatars use generated colors with sufficient contrast; groups end in a +N overflow.">
      <div className="avs">
        {['xs', 'sm', 'md', 'lg'].map((s, i) => <span key={s} className={'av ' + s} style={{ background: ['#14448C', '#8E4EC6', '#30A46C', '#A07553'][i] }}>{['MO', 'JL', 'SK', 'RP'][i]}</span>)}
        <span className="av md org">AC</span><span className="av md"><Icon n="user"/></span>
        <span className="avg">{['#14448C', '#8E4EC6', '#30A46C', '#A07553'].map((c, i) => <span key={c} className="av sm" style={{ background: c }}>{['MO', 'JL', 'SK', 'RP'][i]}</span>)}<span className="av sm more">+5</span></span>
      </div>
    </Frame>),
    markers: () => (<Frame label="Markers & separators">
      <div className="mkr"><ul><li>Bullets for unordered items</li><li>No implied sequence</li></ul><ol><li>Numbers imply order</li><li>Use for steps or rankings</li></ol><div className="steps-m">{[1, 2, 3].map(n => <span key={n}><i>{n}</i>{n < 3 && <b />}</span>)}</div><p className="mono" style={{ color: 'var(--tx-3)' }}>5 min read · Updated today · 3 comments</p></div>
    </Frame>),
    rating: () => (<Frame label="Rating display">
      <div className="rate">{[4.6, 3.5, 2].map(v => <div key={v} role="img" aria-label={`Rated ${v} out of 5`}><span className="stars" style={{ ['--v']: v }}>★★★★★</span><b>{v}</b><small>({[1203, 88, 14][[4.6, 3.5, 2].indexOf(v)]} reviews)</small></div>)}</div>
    </Frame>),
    states: () => (<Frame label="State gallery" caption="The same component in every state, side by side. Hover is a hint; focus is a requirement.">
      <div className="stg">{['Default', 'Hover', 'Focus', 'Pressed', 'Loading', 'Disabled'].map(s => <div key={s}><UButton st={s}>Save</UButton><span>{s}</span></div>)}
        {[['Selected', <button className="fchip on" tabIndex={-1}><Icon n="check" s={14}/>Selected</button>], ['Expanded', <button className="btn btn-sm" tabIndex={-1}>Filters <Icon n="chevD" className="rot"/></button>], ['Error', <input className="ui-in err" defaultValue="name@" aria-label="Error state example"/>], ['Read-only', <input className="ui-in" readOnly defaultValue="INV-2041" aria-label="Read-only example"/>]].map(([k, el]) => <div key={k}>{el}<span>{k}</span></div>)}
      </div>
    </Frame>),
    /* Forms */
    'text-inputs': () => {
        const [show, setShow] = useState(false);
        const [msg, setMsg] = useState('');
        return (<Frame label="Input types (all functional)" caption="Each field uses the matching type, inputmode and autocomplete. On phones these change the keyboard.">
        <div className="tin">
          <label>Full name<input className="ui-in" autoComplete="name"/></label>
          <label>Email address<input className="ui-in" type="email" autoComplete="email" inputMode="email"/></label>
          <label>Password<span className="in-wrap"><input className="ui-in" type={show ? 'text' : 'password'} autoComplete="new-password"/><button type="button" className="in-act" onClick={() => setShow(v => !v)} aria-pressed={show}>{show ? 'Hide' : 'Show'}</button></span></label>
          <label>Quantity<input className="ui-in" type="number" min={1} defaultValue={1}/></label>
          <label>Search<span className="in-wrap"><Icon n="search" className="in-ic"/><input className="ui-in pl" type="search" placeholder="e.g. invoices"/></span></label>
          <label>Phone<input className="ui-in" type="tel" autoComplete="tel" inputMode="tel"/></label>
          <label>Website<span className="in-wrap"><span className="prefix">https://</span><input className="ui-in pre" type="url" inputMode="url"/></span></label>
          <label>Card number (masked)<input className="ui-in" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" onChange={e => { const d = e.target.value.replace(/\D/g, '').slice(0, 16); e.target.value = d.replace(/(.{4})/g, '$1 ').trim(); }}/></label>
          <label className="full">Message<textarea className="ui-in" rows={3} maxLength={200} value={msg} onChange={e => setMsg(e.target.value)}/><span className="hint" aria-live="polite">{200 - msg.length} characters remaining</span></label>
        </div>
      </Frame>);
    },
    otp: () => {
        const [v, setV] = useState(['', '', '', '', '', '']);
        const refs = useRef([]);
        const set = (i, ch) => { const d = ch.replace(/\D/g, ''); if (d.length > 1) {
            const arr = d.slice(0, 6).split('');
            setV([...arr, ...Array(6 - arr.length).fill('')]);
            refs.current[Math.min(arr.length, 5)]?.focus();
            return;
        } const n = [...v]; n[i] = d; setV(n); if (d && i < 5)
            refs.current[i + 1]?.focus(); };
        const done = v.every(Boolean);
        return (<Frame label="Segmented OTP input with paste support" caption="Paste a 6-digit code into any box. Backspace moves back. Shown alongside the more robust single-field alternative.">
        <div className="otp">
          <fieldset><legend>Enter the 6-digit code</legend><div className="otp-boxes">{v.map((c, i) => <input key={i} ref={el => { if (el)
            refs.current[i] = el; }} value={c} inputMode="numeric" autoComplete={i === 0 ? 'one-time-code' : 'off'} maxLength={6} aria-label={`Digit ${i + 1} of 6`} onChange={e => set(i, e.target.value)} onKeyDown={e => { if (e.key === 'Backspace' && !v[i] && i)
            refs.current[i - 1]?.focus(); }} className={done ? 'ok' : ''}/>)}</div></fieldset>
          <p aria-live="polite" className="hint">{done ? '✓ Code complete' : `${v.filter(Boolean).length} of 6 digits`}</p>
          <label>Alternative: single field<input className="ui-in otp-single" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="••••••"/></label>
        </div>
      </Frame>);
    },
    choice: () => {
        const [cb, setCb] = useState([true, false, false]);
        const [r, setR] = useState('Standard');
        const [sw, setSw] = useState(true);
        const all = cb.every(Boolean), some = cb.some(Boolean) && !all;
        return (<Frame label="Checkbox · radio · switch" caption="Checkboxes and radios wait for a submit; the switch applies immediately (shown by the live status).">
        <div className="choice">
          <fieldset><legend>Notify me about</legend>
            <label className="ck"><input type="checkbox" checked={all} ref={el => { if (el)
            el.indeterminate = some; }} onChange={() => setCb(cb.map(() => !all))}/><span>All activity {some && <small>(indeterminate)</small>}</span></label>
            {['Comments', 'Mentions', 'Assignments'].map((l, i) => <label key={l} className="ck nested"><input type="checkbox" checked={cb[i]} onChange={() => setCb(cb.map((x, j) => j === i ? !x : x))}/><span>{l}</span></label>)}
          </fieldset>
          <fieldset><legend>Delivery speed</legend>{['Standard', 'Express', 'Next day'].map(l => <label key={l} className="rd"><input type="radio" name="spd" checked={r === l} onChange={() => setR(l)}/><span>{l}</span></label>)}</fieldset>
          <fieldset><legend>Settings</legend><label className="sw"><span>Dark mode</span><button type="button" role="switch" aria-checked={sw} onClick={() => setSw(v => !v)}><i /></button><small aria-live="polite">{sw ? 'On' : 'Off'} — applied</small></label></fieldset>
        </div>
      </Frame>);
    },
    segmented: () => {
        const [v, setV] = useState('Week');
        const [fmt, setFmt] = useState(['B']);
        return (<Frame label="Segmented control & toggle group">
        <div className="segd">
          <div><span className="label">Single-select (view)</span><div className="segc" role="radiogroup" aria-label="Calendar view">{['Day', 'Week', 'Month'].map(x => <button key={x} role="radio" aria-checked={v === x} onClick={() => setV(x)}>{x}</button>)}</div><p className="muted" style={{ fontSize: 13 }}>Showing: {v} view</p></div>
          <div><span className="label">Multi-select (toggle group)</span><div className="segc" role="toolbar" aria-label="Formatting">{['B', 'I', 'U'].map(x => <button key={x} aria-pressed={fmt.includes(x)} onClick={() => setFmt(f => f.includes(x) ? f.filter(y => y !== x) : [...f, x])} style={{ fontWeight: x === 'B' ? 800 : 400, fontStyle: x === 'I' ? 'italic' : 'normal', textDecoration: x === 'U' ? 'underline' : 'none', minWidth: 44 }} aria-label={{ B: 'Bold', I: 'Italic', U: 'Underline' }[x]}>{x}</button>)}</div><p style={{ fontWeight: fmt.includes('B') ? 800 : 400, fontStyle: fmt.includes('I') ? 'italic' : 'normal', textDecoration: fmt.includes('U') ? 'underline' : 'none' }}>Preview text</p></div>
        </div>
      </Frame>);
    },
    combobox: () => {
        const all = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'India', 'Indonesia', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Portugal', 'Singapore', 'South Africa', 'Spain', 'Sweden', 'United Kingdom', 'United States'];
        const [q, setQ] = useState('');
        const [open, setOpen] = useState(false);
        const [ai, setAi] = useState(0);
        const [val, setVal] = useState('');
        const list = useMemo(() => all.filter(c => c.toLowerCase().includes(q.toLowerCase())), [q]);
        const pick = (c) => { setVal(c); setQ(c); setOpen(false); };
        return (<Frame label="Native select vs combobox" caption="Type to filter; ↑/↓ to move; Enter to choose; Esc to close. The listbox follows the ARIA combobox pattern.">
        <div className="cbx">
          <label>Native select<select className="ui-in"><option>Choose a size</option><option>Small</option><option>Medium</option><option>Large</option></select></label>
          <div className="cb-wrap"><label htmlFor="cb-in">Country (combobox)</label>
            <input id="cb-in" className="ui-in" role="combobox" aria-expanded={open} aria-controls="cb-list" aria-autocomplete="list" aria-activedescendant={open && list[ai] ? 'cb-' + ai : undefined} value={q} onChange={e => { setQ(e.target.value); setOpen(true); setAi(0); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)} onKeyDown={e => { if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
            setAi(i => Math.min(i + 1, list.length - 1));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setAi(i => Math.max(i - 1, 0));
        }
        else if (e.key === 'Enter' && open && list[ai]) {
            e.preventDefault();
            pick(list[ai]);
        }
        else if (e.key === 'Escape')
            setOpen(false); }}/>
            {open && <ul id="cb-list" role="listbox" className="cb-list" aria-label="Countries">{list.length ? list.map((c, i) => <li key={c} id={'cb-' + i} role="option" aria-selected={i === ai} onMouseDown={() => pick(c)} onMouseMove={() => setAi(i)}>{c}{val === c && <Icon n="check" s={14}/>}</li>) : <li className="none">No matches</li>}</ul>}
            <span className="hint" aria-live="polite">{open ? `${list.length} options` : val ? `Selected: ${val}` : ''}</span>
          </div>
        </div>
      </Frame>);
    },
    sliders: () => {
        const [v, setV] = useState(60);
        const [lo, setLo] = useState(20);
        const [hi, setHi] = useState(80);
        const [q, setQ] = useState(2);
        const [rt, setRt] = useState(0);
        return (<Frame label="Slider · range · stepper · rating input">
        <div className="sld">
          <label>Volume <output>{v}%</output><input type="range" min={0} max={100} value={v} onChange={e => setV(+e.target.value)} aria-valuetext={v + ' percent'}/></label>
          <div><span className="lbl">Price range <output>${lo} – ${hi}</output></span><div className="dual"><input type="range" min={0} max={100} value={lo} onChange={e => setLo(Math.min(+e.target.value, hi - 5))} aria-label="Minimum price"/><input type="range" min={0} max={100} value={hi} onChange={e => setHi(Math.max(+e.target.value, lo + 5))} aria-label="Maximum price"/><i style={{ left: lo + '%', right: 100 - hi + '%' }}/></div></div>
          <div><span className="lbl">Quantity</span><div className="stepper"><button onClick={() => setQ(x => Math.max(0, x - 1))} aria-label="Decrease quantity"><Icon n="minus"/></button><input value={q} readOnly aria-label="Quantity" role="spinbutton" aria-valuenow={q}/><button onClick={() => setQ(x => x + 1)} aria-label="Increase quantity"><Icon n="plus"/></button></div></div>
          <fieldset className="rate-in"><legend>Rate your experience</legend>{[1, 2, 3, 4, 5].map(n => <label key={n}><input type="radio" name="rt" className="sr-only" checked={rt === n} onChange={() => setRt(n)}/><span className={n <= rt ? 'on' : ''} aria-hidden="true">★</span><span className="sr-only">{n} star{n > 1 ? 's' : ''}</span></label>)}<span className="hint">{rt ? `${rt} of 5` : 'Not rated'}</span></fieldset>
        </div>
      </Frame>);
    },
    datepicker: () => {
        const [sel, setSel] = useState(24);
        const [m, setM] = useState('Calendar');
        const start = 0; // Nov 2026 starts on Sunday
        return (<Frame label="Date entry" controls={<Seg label="Pattern" options={['Calendar', 'Separate fields']} value={m} onChange={setM}/>} caption={m === 'Calendar' ? 'Calendar grid for picking nearby dates. Arrow keys move between days.' : 'Separate day/month/year fields for dates people already know, as in the GOV.UK date input.'}>
        {m === 'Calendar' ? (<div className="cal" role="grid" aria-label="November 2026" onKeyDown={e => { const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key]; if (d) {
                e.preventDefault();
                const n = Math.min(30, Math.max(1, sel + d));
                setSel(n);
                e.currentTarget.querySelector(`[data-d="${n}"]`)?.focus();
            } }}>
            <div className="cal-h"><button className="icon-btn" aria-label="Previous month"><Icon n="chevL"/></button><b>November 2026</b><button className="icon-btn" aria-label="Next month"><Icon n="chev"/></button></div>
            <div className="cal-g" role="row">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d} role="columnheader" className="dow">{d}</span>)}
              {Array.from({ length: start }, (_, i) => <span key={'e' + i}/>)}
              {Array.from({ length: 30 }, (_, i) => i + 1).map(d => <button key={d} data-d={d} role="gridcell" tabIndex={d === sel ? 0 : -1} aria-selected={d === sel} className={(d === sel ? 'sel ' : '') + (d === 24 ? 'today' : '')} onClick={() => setSel(d)} aria-label={`${d} November 2026`}>{d}</button>)}
            </div>
            <p className="hint">Selected: {sel} November 2026</p>
          </div>) : (<fieldset className="dfields"><legend>Date of birth</legend><span className="hint">For example, 27 3 2007</span><div>{[['Day', 2], ['Month', 2], ['Year', 4]].map(([l, w]) => <label key={l}>{l}<input className="ui-in" inputMode="numeric" style={{ width: w * 1.3 + 2 + 'ch' }}/></label>)}</div></fieldset>)}
      </Frame>);
    },
    colorpicker: () => {
        const [c, setC] = useState('#2BA6FF');
        const sw = ['#2BA6FF', '#3DD68C', '#F5B544', '#E5484D', '#8E4EC6', '#D6409F', '#A07553', '#8B96A6'];
        const names = ['Blue', 'Green', 'Amber', 'Red', 'Purple', 'Pink', 'Brown', 'Grey'];
        return (<Frame label="Swatches, native picker & hex">
        <div className="cpk"><div className="sw-row" role="radiogroup" aria-label="Label color">{sw.map((s, i) => <button key={s} role="radio" aria-checked={c.toLowerCase() === s.toLowerCase()} aria-label={names[i]} style={{ background: s }} onClick={() => setC(s)}>{c.toLowerCase() === s.toLowerCase() && <Icon n="check" s={14}/>}</button>)}</div>
          <label className="cp-native">Custom<input type="color" value={c} onChange={e => setC(e.target.value)}/><input className="ui-in" value={c} onChange={e => /^#[0-9a-f]{0,6}$/i.test(e.target.value) && setC(e.target.value)} aria-label="Hex value"/></label>
          <span className="tag" style={{ background: c + '33', borderColor: c, color: 'var(--tx-1)' }}>Label preview</span></div>
      </Frame>);
    },
    upload: () => {
        const [files, setFiles] = useState([]);
        const [over, setOver] = useState(false);
        const add = (fl) => { if (!fl)
            return; const nf = Array.from(fl).map(f => ({ n: f.name, s: f.size, p: 0, err: f.size > 5e6 ? 'File is larger than 5 MB' : undefined })); setFiles(v => [...v, ...nf]); };
        useEffect(() => { if (!files.some(f => f.p < 100 && !f.err))
            return; const t = setTimeout(() => setFiles(v => v.map(f => f.err ? f : { ...f, p: Math.min(100, f.p + 20) })), 220); return () => clearTimeout(t); }, [files]);
        return (<Frame label="Drag-and-drop with a button fallback" caption="Files stay in your browser — nothing is uploaded. Progress is simulated to show the states.">
        <label className={'drop' + (over ? ' over' : '')} onDragOver={e => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={e => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}>
          <Icon n="upload" s={26}/><b>Drop files here or <u>choose files</u></b><span>PDF, PNG or JPG · max 5 MB</span><input type="file" multiple className="sr-only" onChange={e => add(e.target.files)}/>
        </label>
        <ul className="files" aria-live="polite">{files.map((f, i) => <li key={i} className={f.err ? 'e' : f.p === 100 ? 'd' : ''}><Icon n="file"/><span><b>{f.n}</b><small>{(f.s / 1024).toFixed(0)} KB · {f.err || (f.p === 100 ? 'Uploaded' : `Uploading ${f.p}%`)}</small><i style={{ width: f.p + '%' }}/></span><button className="icon-btn" aria-label={'Remove ' + f.n} onClick={() => setFiles(v => v.filter((_, j) => j !== i))}><Icon n="x"/></button></li>)}</ul>
      </Frame>);
    },
    'input-anatomy': () => {
        const [st, setSt] = useState('Error');
        return (<Frame label="Field anatomy & states" controls={<Seg label="State" options={['Default', 'Focus', 'Filled', 'Error', 'Success', 'Disabled', 'Read-only']} value={st} onChange={setSt}/>}>
        <div className="ianat">
          <div className={'fld ' + st.toLowerCase()}>
            <div className="fl-top"><span className="fl-label">Amount <small>(required)</small></span><span className="fl-count">0 / 12</span></div>
            <span className="fl-hint">Enter the amount in US dollars</span>
            <div className="fl-box"><span className="fl-pre">$</span><span className="fl-val">{st === 'Default' || st === 'Focus' ? <span className="ph">0.00</span> : st === 'Error' ? '12,5x' : '1,250.00'}</span>{st === 'Focus' && <i className="caret"/>}<span className="fl-suf">USD</span>{st === 'Success' && <Icon n="check"/>}</div>
            {st === 'Error' && <span className="fl-err">✕ Enter an amount using numbers only, like 125.50</span>}
          </div>
          <ol className="ia-legend"><li>Label + required marker</li><li>Hint text</li><li>Container &amp; border (3:1)</li><li>Prefix / value / suffix</li><li>Error message (icon + text)</li><li>Character counter</li></ol>
        </div>
      </Frame>);
    },
    'form-layout': () => (<Frame label="Form layout">
      <GoodBad bad={<div className="fl2 bad"><input className="ui-in" placeholder="First name" aria-label="First name (poor layout example)"/><input className="ui-in" placeholder="Email" aria-label="Email (poor layout example)"/><input className="ui-in" placeholder="Phone*" aria-label="Phone (poor layout example)"/><input className="ui-in" placeholder="Last name" aria-label="Last name (poor layout example)"/><span className="ub danger" style={{ alignSelf: 'end' }}>Reset</span><span className="ub primary">Go</span></div>} good={<div className="fl2"><fieldset><legend>Your details</legend><label>Full name<input className="ui-in"/></label><label>Email address<input className="ui-in" type="email"/></label></fieldset><fieldset><legend>Address</legend><div className="pair2"><label>Town or city<input className="ui-in"/></label><label>Postcode<input className="ui-in" style={{ maxWidth: '10ch' }}/></label></div></fieldset><label>Phone <span className="opt">(optional)</span><input className="ui-in" type="tel"/></label><span className="ub primary" style={{ alignSelf: 'start' }}>Continue</span></div>} badNote="Zig-zag columns, placeholder labels, unexplained asterisk, destructive Reset beside the primary action." goodNote="One column, top labels, grouped fieldsets, closely related short fields side by side, optional marked."/>
    </Frame>),
    validation: () => {
        const [email, setEmail] = useState('');
        const [pw, setPw] = useState('');
        const [sub, setSub] = useState(false);
        const [touched, setT] = useState({});
        const eErr = !email ? 'Enter your email address' : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? 'Enter an email address in the correct format, like name@example.com' : '';
        const pErr = pw.length < 12 ? `Password must be at least 12 characters (${pw.length}/12)` : '';
        const errs = [eErr && ['v-email', eErr], pErr && ['v-pw', pErr]].filter(Boolean);
        const show = (k) => sub || touched[k];
        const sumRef = useRef(null);
        return (<Frame label="Inline validation + error summary" caption="Errors appear after leaving a field or on submit — not while typing the first attempt. On submit, focus moves to the summary, whose links jump to each field.">
        <form className="val" noValidate onSubmit={e => { e.preventDefault(); setSub(true); setTimeout(() => sumRef.current?.focus(), 0); }}>
          {sub && errs.length > 0 && <div className="err-sum" tabIndex={-1} ref={sumRef} role="alert"><b>There is a problem</b><ul>{errs.map(([id, m]) => <li key={id}><a href={'#' + id} data-native onClick={e => { e.preventDefault(); document.getElementById(id)?.focus(); }}>{m}</a></li>)}</ul></div>}
          {sub && errs.length === 0 && <div className="ok-sum" role="status">✓ Account details look good.</div>}
          <label className={show('e') && eErr ? 'bad' : show('e') ? 'good' : ''}>Email address{show('e') && eErr && <span className="fl-err" id="v-email-e">✕ {eErr}</span>}<input id="v-email" className={'ui-in' + (show('e') && eErr ? ' err' : show('e') ? ' ok' : '')} value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setT(t => ({ ...t, e: true }))} aria-invalid={!!(show('e') && eErr)} aria-describedby={show('e') && eErr ? 'v-email-e' : undefined}/></label>
          <label className={show('p') && pErr ? 'bad' : ''}>Create a password<span className="hint">At least 12 characters</span>{show('p') && pErr && <span className="fl-err" id="v-pw-e">✕ {pErr}</span>}<input id="v-pw" type="password" className={'ui-in' + (show('p') && pErr ? ' err' : show('p') ? ' ok' : '')} value={pw} onChange={e => setPw(e.target.value)} onBlur={() => setT(t => ({ ...t, p: true }))} aria-invalid={!!(show('p') && pErr)} aria-describedby={show('p') && pErr ? 'v-pw-e' : undefined}/></label>
          <div style={{ display: 'flex', gap: 8 }}><button className="ub primary" type="submit">Create account</button><button className="ub ghost" type="button" onClick={() => { setEmail(''); setPw(''); setSub(false); setT({}); }}>Reset demo</button></div>
        </form>
      </Frame>);
    },
    multistep: () => {
        const steps = ['Contact', 'Delivery', 'Payment', 'Check answers'];
        const [s, setS] = useState(0);
        const [d, setD] = useState({ name: 'Mira Okafor', addr: '12 Harbour Street', pay: 'Card ending 4242' });
        const fields = [['name', 'Full name'], ['addr', 'Delivery address'], ['pay', 'Payment method']];
        return (<Frame label="Multistep form with review" caption="Back never loses data; the final step lets people review and change answers before submitting.">
        <ol className="ms-steps">{steps.map((x, i) => <li key={x} className={i < s ? 'done' : i === s ? 'cur' : ''} aria-current={i === s ? 'step' : undefined}><i>{i < s ? '✓' : i + 1}</i><span>{x}</span></li>)}</ol>
        <div className="ms-body">
          <p className="label" aria-live="polite">Step {s + 1} of {steps.length}</p>
          {s < 3 ? <label>{fields[s][1]}<input className="ui-in" value={d[fields[s][0]]} onChange={e => setD({ ...d, [fields[s][0]]: e.target.value })}/></label>
                : <dl className="review">{fields.map(([k, l], i) => <div key={k}><dt>{l}</dt><dd>{d[k]}</dd><button className="link-btn" onClick={() => setS(i)}>Change<span className="sr-only"> {l.toLowerCase()}</span></button></div>)}</dl>}
          <div className="ms-act">{s > 0 && <button className="ub ghost" onClick={() => setS(s - 1)}>Back</button>}<button className="ub primary" onClick={() => setS(Math.min(3, s + 1))}>{s === 3 ? 'Submit order' : 'Continue'}</button></div>
        </div>
      </Frame>);
    },
});
