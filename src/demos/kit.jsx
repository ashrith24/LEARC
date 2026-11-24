import { useEffect, useState } from 'react';
/** Standard demo frame: consistent scale, toolbar and caption across every visual (scope §17 "preview system"). */
export function Frame({ label, controls, caption, children, pad = true, className = '' }) {
    return (<figure className={'demo ' + className} style={{ margin: 0 }}>
      <div className="demo-bar"><span className="label">{label}</span>{controls}</div>
      <div className={pad ? 'demo-stage' : ''}>{children}</div>
      {caption && <figcaption className="demo-cap">{caption}</figcaption>}
    </figure>);
}
export function Seg({ options, value, onChange, label }) {
    return (<div className="seg" role="group" aria-label={label}>
      {options.map(o => <button key={o} type="button" aria-pressed={o === value} onClick={() => onChange(o)}>{o}</button>)}
    </div>);
}
export function Range({ label, value, min, max, step = 1, onChange, unit = '' }) {
    return (<label className="rng">
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}/>
      <output>{value}{unit}</output>
    </label>);
}
export const Ann = ({ children, style }) => <span className="ann" style={style}>{children}</span>;
/** Good / poor pair with labels that do not rely on color. */
export function GoodBad({ good, bad, goodNote, badNote }) {
    return (<div className="gb">
      <div className="gb-col bad"><div className="gb-tag">✕ Poor</div><div className="gb-box">{bad}</div><p>{badNote}</p></div>
      <div className="gb-col good"><div className="gb-tag">✓ Better</div><div className="gb-box">{good}</div><p>{goodNote}</p></div>
    </div>);
}
export function useTick(ms, on = true) {
    const [t, setT] = useState(0);
    useEffect(() => { if (!on)
        return; const i = setInterval(() => setT(x => x + 1), ms); return () => clearInterval(i); }, [ms, on]);
    return t;
}
export const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Color math */
export const hexToRgb = (h) => { const n = parseInt(h.replace('#', '').padEnd(6, '0').slice(0, 6), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
export const lum = (h) => { const [r, g, b] = hexToRgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
export const hsl = (h, s, l) => `hsl(${h} ${s}% ${l}%)`;
export const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
};
