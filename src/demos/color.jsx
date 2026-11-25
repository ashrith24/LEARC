import { useState } from 'react';
import { register } from './registry';
import { Frame, Seg, Range, hsl, hslToHex, ratio } from './kit';
const schemes = {
    Monochromatic: [0], Analogous: [-30, 0, 30], Complementary: [0, 180], 'Split-complementary': [0, 150, 210], Triadic: [0, 120, 240], Tetradic: [0, 60, 180, 240], Compound: [0, 30, 180],
};
function Wheel({ base, scheme, onPick }) {
    const offs = schemes[scheme];
    const pts = offs.map(o => (base + o + 360) % 360);
    const pos = (h, r) => [150 + Math.cos((h - 90) * Math.PI / 180) * r, 150 + Math.sin((h - 90) * Math.PI / 180) * r];
    return (<svg viewBox="0 0 300 300" className="wheel" role="img" aria-label={`${scheme} scheme from base hue ${base}°: ${pts.join('°, ')}°`}>
      {Array.from({ length: 36 }, (_, i) => {
            const a1 = i * 10, a2 = a1 + 10;
            const [x1, y1] = pos(a1, 140), [x2, y2] = pos(a2, 140), [x3, y3] = pos(a2, 80), [x4, y4] = pos(a1, 80);
            return <path key={i} d={`M${x1} ${y1} A140 140 0 0 1 ${x2} ${y2} L${x3} ${y3} A80 80 0 0 0 ${x4} ${y4}Z`} fill={hsl(a1 + 5, 85, 58)} onClick={() => onPick(a1)} style={{ cursor: 'pointer' }}/>;
        })}
      {pts.length > 1 && <polygon points={pts.map(h => pos(h, 110).join(',')).join(' ')} fill="none" stroke="#F9FAFC" strokeWidth="1.5" strokeDasharray="4 3"/>}
      {pts.map((h, i) => { const [x, y] = pos(h, 110); return <circle key={i} cx={x} cy={y} r={i === 0 ? 11 : 8} fill={hsl(h, 85, 58)} stroke="#F9FAFC" strokeWidth="2.5"/>; })}
      <text x="150" y="146" textAnchor="middle" fill="#F9FAFC" fontFamily="JetBrains Mono" fontSize="13">{base}°</text>
      <text x="150" y="164" textAnchor="middle" fill="#8B96A6" fontFamily="JetBrains Mono" fontSize="9">BASE HUE</text>
    </svg>);
}
register({
    hsl: () => {
        const [h, setH] = useState(205), [s, setS] = useState(90), [l, setL] = useState(55), [a, setA] = useState(100);
        return (<Frame label="Hue · saturation · lightness · opacity" caption="Tints add white, shades add black, tones add grey. The checkerboard shows opacity.">
        <div className="hslx">
          <div className="hsl-sw"><div className="checker"><div style={{ background: `hsl(${h} ${s}% ${l}% / ${a}%)` }}/></div><code>{hslToHex(h, s, l).toUpperCase()}</code><code>hsl({h} {s}% {l}%{a < 100 ? ` / ${a}%` : ''})</code></div>
          <div className="hsl-ctrl">
            <Range label="Hue" value={h} min={0} max={359} onChange={setH} unit="°"/>
            <Range label="Saturation" value={s} min={0} max={100} onChange={setS} unit="%"/>
            <Range label="Lightness" value={l} min={0} max={100} onChange={setL} unit="%"/>
            <Range label="Opacity" value={a} min={0} max={100} onChange={setA} unit="%"/>
            <div className="temp"><span>Temperature</span><b>{(h < 70 || h > 330) ? 'Warm' : h > 150 && h < 280 ? 'Cool' : 'Transitional'}</b></div>
          </div>
        </div>
        {[['Tints (+ white)', (i) => hsl(h, s, l + (100 - l) * i / 6)], ['Shades (+ black)', (i) => hsl(h, s, l * (1 - i / 6))], ['Tones (+ grey)', (i) => hsl(h, s * (1 - i / 6), l)]].map(([k, f]) => <div key={k} className="strip"><span className="label">{k}</span><div>{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ background: f(i) }}/>)}</div></div>)}
      </Frame>);
    },
    wheel: () => {
        const [base, setBase] = useState(205);
        const [sc, setSc] = useState('Split-complementary');
        const hues = schemes[sc].map(o => (base + o + 360) % 360);
        return (<Frame label="Color wheel & schemes" controls={<select className="dsel" value={sc} onChange={e => setSc(e.target.value)} aria-label="Color scheme">{Object.keys(schemes).map(k => <option key={k}>{k}</option>)}</select>} caption="Click the wheel to move the base hue. RGB primaries (red 0°, green 120°, blue 240°) produce the screen's secondary colors: yellow, cyan and magenta.">
        <div className="wheel-wrap">
          <Wheel base={base} scheme={sc} onPick={setBase}/>
          <div className="palette">
            {(sc === 'Monochromatic' ? [92, 78, 62, 48, 34, 20].map(L => [base, L]) : hues.flatMap(hh => [[hh, 62], [hh, 38]])).map(([hh, L], i) => <div key={i} style={{ background: hsl(hh, 80, L) }}><code>{hslToHex(hh, 80, L).toUpperCase()}</code></div>)}
          </div>
        </div>
      </Frame>);
    },
    harmony: () => {
        const [p, setP] = useState('60-30-10');
        const w = p === '60-30-10' ? [60, 30, 10] : [34, 33, 33];
        return (<Frame label="Proportion & simultaneous contrast" controls={<Seg label="Proportion" options={['60-30-10', 'Equal thirds']} value={p} onChange={setP}/>} caption="The same three colors feel calm in 60-30-10 proportion and noisy in equal amounts. Below: identical grey squares look different on different grounds.">
        <div className="prop">{['#1E2430', '#2B3446', '#2BA6FF'].map((c, i) => <div key={c} style={{ flex: w[i], background: c }}><span>{w[i]}%</span></div>)}</div>
        <div className="mini-ui" style={{ ['--a']: '#2BA6FF', ['--s']: p === '60-30-10' ? '#2B3446' : '#2BA6FF', ['--b']: p === '60-30-10' ? '#1E2430' : '#14448C' }}>
          <div className="mu-side"/><div className="mu-main"><div className="mu-card"/><div className="mu-card"/><span className="mu-btn"/></div>
        </div>
        <div className="simul">{['#0B0D12', '#F9FAFC', '#F5B544'].map(bg => <div key={bg} style={{ background: bg }}><i /></div>)}</div>
      </Frame>);
    },
    psychology: () => {
        const list = [['Red', '#E5484D', 'Urgency, error, energy · luck in some East Asian contexts'], ['Orange', '#F76B15', 'Warmth, enthusiasm, caution'], ['Yellow', '#FFC53D', 'Attention, optimism, warning'], ['Green', '#30A46C', 'Success, growth, "go"'], ['Blue', '#2BA6FF', 'Trust, calm, links by convention'], ['Purple', '#8E4EC6', 'Creativity, luxury'], ['Pink', '#D6409F', 'Playfulness, care'], ['Brown', '#A07553', 'Earthiness, craft, reliability'], ['Black', '#111317', 'Elegance, power, formality'], ['White', '#F9FAFC', 'Simplicity, cleanliness · mourning in some cultures'], ['Grey', '#8B96A6', 'Neutrality, inactivity, disabled']];
        return (<Frame label="Common associations — contextual, not universal" caption="Associations vary by culture, industry and context; validate with your audience. Meaning in UI must never rely on color alone.">
        <div className="psy">{list.map(([n, c, d]) => <div key={n} style={{ ['--c']: c }}><i /><b>{n}</b><span>{d}</span></div>)}</div>
      </Frame>);
    },
    roles: () => {
        const [r, setR] = useState('Primary');
        const roles = { Background: 'bg', Surface: 'sf', Text: 'tx', Border: 'bd', Primary: 'pr', Secondary: 'sc', Accent: 'ac' };
        return (<Frame label="Color roles on a real layout" controls={<Seg label="Role" options={Object.keys(roles)} value={r} onChange={setR}/>} caption="Components reference roles, not raw colors — so a theme can remap every role at once.">
        <div className={'roles hl-' + roles[r]}>
          <div className="r-sf r-card"><span className="r-ac">New</span><b className="r-tx">Project Atlas</b><span className="r-tx2">Updated 2 hours ago</span><div className="r-bd"/><div className="r-row"><span className="r-pr">Open</span><span className="r-sc">Share</span></div></div>
          <div className="r-sf r-card"><b className="r-tx">Billing</b><span className="r-tx2">Next invoice on 1 Dec</span><div className="r-bd"/><div className="r-row"><span className="r-pr">Pay now</span></div></div>
        </div>
      </Frame>);
    },
    semantic: () => (<Frame label="Semantic, state & data colors" caption="Status uses color + icon + text. Interaction states shift lightness. Data palettes are chosen by data type.">
      <div className="sem">
        {[['ok', '✓', 'Success', 'Payment received.'], ['warn', '!', 'Warning', 'Your trial ends in 3 days.'], ['err', '✕', 'Error', 'Card was declined.'], ['info', 'i', 'Info', 'New version available.']].map(([k, ic, t, m]) => <div key={k} className={'sem-a ' + k}><span className="ic">{ic}</span><b>{t}</b><span>{m}</span></div>)}
      </div>
      <div className="states-row">{[['Default', '#1488FC'], ['Hover', '#2BA6FF'], ['Pressed', '#0F6FD0'], ['Selected', 'rgba(43,166,255,.18)'], ['Disabled', '#262D3B']].map(([k, c]) => <div key={k}><i style={{ background: c, outline: k === 'Selected' ? '1px solid #2BA6FF' : undefined }}/><span>{k}</span></div>)}</div>
      <div className="dv">
        <div><span className="label">Categorical</span><div>{['#2BA6FF', '#F5B544', '#3DD68C', '#E5484D', '#8E4EC6', '#D6409F'].map(c => <i key={c} style={{ background: c }}/>)}</div></div>
        <div><span className="label">Sequential</span><div>{[92, 80, 68, 56, 44, 32].map(L => <i key={L} style={{ background: hsl(205, 85, L) }}/>)}</div></div>
        <div><span className="label">Diverging</span><div>{[[0, 55], [0, 72], [0, 88], [205, 88], [205, 72], [205, 55]].map(([h, L], i) => <i key={i} style={{ background: hsl(h, i === 2 || i === 3 ? 10 : 70, L) }}/>)}</div></div>
      </div>
    </Frame>),
    ramps: () => {
        const [h, setH] = useState(205);
        const [th, setTh] = useState('Dark theme');
        const [selectedStep, setSelectedStep] = useState(400);
        const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
        const L = (i) => 96 - i * 9.2;
        const dark = th === 'Dark theme';
        const pick = (i) => hslToHex(h, 85, L(i));
        const selectedIndex = steps.indexOf(selectedStep);
        const action = pick(selectedIndex);
        const actionText = ratio(action, '#0B0D12') >= ratio(action, '#FFFFFF') ? '#0B0D12' : '#FFFFFF';
        const map = dark ? { bg: hslToHex(h, 25, 6), surface: hslToHex(h, 18, 12), text: hslToHex(h, 20, 96) } : { bg: '#FFFFFF', surface: hslToHex(h, 30, 97), text: hslToHex(h, 30, 12) };
        return (<Frame label="Ramp → tokens → theme" controls={<><Range label="Hue" value={h} min={0} max={359} onChange={setH} unit="°"/><Seg label="Theme" options={['Dark theme', 'Light theme']} value={th} onChange={setTh}/></>} caption="Choose any 50–900 ramp step to apply it to the primary action in either theme.">
        <div className="ramp" role="group" aria-label="Choose primary action color step">{steps.map((s, i) => <button type="button" key={s} aria-pressed={selectedStep === s} aria-label={`Use step ${s}, ${pick(i).toUpperCase()}`} onClick={() => setSelectedStep(s)} style={{ background: pick(i), color: L(i) > 55 ? '#0B0D12' : '#F9FAFC' }}><b>{s}</b><code>{pick(i).toUpperCase()}</code></button>)}</div>
        <div className="themebox" style={{ background: map.bg, color: map.text }}>
          <div style={{ background: map.surface, border: `1px solid ${dark ? '#ffffff14' : '#00000014'}` }}>
            <b>Theme preview</b><span style={{ opacity: .75 }}>surface · text · action</span>
            <button type="button" className="tb-btn" style={{ background: action, color: actionText, borderColor: actionText === '#0B0D12' ? '#0B0D12' : '#FFFFFF' }}>Primary action</button>
            <code style={{ opacity: .8 }}>action.primary → hue-{h} / {selectedStep} · {ratio(action, map.surface).toFixed(2)}:1 vs surface</code>
          </div>
        </div>
      </Frame>);
    },
    'contrast-checker': () => {
        const [fg, setFg] = useState('#8B96A6');
        const [bg, setBg] = useState('#171B24');
        const r = ratio(fg, bg);
        const P = ({ ok, t }) => <span className={'pf ' + (ok ? 'ok' : 'no')}>{ok ? '✓ Pass' : '✕ Fail'} <small>{t}</small></span>;
        const sim = [['Normal', 'none'], ['Deuteranopia', 'url(#deut)'], ['Protanopia', 'url(#prot)'], ['Tritanopia', 'url(#trit)'], ['Achromatopsia', 'grayscale(1)']];
        return (<Frame label="WCAG 2.2 contrast checker" caption="Ratios use the WCAG relative-luminance formula. Simulations approximate color-vision deficiencies — use them to check charts and status colors.">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true"><defs>
          <filter id="deut"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/></filter>
          <filter id="prot"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/></filter>
          <filter id="trit"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/></filter>
        </defs></svg>
        <div className="cc">
          <div className="cc-in">
            <label>Text <span><input type="color" value={fg} onChange={e => setFg(e.target.value)}/><input value={fg} onChange={e => /^#[0-9a-f]{6}$/i.test(e.target.value) && setFg(e.target.value)} aria-label="Text color hex"/></span></label>
            <label>Background <span><input type="color" value={bg} onChange={e => setBg(e.target.value)}/><input value={bg} onChange={e => /^#[0-9a-f]{6}$/i.test(e.target.value) && setBg(e.target.value)} aria-label="Background color hex"/></span></label>
            <button className="btn btn-sm" onClick={() => { setFg(bg); setBg(fg); }}>Swap</button>
          </div>
          <div className="cc-prev" style={{ background: bg, color: fg }}><span style={{ fontSize: 28, fontWeight: 700 }}>Large heading</span><span>Body text at 16px for reading.</span></div>
          <div className="cc-res"><b className="ratio">{r.toFixed(2)}:1</b>
            <P ok={r >= 4.5} t="AA normal text · 4.5:1"/><P ok={r >= 3} t="AA large text · 3:1"/><P ok={r >= 3} t="UI components · 3:1"/><P ok={r >= 7} t="AAA normal · 7:1"/>
          </div>
        </div>
        <div className="cvd">{sim.map(([n, f]) => <div key={n}><div className="cvd-s" style={{ filter: f }}>{['#E5484D', '#30A46C', '#F5B544', '#2BA6FF', '#8E4EC6'].map(c => <i key={c} style={{ background: c }}/>)}</div><span>{n}</span></div>)}</div>
      </Frame>);
    },
    'palette-builder': () => {
        const [h, setH] = useState(212);
        const [sc, setSc] = useState('Analogous');
        const hues = schemes[sc].map(o => (h + o + 360) % 360).slice(0, 3);
        const neutrals = [6, 12, 20, 34, 60, 80, 96].map(L => hslToHex(h, 12, L));
        const sem = [hslToHex(145, 60, 50), hslToHex(38, 92, 58), hslToHex(358, 75, 62), hslToHex(h, 85, 60)];
        const bg = neutrals[0], txt = neutrals[6];
        return (<Frame label="Exercise 1 — build a palette" controls={<><Range label="Brand hue" value={h} min={0} max={359} onChange={setH} unit="°"/><select className="dsel" value={sc} onChange={e => setSc(e.target.value)} aria-label="Scheme">{['Monochromatic', 'Analogous', 'Complementary', 'Split-complementary', 'Triadic'].map(k => <option key={k}>{k}</option>)}</select></>} caption="Brand + scheme hues, tinted neutrals and four semantic hues. Each chip shows its contrast against the background so you can complete Exercise 2.">
        {[['Brand & scheme', hues.map(x => hslToHex(x, 80, 58))], ['Neutrals (tinted)', neutrals], ['Semantic: success · warning · error · info', sem]].map(([k, cs]) => (<div key={k} className="pb-row"><span className="label">{k}</span><div>{cs.map((c) => <div key={c} className="pb-c" style={{ background: c }}><code style={{ color: ratio(c, '#000') > 7 ? '#0B0D12' : '#F9FAFC' }}>{c.toUpperCase()}<br />{ratio(c, bg).toFixed(1)}:1</code></div>)}</div></div>))}
        <p className="muted" style={{ fontSize: 13, margin: '10px 0 0' }}>Text {txt.toUpperCase()} on background {bg.toUpperCase()}: <b style={{ color: 'var(--tx-1)' }}>{ratio(txt, bg).toFixed(2)}:1</b></p>
      </Frame>);
    },
});
