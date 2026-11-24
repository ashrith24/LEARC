/** One art-directed plate per subject — each drawn from the subject's own material. Decorative (aria-hidden). */
const B = '#2BA6FF', S = '#7FBCF6', D = '#14448C', L = '#323B4B', M = '#1E2430', T = '#B8C0CC';
const plates = {
    foundations: (<g>
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={40 + i * 30} y1="20" x2={40 + i * 30} y2="260" stroke={L} strokeWidth=".6"/>)}
    <rect x="40" y="50" width="200" height="34" rx="4" fill={T}/><rect x="40" y="96" width="140" height="10" rx="3" fill={L}/><rect x="40" y="114" width="170" height="10" rx="3" fill={L}/>
    <rect x="40" y="150" width="88" height="30" rx="8" fill={B}/><rect x="136" y="150" width="88" height="30" rx="8" fill="none" stroke={L}/>
    <circle cx="330" cy="200" r="46" fill="none" stroke={S} strokeDasharray="3 5"/><text x="290" y="270" fill={T} fontFamily="JetBrains Mono" fontSize="10">fig. hierarchy</text>
  </g>),
    color: (<g>
    {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <path key={i} d={`M300 140 L${300 + Math.cos(a) * 110} ${140 + Math.sin(a) * 110} A110 110 0 0 1 ${300 + Math.cos(a + Math.PI / 6) * 110} ${140 + Math.sin(a + Math.PI / 6) * 110} Z`} fill={`hsl(${i * 30} 80% 58%)`} opacity=".9"/>; })}
    <circle cx="300" cy="140" r="44" fill="#10141C"/>
    {[0, 1, 2, 3, 4, 5, 6].map(i => <rect key={i} x="30" y={30 + i * 32} width="120" height="26" rx="3" fill={`hsl(205 100% ${92 - i * 11}%)`}/>)}
  </g>),
    shapes: (<g fill="none" strokeWidth="1.5">
    <circle cx="110" cy="120" r="70" stroke={S}/><rect x="190" y="60" width="120" height="120" stroke={T}/><path d="M330 200 L390 80 L450 200Z" stroke={B}/>
    <rect x="60" y="210" width="200" height="40" rx="20" fill={B} stroke="none"/><path d="M300 240 C340 200 380 280 430 230" stroke={L}/>
    <polygon points="380,30 410,47 410,81 380,98 350,81 350,47" stroke={L}/>
  </g>),
    typography: (<g>
    <line x1="20" y1="200" x2="460" y2="200" stroke={B} strokeWidth=".8"/><line x1="20" y1="125" x2="460" y2="125" stroke={L} strokeDasharray="3 4"/><line x1="20" y1="70" x2="460" y2="70" stroke={L} strokeDasharray="3 4"/>
    <text x="30" y="200" fill="#F9FAFC" fontFamily="Schibsted Grotesk" fontWeight="800" fontSize="190" letterSpacing="-10">Ag</text>
    <text x="300" y="200" fill="none" stroke={S} fontFamily="Georgia, serif" fontSize="150">a</text>
    <text x="350" y="120" fill={T} fontFamily="JetBrains Mono" fontSize="10">x-height</text><text x="350" y="66" fill={T} fontFamily="JetBrains Mono" fontSize="10">cap height</text><text x="350" y="216" fill={B} fontFamily="JetBrains Mono" fontSize="10">baseline</text>
  </g>),
    icons: (<g fill="none" stroke={T} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {Array.from({ length: 24 }, (_, i) => <line key={'g' + i} x1={40 + i * 10} y1="30" x2={40 + i * 10} y2="270" stroke={M} strokeWidth="1"/>)}
    <circle cx="160" cy="150" r="80" stroke={L} strokeWidth="1"/><rect x="90" y="80" width="140" height="140" stroke={L} strokeWidth="1"/>
    <path d="M120 150l30 30 60-66" stroke={B} strokeWidth="10"/>
    <path d="M330 90a26 26 0 1 0 0 52 26 26 0 0 0 0-52Zm36 88-18-18"/><path d="M300 210h70M300 230h50" stroke={S}/>
  </g>),
    layout: (<g>
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={24 + i * 37} y="20" width="31" height="240" fill="rgba(43,166,255,.07)" stroke="rgba(43,166,255,.25)" strokeWidth=".6"/>)}
    <rect x="24" y="40" width="216" height="110" rx="6" fill={M} stroke={L}/><rect x="246" y="40" width="216" height="52" rx="6" fill={M} stroke={L}/><rect x="246" y="98" width="105" height="52" rx="6" fill={B} opacity=".8"/><rect x="357" y="98" width="105" height="52" rx="6" fill={M} stroke={L}/>
    <rect x="24" y="160" width="438" height="80" rx="6" fill={M} stroke={L}/>
  </g>),
    surfaces: (<g>
    <rect x="60" y="150" width="240" height="100" rx="14" fill="#10141C" stroke={L}/><rect x="100" y="110" width="240" height="100" rx="14" fill="#171B24" stroke={L}/><rect x="140" y="70" width="240" height="100" rx="14" fill="#1E2430" stroke="#3A4558"/>
    <rect x="180" y="30" width="240" height="100" rx="14" fill="url(#gl)" stroke="rgba(127,188,246,.6)"/>
    <defs><linearGradient id="gl" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="rgba(43,166,255,.45)"/><stop offset="1" stopColor="rgba(20,68,140,.2)"/></linearGradient></defs>
  </g>),
    elements: (<g>
    <rect x="40" y="50" width="130" height="44" rx="10" fill={B}/><text x="105" y="78" textAnchor="middle" fill="#031322" fontFamily="Inter" fontWeight="700" fontSize="14">Primary</text>
    <rect x="186" y="50" width="130" height="44" rx="10" fill="none" stroke={L}/><text x="251" y="78" textAnchor="middle" fill={T} fontFamily="Inter" fontWeight="600" fontSize="14">Secondary</text>
    <rect x="40" y="120" width="70" height="26" rx="13" fill="rgba(61,214,140,.18)"/><rect x="120" y="120" width="90" height="26" rx="13" fill="rgba(43,166,255,.18)"/><rect x="220" y="120" width="60" height="26" rx="13" fill="none" stroke={L}/>
    <circle cx="360" cy="80" r="30" fill={D}/><circle cx="390" cy="80" r="30" fill="#1E2430" stroke="#10141C" strokeWidth="4"/><circle cx="406" cy="56" r="9" fill="#FF6B6B"/>
    {[0, 1, 2, 3, 4].map(i => <path key={i} d="m0 -10 3 6.5 7 .8-5.2 4.7 1.4 7L0 5.3-6.2 9l1.4-7L-10 -2.7l7-.8Z" transform={`translate(${60 + i * 26} 200)`} fill={i < 4 ? '#F5B544' : L}/>)}
    <rect x="240" y="186" width="34" height="28" rx="5" fill={M} stroke={L}/><text x="257" y="205" textAnchor="middle" fill={T} fontFamily="JetBrains Mono" fontSize="12">⌘</text><rect x="280" y="186" width="34" height="28" rx="5" fill={M} stroke={L}/><text x="297" y="205" textAnchor="middle" fill={T} fontFamily="JetBrains Mono" fontSize="12">K</text>
  </g>),
    forms: (<g>
    <text x="40" y="52" fill={T} fontFamily="Inter" fontSize="12" fontWeight="600">Email address</text>
    <rect x="40" y="62" width="260" height="42" rx="8" fill="#0B0D12" stroke={B} strokeWidth="1.5"/><rect x="54" y="75" width="1.5" height="16" fill={B}/>
    <text x="40" y="136" fill={T} fontFamily="Inter" fontSize="12" fontWeight="600">Password</text>
    <rect x="40" y="146" width="260" height="42" rx="8" fill="#0B0D12" stroke="#FF6B6B"/><text x="40" y="206" fill="#FF8F8F" fontFamily="Inter" fontSize="11">Enter at least 12 characters</text>
    <rect x="340" y="62" width="20" height="20" rx="5" fill={B}/><path d="m344 72 4 4 8-8" stroke="#031322" strokeWidth="2" fill="none"/>
    <circle cx="350" cy="116" r="10" fill="none" stroke={B} strokeWidth="2"/><circle cx="350" cy="116" r="4.5" fill={B}/>
    <rect x="336" y="146" width="48" height="26" rx="13" fill={B}/><circle cx="371" cy="159" r="10" fill="#fff"/>
    <rect x="336" y="196" width="110" height="4" rx="2" fill={L}/><rect x="336" y="196" width="66" height="4" rx="2" fill={B}/><circle cx="402" cy="198" r="9" fill="#fff"/>
  </g>),
    content: (<g>
    {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={40 + i * 66} y={240 - [60, 110, 80, 150, 130, 190][i]} width="44" height={[60, 110, 80, 150, 130, 190][i]} rx="4" fill={i === 5 ? B : '#2A3344'}/>)}
    <line x1="30" y1="240" x2="440" y2="240" stroke={L}/>
    <path d="M40 120 C120 90 170 130 230 80 S 360 40 430 30" fill="none" stroke={S} strokeWidth="2"/>
  </g>),
    navigation: (<g>
    <rect x="30" y="30" width="420" height="40" rx="8" fill={M} stroke={L}/><rect x="44" y="44" width="40" height="12" rx="3" fill={T}/>
    {[0, 1, 2, 3].map(i => <rect key={i} x={170 + i * 62} y="46" width="44" height="8" rx="3" fill={i === 1 ? '#F9FAFC' : L}/>)}<rect x="232" y="64" width="44" height="2" fill={B}/>
    <rect x="30" y="84" width="110" height="176" rx="8" fill={M} stroke={L}/>{[0, 1, 2, 3, 4].map(i => <rect key={i} x="44" y={102 + i * 28} width={i === 2 ? 80 : 64} height="10" rx="3" fill={i === 2 ? B : L}/>)}
    <text x="160" y="110" fill={T} fontFamily="JetBrains Mono" fontSize="11">Home / UI / Navigation</text>
    {[0, 1, 2, 3].map(i => <g key={i}><circle cx={180 + i * 80} cy="190" r="13" fill={i < 2 ? B : 'none'} stroke={i < 2 ? B : L}/>{i < 3 && <line x1={193 + i * 80} y1="190" x2={247 + i * 80} y2="190" stroke={i < 1 ? B : L}/>}</g>)}
  </g>),
    feedback: (<g>
    <rect x="0" y="0" width="480" height="280" fill="rgba(3,5,9,.4)"/>
    <rect x="120" y="50" width="240" height="150" rx="14" fill="#171B24" stroke="#3A4558"/><rect x="140" y="72" width="120" height="14" rx="3" fill="#F9FAFC"/><rect x="140" y="98" width="190" height="8" rx="3" fill={L}/><rect x="140" y="114" width="160" height="8" rx="3" fill={L}/>
    <rect x="252" y="156" width="88" height="30" rx="8" fill={B}/><rect x="160" y="156" width="84" height="30" rx="8" fill="none" stroke={L}/>
    <rect x="270" y="224" width="190" height="40" rx="10" fill="#1E2430" stroke="rgba(61,214,140,.5)"/><circle cx="292" cy="244" r="7" fill="#3DD68C"/><rect x="306" y="240" width="120" height="8" rx="3" fill={T}/>
    <circle cx="70" cy="230" r="20" fill="none" stroke={L} strokeWidth="4"/><path d="M70 210 a20 20 0 0 1 20 20" fill="none" stroke={B} strokeWidth="4" strokeLinecap="round"/>
  </g>),
    landing: (<g>
    <rect x="30" y="20" width="420" height="240" rx="10" fill="#0B0D12" stroke={L}/>
    <rect x="50" y="36" width="380" height="10" rx="3" fill={M}/>
    <rect x="90" y="70" width="300" height="26" rx="4" fill="#F9FAFC"/><rect x="140" y="104" width="200" height="8" rx="3" fill={L}/><rect x="198" y="124" width="84" height="24" rx="12" fill={B}/>
    {[0, 1, 2, 3, 4].map(i => <rect key={i} x={70 + i * 72} y="168" width="50" height="10" rx="3" fill={L}/>)}
    {[0, 1, 2].map(i => <rect key={i} x={50 + i * 128} y="196" width="116" height="50" rx="6" fill={M}/>)}
  </g>),
    'app-patterns': (<g>
    <rect x="30" y="20" width="420" height="240" rx="10" fill="#0B0D12" stroke={L}/><rect x="30" y="20" width="70" height="240" rx="10" fill={M}/>
    {[0, 1, 2, 3].map(i => <rect key={i} x={116 + i * 82} y="40" width="72" height="44" rx="6" fill={M} stroke={L}/>)}<rect x="124" y="50" width="30" height="6" rx="2" fill={L}/><rect x="124" y="64" width="44" height="10" rx="2" fill={B}/>
    <path d="M116 190 C170 150 210 200 260 150 S 360 110 434 120" fill="none" stroke={S} strokeWidth="2"/><path d="M116 190 C170 150 210 200 260 150 S 360 110 434 120 V240 H116Z" fill="rgba(43,166,255,.12)"/>
  </g>),
    'page-layouts': (<g>
    {[0, 1, 2].map(i => <g key={i} transform={`translate(${36 + i * 146} ${30 + i * 14})`}><rect width="120" height="200" rx="8" fill="#10141C" stroke={L}/>{[0, 1, 2, 3, 4].map(j => <rect key={j} x="10" y={12 + j * 37} width="100" height={j === 0 ? 30 : 28} rx="4" fill={j === 0 && i === 1 ? B : M}/>)}</g>)}
  </g>),
    styles: (<g>
    <rect x="30" y="40" width="120" height="90" rx="20" fill="#E8ECF1"/><rect x="50" y="62" width="80" height="44" rx="14" fill="#E8ECF1" style={{ filter: 'drop-shadow(-4px -4px 6px #fff) drop-shadow(4px 4px 6px #a3b1c6)' }}/>
    <rect x="170" y="40" width="120" height="90" fill="#FFE14D" stroke="#000" strokeWidth="3"/><rect x="178" y="48" width="120" height="90" fill="none" stroke="#000" strokeWidth="3" opacity=".0"/>
    <rect x="310" y="40" width="140" height="90" rx="14" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.35)"/>
    <rect x="30" y="150" width="120" height="90" fill="#0B0D12" stroke="#ff2bd6"/><text x="40" y="200" fill="#22e3ff" fontFamily="JetBrains Mono" fontSize="12">SYS://ONLINE</text>
    <circle cx="210" cy="195" r="40" fill="#E63946"/><rect x="240" y="160" width="40" height="40" fill="#1D4ED8"/><path d="M250 240 L270 205 L290 240Z" fill="#FACC15"/>
    <text x="310" y="210" fill="#F9FAFC" fontFamily="Georgia, serif" fontSize="44" fontStyle="italic">Aa</text>
  </g>),
    'design-systems': (<g fontFamily="JetBrains Mono" fontSize="11">
    {['blue-500', 'action.primary', 'button.bg'].map((t, i) => <g key={t} transform={`translate(${30 + i * 150} 110)`}><rect width="130" height="56" rx="8" fill={M} stroke={i === 2 ? B : L}/><text x="12" y="24" fill={T}>{['primitive', 'semantic', 'component'][i]}</text><text x="12" y="42" fill="#F9FAFC">{t}</text></g>)}
    <path d="M160 138h20M310 138h20" stroke={B} strokeWidth="1.5"/>
    <rect x="30" y="40" width="40" height="40" rx="6" fill={B}/><rect x="76" y="40" width="40" height="40" rx="6" fill={S}/><rect x="122" y="40" width="40" height="40" rx="6" fill={D}/>
    <rect x="30" y="200" width="420" height="40" rx="8" fill="none" stroke={L} strokeDasharray="4 4"/><text x="44" y="224" fill={T}>v2.4.0 · changelog · deprecations</text>
  </g>),
    motion: (<g>
    <line x1="40" y1="230" x2="440" y2="230" stroke={L}/><line x1="40" y1="230" x2="40" y2="40" stroke={L}/>
    <path d="M40 230 C 160 230, 180 40, 440 40" fill="none" stroke={B} strokeWidth="2.5"/>
    {[0, 1, 2, 3, 4, 5, 6].map(i => <circle key={i} cx={60 + i * 60} cy="100" r="10" fill={B} opacity={0.15 + i * 0.13}/>)}
    <text x="48" y="260" fill={T} fontFamily="JetBrains Mono" fontSize="10">cubic-bezier(.2,.8,.2,1)</text>
  </g>),
    'responsive-a11y': (<g>
    <rect x="30" y="40" width="250" height="170" rx="10" fill="#10141C" stroke={L}/><rect x="300" y="60" width="100" height="150" rx="10" fill="#10141C" stroke={L}/><rect x="416" y="100" width="44" height="110" rx="10" fill="#10141C" stroke={L}/>
    <rect x="50" y="62" width="120" height="14" rx="3" fill="#F9FAFC"/><rect x="50" y="160" width="90" height="34" rx="8" fill={B}/><rect x="46" y="156" width="98" height="42" rx="11" fill="none" stroke={S} strokeWidth="2"/>
    <text x="150" y="182" fill={T} fontFamily="JetBrains Mono" fontSize="10">focus 2px · 3:1</text>
    <text x="300" y="250" fill={T} fontFamily="JetBrains Mono" fontSize="10">4.5:1  ·  24×24  ·  320px</text>
  </g>),
};
export function CategoryArt({ id }) {
    return (<div className="cat-art" aria-hidden="true">
      <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid meet">{plates[id]}</svg>
    </div>);
}
