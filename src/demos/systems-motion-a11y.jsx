import { useRef, useState } from "react";
import { register } from './registry';
import { Frame, Seg, Range, GoodBad, ratio } from './kit';
import { Icon } from '../components/Icon';
/* ───── Style specimens (category 16) ───── */
function Specimen({ id }) {
    return (<div className={'sty sty-' + id}>
      <div className="sty-card">
        <span className="sty-over">Specimen · {id.replace(/-/g, ' ')}</span>
        <h4 className="sty-h">Weekly report</h4>
        <p className="sty-p">Revenue grew 12% while support tickets fell. Review the details before Friday.</p>
        <div className="sty-row"><span className="sty-chip">On track</span><span className="sty-chip alt">Q4</span></div>
        <label className="sty-lbl">Comment<input className="sty-in" defaultValue="Looks good"/></label>
        <div className="sty-row"><button className="sty-btn" type="button">Approve</button><button className="sty-btn2" type="button">Later</button></div>
      </div>
    </div>);
}
register({
    style: ({ topic }) => {
        const id = topic.id;
        const [cmp, setCmp] = useState('Specimen');
        return (<Frame label={`${topic.title} — live specimen`} controls={<Seg label="View" options={['Specimen', 'Compare with flat']} value={cmp} onChange={setCmp}/>} caption="The same card, input and buttons, restyled. The specimen is fully rendered in CSS; text is sample content.">
        <div className={'sty-wrap' + (cmp !== 'Specimen' ? ' two' : '')}><Specimen id={id}/>{cmp !== 'Specimen' && <Specimen id="flat-design"/>}</div>
      </Frame>);
    },
    /* ───── Design systems ───── */
    'ds-layers': () => {
        const [l, setL] = useState(2);
        const layers = ['Principles', 'Foundations', 'Tokens', 'Components', 'Patterns', 'Documentation', 'Governance'];
        const ex = ['“Clarity over decoration”', 'Color · type · space · motion', 'color.action.primary = blue-500', 'Button, Input, Card, Dialog', 'Sign-in form, filter bar', 'Usage · do/don’t · accessibility', 'Proposals · reviews · releases'];
        return (<Frame label="Layers of a design system" caption="Hover or focus a layer. Each layer is built on the ones below it.">
        <div className="dsl">{layers.map((x, i) => <button key={x} className={i === l ? 'on' : ''} onMouseEnter={() => setL(i)} onFocus={() => setL(i)} style={{ marginInline: i * 12 }}><span className="mono">{String(i + 1).padStart(2, '0')}</span><b>{x}</b><small>{ex[i]}</small></button>).reverse()}</div>
      </Frame>);
    },
    'token-pipeline': () => {
        const [th, setTh] = useState('Dark');
        const map = { Light: ['#1488FC', 'blue-600'], Dark: ['#2BA6FF', 'blue-400'], 'Brand B': ['#8E4EC6', 'violet-500'] }[th];
        return (<Frame label="Primitive → semantic → component" controls={<Seg label="Theme" options={['Light', 'Dark', 'Brand B']} value={th} onChange={setTh}/>} caption="Switching theme changes only the semantic mapping. The component token and the component never change.">
        <div className="tp">
          <div><span className="label">Primitive</span><code><i style={{ background: map[0] }}/>{map[1]} = {map[0]}</code></div><Icon n="arrow"/>
          <div><span className="label">Semantic</span><code>color.action.primary → {map[1]}</code></div><Icon n="arrow"/>
          <div><span className="label">Component</span><code>button.primary.bg → color.action.primary</code></div><Icon n="arrow"/>
          <div className={'tp-out ' + th.toLowerCase().replace(' ', '')}><button className="ub" style={{ background: map[0], color: th === 'Light' ? '#fff' : '#0B0D12' }} tabIndex={-1}>Continue</button></div>
        </div>
      </Frame>);
    },
    'token-table': () => (<Frame label="Token categories (this site's own tokens)" caption="Values are read from this encyclopedia's tokens.css — the site is built on the system it describes." pad={false}>
      <div className="scroll"><table className="dt"><thead><tr><th scope="col">Category</th><th scope="col">Example token</th><th scope="col">Value</th><th scope="col">Preview</th></tr></thead><tbody>
        {[['Color', '--blue', '#2BA6FF', <i className="tk-sw" style={{ background: 'var(--blue)' }}/>], ['Typography', '--f-display', 'Schibsted Grotesk', <span style={{ fontFamily: 'var(--f-display)', fontWeight: 800 }}>Aa</span>], ['Spacing', '--s-4', '16px', <i className="tk-sp" style={{ width: 16 }}/>], ['Radius', '--r-md', '10px', <i className="tk-r" style={{ borderRadius: 10 }}/>], ['Border', '--bd', '#252C38', <i className="tk-r" style={{ border: '1px solid var(--bd)' }}/>], ['Shadow / elevation', '--sh-2', '0 8px 24px …', <i className="tk-r" style={{ boxShadow: 'var(--sh-2)', background: 'var(--bg-2)' }}/>], ['Motion', '--dur-2 / --ease-out', '200ms · cubic-bezier(.2,.8,.2,1)', <i className="tk-mo"/>], ['Breakpoint', 'layout', '600 · 900 · 1240px', <span className="mono">3</span>], ['Z-index', '--z-modal', '60', <span className="mono">60</span>]].map(([c, t, v, p]) => <tr key={c}><th scope="row">{c}</th><td><code>{t}</code></td><td className="mono">{v}</td><td>{p}</td></tr>)}
      </tbody></table></div>
    </Frame>),
    'component-spec': () => {
        const [v, setV] = useState('Primary');
        const [sz, setSz] = useState('Medium');
        const [ic, setIc] = useState(true);
        return (<Frame label="Component specification sheet" caption="Anatomy, variant and property names are shared between design files and code: Button / Variant=Primary / Size=Medium / Icon=true.">
        <div className="cspec">
          <div className="cs-prev"><button className={'ub ' + v.toLowerCase() + (sz === 'Small' ? ' z-sm' : sz === 'Large' ? ' z-lg' : '')} tabIndex={-1}>{ic && <Icon n="download"/>}Export</button></div>
          <dl className="cs-props">
            <div><dt>Variant</dt><dd><Seg label="Variant" options={['Primary', 'Secondary', 'Ghost']} value={v} onChange={setV}/></dd></div>
            <div><dt>Size</dt><dd><Seg label="Size" options={['Small', 'Medium', 'Large']} value={sz} onChange={setSz}/></dd></div>
            <div><dt>Icon</dt><dd><Seg label="Icon" options={['true', 'false']} value={String(ic)} onChange={x => setIc(x === 'true')}/></dd></div>
            <div><dt>States</dt><dd className="mono">default · hover · focus · pressed · loading · disabled</dd></div>
            <div><dt>Keyboard</dt><dd className="mono">Tab to focus · Enter/Space to activate</dd></div>
          </dl>
        </div>
        <p className="muted" style={{ fontSize: 13, margin: '12px 0 0' }}>Educational demonstration of a spec sheet — not the V2 component playground.</p>
      </Frame>);
    },
    governance: () => (<Frame label="Contribution & release flow">
      <ol className="gov">{[['Proposal', 'Need + evidence + alternatives'], ['Review', 'Design, code, accessibility'], ['Build', 'Component + docs + tests'], ['Release', 'v2.5.0 · changelog'], ['Deprecate', 'Old API marked, migration guide, removal in next major']].map(([a, b], i) => <li key={a}><i>{i + 1}</i><b>{a}</b><span>{b}</span></li>)}</ol>
      <div className="semver"><span className="label">Semantic versioning</span><code><b style={{ color: '#FF8F8F' }}>3</b>.<b style={{ color: '#F5B544' }}>2</b>.<b style={{ color: '#3DD68C' }}>1</b></code><small>major = breaking · minor = new features · patch = fixes</small></div>
    </Frame>),
    theming: () => {
        const [t, setT] = useState('Dark');
        const th = { Light: { bg: '#FFFFFF', sf: '#F4F6FA', tx: '#111827', mu: '#4B5563', ac: '#1462D9', bd: '#D6DCE5' }, Dark: { bg: '#0B0D12', sf: '#171B24', tx: '#F9FAFC', mu: '#B8C0CC', ac: '#2BA6FF', bd: '#252C38' }, 'High contrast': { bg: '#000000', sf: '#000000', tx: '#FFFFFF', mu: '#FFFFFF', ac: '#FFFF00', bd: '#FFFFFF' }, 'Brand B': { bg: '#120E18', sf: '#1E1728', tx: '#F7F3FB', mu: '#C7BBD6', ac: '#C084FC', bd: '#33284A' } }[t];
        return (<Frame label="One component set, four themes" controls={<Seg label="Theme" options={['Light', 'Dark', 'High contrast', 'Brand B']} value={t} onChange={setT}/>} caption={`Text/surface contrast: ${ratio(th.tx, th.sf).toFixed(1)}:1 · accent/surface: ${ratio(th.ac, th.sf).toFixed(1)}:1`}>
        <div className="themex" style={{ background: th.bg, color: th.tx, ['--bd']: th.bd }}><div style={{ background: th.sf, border: `1px solid ${th.bd}` }}><b>Notifications</b><span style={{ color: th.mu }}>Choose what you hear about.</span><label><span>Mentions</span><i style={{ background: th.ac }}><b style={{ background: th.bg }}/></i></label><button style={{ background: th.ac, color: th.bg, border: t === 'High contrast' ? '2px solid #fff' : 0 }} tabIndex={-1}>Save</button></div></div>
      </Frame>);
    },
    platforms: () => {
        const [p, setP] = useState('iOS');
        const note = { Web: 'Links + URLs, browser back, top or side navigation, keyboard and pointer.', 'Desktop app': 'Menubar, keyboard shortcuts, context menus, dense layouts, multiple windows.', iOS: 'Tab bar for top-level sections, sheets for scoped tasks, SF Symbols (Apple HIG).', 'Android / Material': 'Navigation bar, FAB for the primary action, Material components.', Tablet: 'Navigation rail or split view; adaptive between phone and desktop.' };
        return (<Frame label="Platform conventions (schematic)" controls={<Seg label="Platform" options={['Web', 'Desktop app', 'iOS', 'Android / Material', 'Tablet']} value={p} onChange={setP}/>} caption={note[p]}>
        <div className={'plat ' + p.split(' ')[0].toLowerCase()}><div className="pl-dev">
          {p === 'Web' && <><div className="pl-url">https://example.com/projects</div><div className="pl-top"><b /><i /><i /><i /></div><div className="pl-body"/></>}
          {p === 'Desktop' && <><div className="pl-menu">{['File', 'Edit', 'View', 'Window', 'Help'].map(x => <span key={x}>{x}</span>)}</div><div className="pl-split"><div className="pl-sb"/><div className="pl-body"/></div></>}
          {p === 'iOS' && <><div className="pl-title">Library</div><div className="pl-body"/><div className="pl-tab">{['home', 'search', 'bookmark', 'user'].map((x, i) => <span key={x} className={i === 0 ? 'on' : ''}><Icon n={x}/></span>)}</div></>}
          {p === 'Android' && <><div className="pl-appbar">Library</div><div className="pl-body"/><span className="pl-fab"><Icon n="plus"/></span><div className="pl-nav">{['home', 'search', 'bookmark', 'user'].map((x, i) => <span key={x} className={i === 0 ? 'on' : ''}><i><Icon n={x}/></i></span>)}</div></>}
          {p === 'Tablet' && <div className="pl-split"><div className="pl-rail">{[0, 1, 2, 3].map(i => <i key={i} className={i === 0 ? 'on' : ''}/>)}</div><div className="pl-list"/><div className="pl-body"/></div>}
        </div></div>
      </Frame>);
    },
    'ds-compare': () => (<Frame label="Six public design systems" pad={false}>
      <div className="scroll"><table className="dt"><thead><tr><th scope="col">System</th><th scope="col">Organisation</th><th scope="col">Known for (per its documentation)</th><th scope="col">Docs</th></tr></thead><tbody>
        {[['Material Design 3', 'Google', 'Design tokens; color roles; shape scale; elevation; easing & duration', 'https://m3.material.io/foundations/design-tokens/overview'], ['Human Interface Guidelines', 'Apple', 'Platform conventions; tab bars; sheets; materials; SF Symbols', 'https://developer.apple.com/design/human-interface-guidelines/accessibility'], ['Carbon', 'IBM', '2x Grid (8px mini unit); data tables; empty states; productive/expressive motion', 'https://carbondesignsystem.com/elements/2x-grid/overview/'], ['Atlassian Design System', 'Atlassian', 'Token naming (foundation · property · modifier); lozenges', 'https://atlassian.design/foundations/tokens/design-tokens'], ['Fluent 2', 'Microsoft', 'Cross-platform design and development resources', 'https://fluent2.microsoft.design/'], ['GOV.UK Design System', 'UK Government Digital Service', 'Components and patterns for public services; error summary; question pages', 'https://design-system.service.gov.uk/components/']].map(([a, b, c, u]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td><td><a href={u} target="_blank" rel="noopener noreferrer">Official docs ↗</a></td></tr>)}
      </tbody></table></div>
    </Frame>),
    /* ───── Motion ───── */
    micro: () => {
        const [liked, setLiked] = useState(false);
        const [on, setOn] = useState(false);
        const [saved, setSaved] = useState('idle');
        return (<Frame label="Micro-interactions" caption="Hover and press the button; toggle the switch; like the post; save. Each gives feedback in 100–300ms.">
        <div className="mix">
          <button className="ub primary mi-press">Hover & press me</button>
          <button type="button" role="switch" aria-checked={on} className="mi-sw" onClick={() => setOn(v => !v)} aria-label="Notifications"><i /></button>
          <button className={'mi-like' + (liked ? ' on' : '')} aria-pressed={liked} onClick={() => setLiked(v => !v)} aria-label="Like"><Icon n="heart" s={22}/><span>{liked ? 25 : 24}</span></button>
          <button className="ub secondary" aria-busy={saved === 'busy'} onClick={() => { setSaved('busy'); setTimeout(() => setSaved('done'), 900); setTimeout(() => setSaved('idle'), 2400); }}>{saved === 'busy' ? <><span className="spin"/>Saving</> : saved === 'done' ? <><Icon n="check"/>Saved</> : 'Save'}</button>
        </div>
      </Frame>);
    },
    transitions: () => {
        const [k, setK] = useState('Scale + fade');
        const [open, setOpen] = useState(true);
        return (<Frame label="Transition types" controls={<><Seg label="Transition" options={['Fade', 'Scale + fade', 'Slide', 'Expand']} value={k} onChange={v => { setK(v); setOpen(false); }}/><button className="btn btn-sm btn-primary" onClick={() => setOpen(v => !v)}>{open ? 'Close' : 'Open'}</button></>} caption="Enter with ease-out (decelerate), exit with ease-in (accelerate). With reduced motion, all become instant.">
        <div className="trx"><div className={'tr-el ' + k.split(' ')[0].toLowerCase() + (open ? ' open' : '')}><b>Panel</b><span>Entered with {k.toLowerCase()}</span></div></div>
      </Frame>);
    },
    'scroll-reveal': () => {
        const box = useRef(null);
        const [p, setP] = useState(0);
        return (<Frame label="Scroll-triggered reveal & scroll-linked progress" caption="Scroll inside the box: items fade in once; the bar tracks scroll position. This site uses both, and disables reveal under reduced motion.">
        <div className="srx"><div className="sr-bar"><i style={{ width: p + '%' }}/></div><div className="sr-box" ref={box} tabIndex={0} aria-label="Scrollable demo" onScroll={e => { const t = e.currentTarget; setP(Math.round(t.scrollTop / (t.scrollHeight - t.clientHeight) * 100)); t.querySelectorAll('.sr-it').forEach(el => { const r = el.offsetTop - t.scrollTop; if (r < t.clientHeight - 30)
            el.classList.add('in'); }); }}>
          {Array.from({ length: 8 }, (_, i) => <div key={i} className={'sr-it' + (i < 2 ? ' in' : '')}><b>Section {i + 1}</b><i /><i /></div>)}</div></div>
      </Frame>);
    },
    'animated-icons': () => {
        const [m, setM] = useState(false);
        const [p, setP] = useState(false);
        const [v, setV] = useState(1280);
        return (<Frame label="Animated icons & data updates">
        <div className="aix">
          <button className={'ai-burger' + (m ? ' x' : '')} onClick={() => setM(x => !x)} aria-label={m ? 'Close menu' : 'Open menu'} aria-expanded={m}><i /><i /><i /></button>
          <button className="ai-play" onClick={() => setP(x => !x)} aria-label={p ? 'Pause' : 'Play'}><Icon n={p ? 'pause' : 'play'} s={22}/></button>
          <div className="ai-num"><span className="label">Live total</span><b key={v} className="flash">{v.toLocaleString('en-US')}</b><button className="btn btn-sm" onClick={() => setV(x => x + Math.round(Math.random() * 90 + 10))}>Simulate update</button></div>
        </div>
      </Frame>);
    },
    easing: () => {
        const curves = { Linear: [0, 0, 1, 1], 'Ease-out': [0.2, 0.8, 0.2, 1], 'Ease-in': [0.4, 0, 1, 1], 'Ease-in-out': [0.4, 0, 0.2, 1], Overshoot: [0.34, 1.56, 0.64, 1] };
        const [k, setK] = useState('Ease-out');
        const [d, setD] = useState(400);
        const [run, setRun] = useState(0);
        const c = curves[k];
        const path = `M10 110 C ${10 + c[0] * 180} ${110 - c[1] * 100}, ${10 + c[2] * 180} ${110 - c[3] * 100}, 190 10`;
        return (<Frame label="Easing curves & duration" controls={<><select className="dsel" value={k} onChange={e => setK(e.target.value)} aria-label="Easing">{Object.keys(curves).map(x => <option key={x}>{x}</option>)}</select><Range label="Duration" value={d} min={100} max={1200} step={50} onChange={setD} unit="ms"/><button className="btn btn-sm btn-primary" onClick={() => setRun(r => r + 1)}>Play</button></>} caption={`cubic-bezier(${c.join(', ')}) · ${d}ms. Typical UI: 150–300ms for small changes.`}>
        <div className="ez"><svg viewBox="0 0 200 120" role="img" aria-label={`${k} easing curve`}><rect x="10" y="10" width="180" height="100" fill="none" stroke="#252C38"/><path d="M10 110 L190 10" stroke="#252C38" strokeDasharray="3 3"/><path d={path} fill="none" stroke="#2BA6FF" strokeWidth="2.5"/><text x="10" y="120" fill="#8B96A6" fontSize="7" fontFamily="JetBrains Mono">time →</text></svg>
          <div className="ez-track"><i key={run + k + d} className={run ? 'go' : ''} style={{ transitionTimingFunction: `cubic-bezier(${c.join(',')})`, animationDuration: d + 'ms', animationTimingFunction: `cubic-bezier(${c.join(',')})` }}/><i className="lin" key={'l' + run + d} style={{ animationDuration: d + 'ms' }}/></div></div>
      </Frame>);
    },
    stagger: () => {
        const [run, setRun] = useState(1);
        const [s, setS] = useState(40);
        return (<Frame label="Sequencing (stagger)" controls={<><Range label="Stagger" value={s} min={0} max={150} step={10} onChange={setS} unit="ms"/><button className="btn btn-sm btn-primary" onClick={() => setRun(r => r + 1)}>Replay</button></>} caption={`Total = duration + stagger × (items − 1) = 250 + ${s} × 5 = ${250 + s * 5}ms. Keep totals short.`}>
        <div className="stg2" key={run}>{Array.from({ length: 6 }, (_, i) => <div key={i} style={{ animationDelay: i * s + 'ms' }}><i /><b /></div>)}</div>
      </Frame>);
    },
    'reduced-motion': () => {
        const [r, setR] = useState(false);
        const [k, setK] = useState(0);
        const sys = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
        return (<Frame label="Full vs reduced motion" controls={<><label className="tg"><input type="checkbox" checked={r} onChange={e => setR(e.target.checked)}/>Simulate “reduce motion”</label><button className="btn btn-sm btn-primary" onClick={() => setK(x => x + 1)}>Open panel</button></>} caption={`Your system setting: ${sys ? 'reduce' : 'no-preference'}. Reduced: the large slide becomes a short fade — the change is still communicated.`}>
        <div className="rmx"><div key={k} className={'rm-panel ' + (r || sys ? 'fade' : 'slide')}><b>Settings panel</b><span>{r || sys ? 'Fade, 150ms' : 'Slide from right, 320ms'}</span></div></div>
      </Frame>);
    },
    /* ───── Responsive & a11y ───── */
    devices: () => (<Frame label="One product, three devices">
      <div className="dvx">{[['Desktop', 'd', 'Sidebar · 3 columns · hover'], ['Tablet', 't', 'Rail · 2 columns · touch'], ['Phone', 'p', 'Bottom nav · 1 column · thumb zone']].map(([n, c, d]) => <div key={c}><div className={'dvs ' + c}><i className="nv"/>{Array.from({ length: c === 'd' ? 6 : c === 't' ? 4 : 2 }, (_, i) => <i key={i} className="cd"/>)}</div><b>{n}</b><small>{d}</small></div>)}</div>
    </Frame>),
    targets: () => {
        const [show, setShow] = useState(true);
        return (<Frame label="Target size" controls={<label className="tg"><input type="checkbox" checked={show} onChange={e => setShow(e.target.checked)}/>Show target areas</label>} caption="WCAG 2.2 SC 2.5.8 (AA): at least 24×24 CSS px or enough spacing. SC 2.5.5 (AAA): 44×44.">
        <div className={'tgx' + (show ? ' show' : '')}>
          <GoodBad bad={<div className="tg-row tight">{['x', 'edit', 'trash', 'share'].map(i => <button key={i} className="t-sm" aria-label={i}><Icon n={i} s={14}/></button>)}</div>} good={<div className="tg-row">{['x', 'edit', 'trash', 'share'].map(i => <button key={i} className="t-lg" aria-label={i}><Icon n={i} s={18}/></button>)}</div>} badNote="16px targets, 2px apart — easy to hit the wrong one." goodNote="44px targets with spacing; the glyph stays 18px."/>
        </div>
      </Frame>);
    },
    'focus-order': () => {
        const [bad, setBad] = useState(false);
        return (<Frame label="Keyboard focus order" controls={<Seg label="Order" options={['Logical', 'Broken']} value={bad ? 'Broken' : 'Logical'} onChange={v => setBad(v === 'Broken')}/>} caption="Click inside the form, then press Tab. Numbers show the order focus will follow. The broken version uses CSS reordering, so visual and focus order disagree.">
        <div className={'fox' + (bad ? ' bad' : '')}>
          {['Email', 'Password', 'Remember me', 'Sign in'].map((l, i) => <div key={l} style={bad ? { order: [2, 0, 3, 1][i] } : undefined}><span className="fo-n">{i + 1}</span>{i === 2 ? <label className="ck"><input type="checkbox"/>{l}</label> : i === 3 ? <button className="ub primary">{l}</button> : <label>{l}<input className="ui-in" type={i ? 'password' : 'email'}/></label>}</div>)}
        </div>
      </Frame>);
    },
    semantics: () => (<Frame label="What a screen reader gets">
      <GoodBad bad={<div className="sem2"><div className="fake-btn" onClick={() => { }}>Save</div><code>&lt;div class="btn"&gt; → announced as text “Save”; not focusable</code></div>} good={<div className="sem2"><button className="ub primary">Save</button><code>&lt;button&gt; → “Save, button”; focusable; Enter/Space work</code></div>} badNote="Looks identical; invisible to keyboard and assistive tech." goodNote="Native element exposes role, name and keyboard behaviour for free."/>
      <div className="tree"><span className="label">Accessibility tree (simplified)</span><pre>{`banner\n  link "Encyclopedia — home"\n  navigation "Primary"\nmain\n  heading level 1 "Semantic controls"\n  button "Save"\n  textbox "Email address" (described by: "We'll send a receipt")`}</pre></div>
    </Frame>),
    noncolor: () => (<Frame label="Never color alone">
      <GoodBad bad={<div className="nc"><span style={{ color: '#3DD68C' }}>●</span><span style={{ color: '#E5484D' }}>●</span><span style={{ color: '#3DD68C' }}>●</span><p>Required fields are <span style={{ color: '#FF6B6B' }}>red</span>.</p></div>} good={<div className="nc"><span className="tag ok">✓ Passed</span><span className="tag err">✕ Failed</span><span className="tag ok">✓ Passed</span><p>Email <b>(required)</b></p></div>} badNote="Status and required-ness conveyed only by hue." goodNote="Icons, words and shapes repeat the meaning."/>
      <div className="cvd" style={{ marginTop: 14 }}><div><div className="cvd-s" style={{ filter: 'grayscale(1)' }}><span className="tag ok">✓ Passed</span><span className="tag err">✕ Failed</span></div><span>Greyscale test: still readable</span></div></div>
    </Frame>),
    reflow: () => {
        const [z, setZ] = useState(100);
        const w = Math.round(1280 / (z / 100));
        return (<Frame label="Zoom & reflow" controls={<Seg label="Zoom" options={['100', '200', '400']} value={String(z)} onChange={v => setZ(+v)}/>} caption={`At ${z}% a 1280px window behaves like a ${w} CSS px viewport. At 400% (320px) content must reflow into one column with no horizontal scrolling (WCAG 2.2 SC 1.4.10).`}>
        <div className="rfx"><div className={'rf ' + (w <= 400 ? 'one' : w <= 700 ? 'two' : 'three')} style={{ fontSize: Math.min(28, 13 * z / 100) }}><b>Account</b><p>Update your details below.</p><div className="rf-g"><i /><i /><i /></div></div></div>
      </Frame>);
    },
    captions: () => (<Frame label="Captions & media controls">
      <div className="mp"><div className="mp-screen"><span className="caption-line">[door closes] Okay — let’s review the checkout flow.</span></div><div className="mp-bar"><button className="icon-btn" aria-label="Play"><Icon n="play"/></button><input type="range" defaultValue={30} aria-label="Seek"/><button className="icon-btn" aria-pressed="true" aria-label="Captions on"><Icon n="cc"/></button><button className="icon-btn" aria-label="Transcript"><Icon n="file"/></button></div></div>
      <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>Captions include speaker changes and meaningful sounds; a transcript is offered alongside.</p>
    </Frame>),
    'a11y-chart': () => {
        const [v, setV] = useState('Chart');
        const d = [['Jan', 1.2], ['Feb', 1.4], ['Mar', 1.5], ['Apr', 2.4], ['May', 2.9], ['Jun', 3.4]];
        return (<Frame label="Chart with text summary & table" controls={<Seg label="View" options={['Chart', 'Table']} value={v} onChange={setV}/>}>
        <p className="lead-def" style={{ fontSize: 16 }}>Summary: sign-ups rose from 1.2k in January to 3.4k in June, with the largest jump in April.</p>
        {v === 'Chart' ? <div className="ac-bars" role="img" aria-label="Bar chart of monthly sign-ups; see summary above or switch to table.">{d.map(([m, n]) => <div key={m}><b style={{ height: n * 40 }}><span>{n}k</span></b><small>{m}</small></div>)}</div>
                : <table className="dt"><caption className="sr-only">Monthly sign-ups</caption><thead><tr><th scope="col">Month</th><th scope="col" style={{ textAlign: 'right' }}>Sign-ups</th></tr></thead><tbody>{d.map(([m, n]) => <tr key={m}><th scope="row">{m}</th><td style={{ textAlign: 'right' }} className="mono">{n * 1000}</td></tr>)}</tbody></table>}
      </Frame>);
    },
    pour: () => (<Frame label="WCAG 2.2 — four principles">
      <div className="pour">{[['P', 'Perceivable', 'Contrast · text alternatives · captions · reflow'], ['O', 'Operable', 'Keyboard · focus · target size · enough time'], ['U', 'Understandable', 'Labels · error identification · predictable'], ['R', 'Robust', 'Name, role, value · valid semantics']].map(([l, n, d]) => <div key={l}><b>{l}</b><span>{n}</span><small>{d}</small></div>)}</div>
      <div className="levels"><span><b>A</b> minimum</span><span className="aa"><b>AA</b> common target</span><span><b>AAA</b> enhanced</span></div>
    </Frame>),
});
