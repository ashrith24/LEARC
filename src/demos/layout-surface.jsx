import { useState } from 'react';
import { register } from './registry';
import { Frame, Seg, Range, GoodBad } from './kit';
const Blk = ({ c = '', children, style }) => <div className={'blk ' + c} style={style}>{children}</div>;
register({
    containers: () => {
        const [m, setM] = useState('Centered max-width');
        const [w, setW] = useState(100);
        return (<Frame label="Container behaviour" controls={<><Seg label="Layout type" options={['Fixed', 'Fluid', 'Full-width', 'Centered max-width']} value={m} onChange={setM}/><Range label="Screen" value={w} min={40} max={100} onChange={setW} unit="%"/></>} caption="Drag the screen width: fixed overflows, fluid stretches, full-width bleeds, max-width stops growing and centres.">
        <div className="vp" style={{ width: w + '%' }}>
          <div className={'ctr ' + m.split(' ')[0].toLowerCase()}><Blk c="hd"/><Blk c="tx"/><Blk c="tx s"/></div>
        </div>
      </Frame>);
    },
    compositions: () => {
        const [m, setM] = useState('Editorial');
        return (<Frame label="Compositions" controls={<Seg label="Composition" options={['Single', 'Split', 'Asymmetric', 'Multi-column', 'Editorial']} value={m} onChange={setM}/>}>
        <div className={'comp ' + m.toLowerCase()}>{Array.from({ length: m === 'Multi-column' ? 3 : m === 'Editorial' ? 5 : m === 'Single' ? 1 : 2 }, (_, i) => <Blk key={i} c={'c' + i}/>)}</div>
      </Frame>);
    },
    'grid-overlay': () => {
        const [cols, setCols] = useState(12), [gut, setGut] = useState(24), [mar, setMar] = useState(32), [base, setBase] = useState(false);
        return (<Frame label="Column grid" controls={<><Seg label="Columns" options={['4', '8', '12']} value={String(cols)} onChange={v => setCols(+v)}/><Range label="Gutter" value={gut} min={0} max={40} step={4} onChange={setGut} unit="px"/><Range label="Margin" value={mar} min={0} max={64} step={8} onChange={setMar} unit="px"/><label className="tg"><input type="checkbox" checked={base} onChange={e => setBase(e.target.checked)}/>Baseline</label></>} caption={`${cols} columns · ${gut}px gutters · ${mar}px margins. Content spans whole columns.`}>
        <div className="gridov" style={{ padding: `16px ${mar}px`, ['--g']: gut + 'px', ['--c']: cols }}>
          <div className="cols">{Array.from({ length: cols }, (_, i) => <i key={i}/>)}</div>
          {base && <div className="baseline"/>}
          <div className="content" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gut }}>
            <Blk style={{ gridColumn: `1 / -1`, height: 40 }}/><Blk style={{ gridColumn: `span ${Math.max(1, Math.round(cols * 2 / 3))}`, height: 120 }}/><Blk style={{ gridColumn: `span ${Math.max(1, cols - Math.round(cols * 2 / 3))}`, height: 120 }}/>
            {Array.from({ length: cols >= 8 ? 4 : 2 }, (_, i) => <Blk key={i} style={{ gridColumn: `span ${cols / (cols >= 8 ? 4 : 2)}`, height: 70 }}/>)}
          </div>
        </div>
      </Frame>);
    },
    spacing: () => (<Frame label="4-point spacing scale in use" caption="Padding inside, gap between, margin outside — every value taken from the scale.">
      <div className="spc">
        <div className="sp-scale">{[4, 8, 12, 16, 24, 32, 48, 64].map(s => <div key={s}><i style={{ width: s, height: s }}/><code>{s}</code></div>)}</div>
        <div className="sp-box">
          <div className="sp-card"><span className="tag-pad">padding 16</span><b>Card title</b><span>Supporting text</span><span className="tag-gap">gap 8</span></div>
          <span className="tag-mar">gap 24</span>
          <div className="sp-card"><b>Card title</b><span>Supporting text</span></div>
        </div>
      </div>
    </Frame>),
    'flex-grid': () => {
        const [model, setModel] = useState('Flexbox');
        const [j, setJ] = useState('flex-start');
        const [wrap, setWrap] = useState(false);
        return (<Frame label="Layout models" controls={<><Seg label="Model" options={['Flexbox', 'Grid']} value={model} onChange={setModel}/>{model === 'Flexbox' && <><select className="dsel" value={j} onChange={e => setJ(e.target.value)} aria-label="justify-content">{['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map(v => <option key={v}>{v}</option>)}</select><label className="tg"><input type="checkbox" checked={wrap} onChange={e => setWrap(e.target.checked)}/>wrap</label></>}</>} caption={model === 'Flexbox' ? `display:flex; justify-content:${j}; flex-wrap:${wrap ? 'wrap' : 'nowrap'} — one axis.` : 'display:grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) — rows and columns together.'}>
        {model === 'Flexbox'
                ? <div className="fx" style={{ justifyContent: j, flexWrap: wrap ? 'wrap' : 'nowrap' }}>{['A', 'B', 'C', 'D', 'E', 'F'].slice(0, wrap ? 6 : 4).map((x, i) => <span key={x} style={{ width: wrap ? 140 : [70, 110, 60, 90][i] }}>{x}</span>)}</div>
                : <div className="gx">{['header', 'side', 'main', 'aside', 'footer'].map(a => <span key={a} style={{ gridArea: a }}>{a}</span>)}</div>}
      </Frame>);
    },
    'layout-patterns': () => {
        const [m, setM] = useState('Bento');
        const hs = [80, 140, 100, 160, 90, 120, 70, 150];
        return (<Frame label="Arrangements of repeated content" controls={<Seg label="Pattern" options={['Card grid', 'Bento', 'Masonry', 'Dashboard', 'Split pane']} value={m} onChange={setM}/>}>
        {m === 'Card grid' && <div className="lp cg">{Array.from({ length: 8 }, (_, i) => <Blk key={i}/>)}</div>}
        {m === 'Bento' && <div className="lp bento"><Blk c="b1">Feature</Blk><Blk c="b2"/><Blk c="b3"/><Blk c="b4"/><Blk c="b5"/></div>}
        {m === 'Masonry' && <div className="lp mas">{hs.map((h, i) => <Blk key={i} style={{ height: h }}/>)}</div>}
        {m === 'Dashboard' && <div className="lp dash"><Blk c="k"/><Blk c="k"/><Blk c="k"/><Blk c="k"/><Blk c="chart"/><Blk c="side"/><Blk c="tbl"/></div>}
        {m === 'Split pane' && <div className="lp split"><Blk c="list">{Array.from({ length: 5 }, (_, i) => <i key={i} className={i === 1 ? 'on' : ''}/>)}</Blk><span className="handle" aria-hidden="true"/><Blk c="detail"/></div>}
      </Frame>);
    },
    zindex: () => {
        const [ctx, setCtx] = useState(false);
        return (<Frame label="Stacking & z-index" controls={<label className="tg"><input type="checkbox" checked={ctx} onChange={e => setCtx(e.target.checked)}/>Parent creates a stacking context (opacity: .99)</label>} caption={ctx ? 'The tooltip has z-index 999 but is trapped inside its parent\'s stacking context (z-index 1), so the header (z-index 10) still covers it.' : 'The tooltip (z-index 999) rises above the sticky header (z-index 10).'}>
        <div className="zi">
          <div className="z-head">Sticky header · z 10</div>
          <div className="z-card" style={ctx ? { opacity: .99, zIndex: 1, position: 'relative' } : undefined}>Card {ctx ? '· z 1 (context)' : ''}<div className="z-tip">Tooltip · z 999</div></div>
          <div className="z-iso"><span>Isometric view</span>{['page', 'card', 'header', 'tooltip'].map((l, i) => <i key={l} style={{ transform: `translate(${i * 14}px, ${-i * 14}px)` }}>{l}</i>)}</div>
        </div>
      </Frame>);
    },
    breakpoints: () => {
        const [w, setW] = useState(1100);
        const bp = w < 600 ? 'small' : w < 1024 ? 'medium' : 'large';
        return (<Frame label="Breakpoints in action" controls={<Range label="Viewport" value={w} min={320} max={1440} step={10} onChange={setW} unit="px"/>} caption={`${w}px → ${bp} layout. ${bp === 'small' ? 'One column, navigation in a menu, cards stacked.' : bp === 'medium' ? 'Navigation rail, two-column cards.' : 'Sidebar, three-column cards, details panel.'}`}>
        <div className="bpv"><div className={'bp ' + bp} style={{ width: Math.min(100, (w / 1440) * 100) + '%' }}>
          <div className="bp-top">{bp === 'small' && <i className="burger"/>}<b /><span /></div>
          <div className="bp-body">{bp !== 'small' && <div className={'bp-nav ' + bp}/>}<div className="bp-main">{Array.from({ length: 6 }, (_, i) => <Blk key={i}/>)}</div>{bp === 'large' && <div className="bp-aside"/>}</div>
        </div></div>
        <div className="bp-ruler"><span style={{ left: (600 / 1440) * 100 + '%' }}>600</span><span style={{ left: (1024 / 1440) * 100 + '%' }}>1024</span></div>
      </Frame>);
    },
    /* Surfaces */
    borders: () => (<Frame label="Edges" caption="Outlines draw outside the box and do not shift layout — ideal for focus rings.">
      <div className="bords">{[['Default border', { border: '1px solid #323B4B' }], ['Hairline (subtle)', { border: '1px solid #1D2531' }], ['Active border', { border: '1px solid #2BA6FF', boxShadow: '0 0 0 3px rgba(43,166,255,.18)' }], ['Dashed (drop zone)', { border: '1.5px dashed #5A6678' }], ['Outline (focus)', { border: '1px solid #323B4B', outline: '2px solid #2BA6FF', outlineOffset: 3 }], ['Thick (brutalist)', { border: '3px solid #F9FAFC' }]].map(([n, s]) => <div key={n}><i style={s}/><span>{n}</span></div>)}</div>
      <div className="divs"><div><span>Full-bleed divider</span><hr /></div><div><span>Inset divider</span><hr style={{ marginLeft: 40 }}/></div><div className="vsep"><span>Bold</span><i /><span>Italic</span><i /><span>Link</span></div></div>
    </Frame>),
    elevation: () => {
        const [th, setTh] = useState('Dark');
        return (<Frame label="Elevation levels" controls={<Seg label="Theme" options={['Dark', 'Light']} value={th} onChange={setTh}/>} caption={th === 'Dark' ? 'Dark theme: higher surfaces get lighter; shadows play a supporting role.' : 'Light theme: shadows carry elevation; surfaces stay white.'}>
        <div className={'elev ' + th.toLowerCase()}>{['0 · Page', '1 · Card', '2 · Sticky', '3 · Menu', '4 · Dialog'].map((l, i) => <div key={l} className={'e' + i}><span>{l}</span></div>)}</div>
      </Frame>);
    },
    gradients: () => (<Frame label="Gradient types" caption="The scrim example: a transparent-to-dark linear gradient makes white text readable over a busy image.">
      <div className="grads">{[['Linear', 'linear-gradient(135deg, #1488FC, #14448C)'], ['Radial', 'radial-gradient(circle at 30% 30%, #7FBCF6, #1488FC 40%, #0B0D12 75%)'], ['Conic', 'conic-gradient(from 0deg, #2BA6FF, #8E4EC6, #E5484D, #F5B544, #2BA6FF)'], ['Mesh (layered radials)', 'radial-gradient(at 20% 20%, #2BA6FF 0, transparent 50%), radial-gradient(at 80% 30%, #8E4EC6 0, transparent 50%), radial-gradient(at 50% 90%, #3DD68C 0, transparent 50%), #10141C']].map(([n, g]) => <div key={n}><i style={{ background: g }}/><span>{n}</span></div>)}
        <div className="scrim-ex"><i className="busy"/><i className="sc"/><b>Text over image</b></div>
      </div>
    </Frame>),
    blur: () => {
        const [b, setB] = useState(12), [o, setO] = useState(35);
        return (<Frame label="Opacity, backdrop blur & scrim" controls={<><Range label="Backdrop blur" value={b} min={0} max={30} onChange={setB} unit="px"/><Range label="Fill opacity" value={o} min={0} max={100} onChange={setO} unit="%"/></>} caption="Contrast of text on translucent surfaces depends on whatever is behind them — test the worst case.">
        <div className="blurx"><div className="bg-shapes"><i /><i /><i /></div><div className="glass" style={{ backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, background: `rgba(23,27,36,${o / 100})` }}><b>Translucent panel</b><span>backdrop-filter: blur({b}px)</span></div></div>
      </Frame>);
    },
    'surface-styles': () => (<Frame label="Five surface treatments" caption="Same card, five materials. See each style in UI Visual Styles for its full treatment.">
      <div className="surf">{['Flat', 'Material', 'Skeuomorphic', 'Neumorphic', 'Glass'].map(n => <div key={n} className={'sf-' + n.toLowerCase()}><b>{n}</b><span>Button</span></div>)}</div>
    </Frame>),
    glow: () => (<Frame label="Glow, grain, texture & highlights">
      <div className="glowx">
        <div className="gw1"><span>Outer glow</span></div><div className="gw2"><span>Background glow</span></div><div className="gw3"><span>Grain / noise</span></div><div className="gw4"><span>Top-edge highlight</span></div>
      </div>
    </Frame>),
    'effects-judgement': () => (<Frame label="Effect with a job vs effect for its own sake">
      <GoodBad bad={<div className="fxj bad">{[0, 1, 2].map(i => <div key={i}><b>Plan {i + 1}</b><span>$12</span></div>)}</div>} good={<div className="fxj good">{[0, 1, 2].map(i => <div key={i} className={i === 1 ? 'pick' : ''}><b>Plan {i + 1}</b><span>$12</span>{i === 1 && <small>Recommended</small>}</div>)}</div>} badNote="Glow, gradient and shadow on every card: nothing stands out and text contrast suffers." goodNote="Flat cards; one restrained glow marks the recommended plan — the effect carries meaning."/>
    </Frame>),
});
