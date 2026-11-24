import { useState } from 'react';
import { register } from './registry';
import { Frame, Seg } from './kit';
function Fill({ k }) {
    const L = (w, h = 6, c = '') => <i className={'wl ' + c} style={{ width: typeof w === 'number' ? w + '%' : w, height: h }}/>;
    switch (k) {
        case 'nav': return <div className="wf-nav"><b />{[0, 1, 2, 3].map(i => <i key={i}/>)}<span className="wbtn"/></div>;
        case 'bar': return <div className="wf-nav slim"><i style={{ width: '40%' }}/></div>;
        case 'h': return <div className="wf-stack">{L(70, 14, 'hd')}{L(50, 6)}</div>;
        case 'hc': return <div className="wf-stack c">{L(60, 16, 'hd')}{L(44)}{L(36)}<div className="wf-btns"><span className="wbtn"/><span className="wbtn ghost"/></div></div>;
        case 'hl': return <div className="wf-stack">{L('30%', 5, 'acc')}{L(80, 16, 'hd')}{L(70, 16, 'hd')}{L(60)}{L(50)}<div className="wf-btns"><span className="wbtn"/><span className="wbtn ghost"/></div></div>;
        case 'big': return <div className="wf-stack">{L(95, 28, 'hd')}{L(80, 28, 'hd')}{L(40)}</div>;
        case 't': return <div className="wf-stack">{L(90)}{L(95)}{L(70)}</div>;
        case 'img': return <div className="wf-img"/>;
        case 'video': return <div className="wf-img vid"><span>▶</span></div>;
        case 'shot': return <div className="wf-shot"><div><i /><i /><i /></div><div><b /><b /><b /></div></div>;
        case 'btn': return <div className="wf-btns"><span className="wbtn"/></div>;
        case 'card': return <div className="wf-card"><div className="wf-img sm"/>{L(70, 7, 'hd')}{L(90)}{L(60)}</div>;
        case 'feat': return <div className="wf-card plain"><span className="wf-ic"/>{L(60, 7, 'hd')}{L(90)}{L(70)}</div>;
        case 'kpi': return <div className="wf-card plain">{L(40, 5)}{L(60, 14, 'hd')}{L(30, 5, 'acc')}</div>;
        case 'chart': return <div className="wf-chart"><svg viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 34 C15 30 25 20 40 24 S65 8 80 12 S95 6 100 4 V40 H0Z" fill="rgba(43,166,255,.18)"/><path d="M0 34 C15 30 25 20 40 24 S65 8 80 12 S95 6 100 4" fill="none" stroke="#2BA6FF" strokeWidth="1" vectorEffect="non-scaling-stroke"/></svg></div>;
        case 'table': return <div className="wf-table">{[0, 1, 2, 3, 4].map(i => <div key={i} className={i === 0 ? 'th' : ''}><i /><i /><i /><i /></div>)}</div>;
        case 'input': return <div className="wf-stack">{[0, 1, 2].map(i => <div key={i} className="wf-in">{L(30, 5)}<span /></div>)}<span className="wbtn wide"/></div>;
        case 'logo': return <div className="wf-logos">{[0, 1, 2, 3, 4, 5].map(i => <i key={i}/>)}</div>;
        case 'side': return <div className="wf-side">{[0, 1, 2, 3, 4, 5].map(i => <i key={i} className={i === 1 ? 'on' : ''}/>)}</div>;
        case 'list': return <div className="wf-list">{[0, 1, 2, 3].map(i => <div key={i} className={i === 1 ? 'on' : ''}><span />{L(60)}</div>)}</div>;
        case 'quote': return <div className="wf-card plain"><span className="wf-q">“</span>{L(90)}{L(80)}<div className="wf-who"><span />{L(40, 5)}</div></div>;
        case 'price': return <div className="wf-card plain">{L(40, 6)}{L(50, 16, 'hd')}{L(80, 4)}{L(70, 4)}{L(75, 4)}<span className="wbtn wide"/></div>;
        case 'price-rec': return <div className="wf-card plain rec">{L(40, 6, 'acc')}{L(50, 16, 'hd')}{L(80, 4)}{L(70, 4)}{L(75, 4)}<span className="wbtn wide"/></div>;
        case 'faq': return <div className="wf-faq">{[0, 1, 2, 3].map(i => <div key={i}>{L(i ? 60 : 70, 6)}<b>{i === 0 ? '−' : '+'}</b>{i === 0 && L(90, 4)}</div>)}</div>;
        case 'cal': return <div className="wf-cal">{Array.from({ length: 35 }, (_, i) => <i key={i} className={[9, 10, 17, 23].includes(i) ? 'ev' : ''}/>)}</div>;
        case 'chat': return <div className="wf-chat">{[0, 1, 2, 3].map(i => <i key={i} className={i % 2 ? 'me' : ''} style={{ width: [60, 45, 70, 40][i] + '%' }}/>)}<div className="wf-in"><span /></div></div>;
        case 'steps': return <div className="wf-steps">{[0, 1, 2, 3].map(i => <i key={i} className={i < 2 ? 'on' : ''}/>)}</div>;
        case 'code': return <div className="wf-code">{[60, 80, 40, 70, 50].map((w, i) => <i key={i} style={{ width: w + '%', marginLeft: i % 2 ? 12 : 0 }}/>)}</div>;
        case 'toc': return <div className="wf-side toc">{[0, 1, 2, 3, 4].map(i => <i key={i} className={i === 2 ? 'on' : ''}/>)}</div>;
        case 'filters': return <div className="wf-filt">{[0, 1, 2, 3].map(i => <span key={i} className={i === 0 ? 'on' : ''}/>)}<i /></div>;
        case 'empty': return <div className="wf-stack c"><span className="wf-ic big"/>{L(40, 10, 'hd')}{L(55)}<div className="wf-btns"><span className="wbtn"/></div></div>;
        case 'e404': return <div className="wf-stack c"><b className="wf-404">404</b>{L(40, 10, 'hd')}{L(55)}<div className="wf-btns"><span className="wbtn"/><span className="wbtn ghost"/></div></div>;
        case 'av': return <div className="wf-stack c"><span className="wf-av"/>{L(50, 8, 'hd')}{L(40)}</div>;
        case 'grid': return <div className="wf-grid">{Array.from({ length: 6 }, (_, i) => <div key={i} className="wf-card"><div className="wf-img sm"/>{L(70, 5)}{L(40, 5, 'acc')}</div>)}</div>;
        case 'foot': return <div className="wf-foot">{[0, 1, 2, 3].map(i => <div key={i}>{L(50, 6, 'hd')}{L(70, 4)}{L(60, 4)}{L(65, 4)}</div>)}</div>;
        case 'files': return <div className="wf-grid files">{Array.from({ length: 8 }, (_, i) => <div key={i}><span className={'fi ' + (i < 3 ? 'folder' : '')}/>{L(70, 4)}</div>)}</div>;
        case 'matrix': return <div className="wf-matrix">{Array.from({ length: 20 }, (_, i) => <i key={i} className={i % 5 === 0 ? 'h' : (i * 7) % 3 ? 'on' : ''}/>)}</div>;
        case 'checklist': return <div className="wf-list check">{[0, 1, 2, 3].map(i => <div key={i} className={i < 2 ? 'done' : ''}><span />{L(60)}</div>)}</div>;
        case 'summary': return <div className="wf-card plain">{L(50, 7, 'hd')}{[0, 1, 2].map(i => <div key={i} className="wf-sumrow">{L(40, 5)}{L(20, 5)}</div>)}<div className="wf-sumrow tot">{L(30, 7, 'hd')}{L(25, 7, 'hd')}</div><span className="wbtn wide"/></div>;
        case 'process': return <div className="wf-proc">{[1, 2, 3].map(i => <div key={i}><b>{i}</b><i /><i /></div>)}</div>;
        case 'team': return <div className="wf-team">{[0, 1, 2, 3].map(i => <div key={i}><span className="wf-av"/><i /><i /></div>)}</div>;
        case 'gallery': return <div className="wf-gal"><div className="wf-img"/><div>{[0, 1, 2, 3].map(i => <span key={i} className={'wf-img xs' + (i === 0 ? ' on' : '')}/>)}</div></div>;
        case 'buy': return <div className="wf-stack">{L(40, 5, 'acc')}{L(80, 14, 'hd')}{L(30, 12, 'hd')}<div className="wf-opts">{[0, 1, 2].map(i => <span key={i} className={i === 1 ? 'on' : ''}/>)}</div><span className="wbtn wide"/>{L(90)}{L(80)}</div>;
        case 'banner': return <div className="wf-banner">{L(50, 5)}<b>×</b></div>;
        case 'meta': return <div className="wf-meta"><span className="wf-av sm"/>{L(30, 5)}{L(20, 5)}</div>;
        case 'x': return null;
        default: return <div className="wf-stack">{L(80)}</div>;
    }
}
function Wire({ rows, mobile }) {
    return (<div className={'wf' + (mobile ? ' mob' : '')}>
      {rows.map(([h, cells, sec], i) => {
            const vis = mobile ? cells.filter(c => !(c[2] || '').includes('(desktop)') && c[1] !== 'x') : cells;
            return (<div key={i} className="wf-row" style={{ minHeight: mobile ? undefined : h }} data-sec={sec}>
            {sec && <span className="wf-sec">{sec}</span>}
            {vis.map(([span, k, note], j) => <div key={j} className={'wf-cell k-' + k} style={{ gridColumn: mobile ? '1 / -1' : `span ${span}`, minHeight: mobile ? Math.max(36, h * (span === 12 ? .9 : .7)) : undefined }}>{note && note.replace(' (desktop)', '').trim() && <span className="wf-note">{note.replace(' (desktop)', '')}</span>}<Fill k={k}/></div>)}
          </div>);
        })}
    </div>);
}
const NAV = [44, [[12, 'nav']]];
const SHELL = (main) => [[40, [[12, 'bar', 'Top bar · search · account']]], ...main.map(([h, c, s], ri) => {
        const tot = c.reduce((a, x) => a + x[0], 0);
        let used = 0;
        const cc = c.map(([sp, k, n], i) => { const v = i === c.length - 1 ? 10 - used : Math.max(1, Math.round(sp * 10 / tot)); used += v; return [v, k, n]; });
        return [h, [[2, 'side', ri === 0 ? 'Sidebar (desktop)' : ' (desktop)'], ...cc], s];
    })];
const HEROES = {
    Centered: [[150, [[12, 'hc']]]], Split: [[150, [[6, 'hl'], [6, 'img']]]], 'Image-led': [[160, [[12, 'img', 'Full-bleed photo + scrim']]]], 'Video-led': [[160, [[12, 'video', 'Background video (pausable)']]]],
    'Product screenshot': [[60, [[12, 'hc']]], [100, [[1, 'x'], [10, 'shot'], [1, 'x']]]], 'Dashboard preview': [[140, [[5, 'hl'], [7, 'chart', 'Framed product UI']]]], 'Typography-led': [[150, [[12, 'big']]]],
    Gradient: [[150, [[12, 'hc', 'Gradient field']]]], 'Full-screen': [[190, [[12, 'hc', '100vh']]]], Minimal: [[110, [[12, 'hc']]]], Asymmetric: [[150, [[8, 'hl'], [4, 'img']]]], 'Floating-card': [[150, [[3, 'kpi'], [6, 'hc'], [3, 'card']]]], Editorial: [[150, [[7, 'big'], [5, 't', 'Pull quote / image caption']]]],
};
const W = {
    'wf-headers': [[22, [[12, 'banner', 'Announcement bar (dismissible)']]], [44, [[12, 'nav', 'Logo · links · one CTA']]], [80, [[12, 'hc']]]],
    'wf-logos': [[60, [[12, 'h']]], [50, [[12, 'logo', 'Greyscale logos, equal visual weight']]], [50, [[3, 'kpi', 'Rating'], [3, 'kpi', 'Certification'], [3, 'kpi'], [3, 'kpi']], 'Trust bar']],
    'wf-features': { Grid: [[50, [[12, 'h']]], [100, [[4, 'feat'], [4, 'feat'], [4, 'feat']]], [100, [[4, 'feat'], [4, 'feat'], [4, 'feat']]]], Bento: [[50, [[12, 'h']]], [110, [[7, 'card', 'Hero feature'], [5, 'feat']]], [100, [[4, 'feat'], [4, 'feat'], [4, 'card']]]], Alternating: [[110, [[6, 'img'], [6, 't', 'Text right']], 'Row 1'], [110, [[6, 't', 'Text left'], [6, 'img']], 'Row 2'], [110, [[6, 'img'], [6, 't']], 'Row 3']], Walkthrough: [[40, [[12, 'steps', 'Steps / tabs']]], [140, [[4, 't'], [8, 'shot']]]] },
    'wf-proof': [[50, [[12, 'h']]], [50, [[3, 'kpi', '10k teams'], [3, 'kpi'], [3, 'kpi'], [3, 'kpi']], 'Metrics bar'], [120, [[4, 'quote', 'Named, attributed'], [4, 'quote'], [4, 'quote']], 'Testimonials'], [90, [[6, 'card', 'Case study'], [6, 'card', 'Customer story']]]],
    'wf-pricing': [[50, [[12, 'h', 'Monthly / Annual toggle']]], [170, [[4, 'price'], [4, 'price-rec', 'Recommended'], [4, 'price']]], [120, [[12, 'table', 'Detailed comparison table']]]],
    'wf-faq': [[160, [[4, 'h', 'Heading + contact link'], [8, 'faq', 'Accordion']]]],
    'wf-cta': [[100, [[12, 'hc', 'CTA band']]], [80, [[6, 'h'], [6, 'input', 'Email + privacy note']], 'Newsletter']],
    'wf-process': [[100, [[12, 'process', 'How it works · 3 steps']]], [100, [[12, 'team', 'Team']]], [60, [[12, 'logo', 'Integrations']]]],
    'wf-footer': [[60, [[6, 'h', 'Newsletter'], [6, 'input']]], [120, [[3, 't', 'Brand + contact'], [9, 'foot', 'Link columns']]], [30, [[12, 'bar', 'Legal · copyright · social']]]],
    'wf-rhythm': [NAV, [130, [[6, 'hl'], [6, 'img']], '1 Hero'], [40, [[12, 'logo']], '2 Proof'], [100, [[4, 'feat'], [4, 'feat'], [4, 'feat']], '3 Features'], [110, [[6, 'img'], [6, 't']], '4 Walkthrough'], [100, [[4, 'quote'], [4, 'quote'], [4, 'quote']], '5 Testimonials'], [140, [[4, 'price'], [4, 'price-rec'], [4, 'price']], '6 Pricing'], [100, [[12, 'faq']], '7 FAQ'], [80, [[12, 'hc']], '8 CTA'], [80, [[12, 'foot']], '9 Footer']],
    'wf-dashboard': SHELL([[46, [[12, 'h', 'Page header · date range · actions']]], [70, [[3, 'kpi'], [3, 'kpi'], [3, 'kpi'], [3, 'kpi']], 'KPI row'], [140, [[8, 'chart', 'Primary trend'], [4, 'list', 'Alerts / activity']]], [110, [[12, 'table', 'Detail table']]]]),
    'wf-filters': SHELL([[40, [[12, 'filters', 'Search · filter chips · sort · saved view']]], [30, [[12, 'bar', '3 selected · bulk actions']]], [150, [[12, 'table']]]]),
    'wf-files': SHELL([[40, [[12, 'filters', 'Breadcrumb path · view toggle · upload']]], [150, [[9, 'files'], [3, 'card', 'Preview pane (desktop)']]]]),
    'wf-master-detail': SHELL([[220, [[4, 'list', 'Master list'], [8, 't', 'Detail view · edit · delete with undo']]]]),
    'wf-settings': SHELL([[220, [[3, 'toc', 'Settings categories'], [9, 'input', 'Profile · notifications · security · danger zone']]]]),
    'wf-users': SHELL([[46, [[9, 'h'], [3, 'btn', 'Invite']]], [120, [[12, 'table', 'Members · role · status']]], [80, [[12, 'matrix', 'Role permission matrix']]]]),
    'wf-auth': [[40, [[12, 'bar']]], [260, [[3, 'x'], [6, 'input', 'Centered card: SSO · divider · fields · links'], [3, 'x']]]],
    'wf-onboarding': [[40, [[12, 'steps', 'Progress']]], [200, [[2, 'x'], [8, 'checklist', 'Setup checklist · skip for now'], [2, 'x']]]],
    'wf-checkout': [[40, [[12, 'steps', 'Contact · Delivery · Payment']]], [230, [[7, 'input', 'Form steps'], [5, 'summary', 'Order summary · total incl. tax']]]],
    'wf-calendar': SHELL([[40, [[12, 'filters', 'Today · ‹ › · Day / Week / Month']]], [200, [[12, 'cal']]]]),
    'wf-inbox': SHELL([[230, [[4, 'list', 'Conversations'], [8, 'chat', 'Thread + composer']]]]),
};
const PAGES = {
    'page-saas': W['wf-rhythm'],
    'page-portfolio': [NAV, [130, [[8, 'big', 'Statement'], [4, 't']]], [180, [[6, 'card', 'Project'], [6, 'card', 'Project']], 'Selected work'], [140, [[4, 'card'], [4, 'card'], [4, 'card']]], [90, [[12, 'process', 'Services / process']]], [80, [[12, 'hc', 'Contact']]]],
    'page-ecommerce': {
        Storefront: [NAV, [140, [[12, 'hc', 'Promo hero']]], [90, [[3, 'card', 'Category'], [3, 'card'], [3, 'card'], [3, 'card']]], [150, [[12, 'grid', 'Featured products']]]],
        'Category listing': [NAV, [40, [[12, 'h', 'Breadcrumbs · title · count']]], [260, [[3, 'toc', 'Filters (desktop)'], [9, 'grid', 'Sort · product grid · pagination']]]],
        'Product detail': [NAV, [260, [[7, 'gallery', 'Gallery'], [5, 'buy', 'Title · price · options · add to cart']]], [100, [[8, 't', 'Details & reviews'], [4, 'list', 'Related']]]],
        Checkout: W['wf-checkout'],
    },
    'page-article': [NAV, [100, [[2, 'x'], [8, 'h', 'Title · lead'], [2, 'x']]], [30, [[2, 'x'], [8, 'meta', 'Author · date · read time'], [2, 'x']]], [160, [[2, 'x'], [8, 'img'], [2, 'x']]], [200, [[2, 'toc', 'TOC (desktop)'], [8, 't', 'Body · 60–75ch measure'], [2, 'x']]], [100, [[4, 'card', 'Related'], [4, 'card'], [4, 'card']]]],
    'page-docs': [[40, [[12, 'nav', 'Header + search']]], [300, [[3, 'side', 'Nav tree (drawer on mobile)'], [7, 't', 'Breadcrumbs · article · code · prev/next'], [2, 'toc', 'On this page (desktop)']]]],
    'page-company': {
        Pricing: W['wf-pricing'],
        Contact: [NAV, [200, [[6, 'input', 'Contact form'], [6, 'list', 'Email · phone · address as text']]]],
        About: [NAV, [120, [[12, 'big', 'Mission']]], [120, [[6, 'img'], [6, 't', 'Story']]], [100, [[12, 'team']]]],
        Careers: [NAV, [100, [[12, 'hc', 'Culture']]], [40, [[12, 'filters', 'Team · location']]], [150, [[12, 'list', 'Open roles']]]],
    },
    'page-auth': { 'Centred card': W['wf-auth'], 'Split layout': [[300, [[6, 'img', 'Brand panel (desktop)'], [6, 'input', 'Sign-in form']]]] },
    'page-dashboard': W['wf-dashboard'],
    'page-search': [NAV, [40, [[12, 'filters', 'Query · result count · sort']]], [240, [[3, 'toc', 'Facets (sheet on mobile)'], [9, 'list', 'Results grouped by type · highlights']]]],
    'page-onboarding': W['wf-onboarding'],
    'page-errors': { '404 Not found': [NAV, [240, [[12, 'e404', 'Plain heading · search · home link']]]], '500 Problem': [NAV, [220, [[12, 'empty', 'What happened · try later · contact']]]], Offline: [NAV, [40, [[12, 'banner', 'Offline · showing saved data']]], [180, [[12, 'list']]]], Maintenance: [[260, [[12, 'empty', 'Back by 03:00 UTC · status link']]]], 'Access denied': [NAV, [220, [[12, 'empty', 'Request access']]]], Empty: SHELL([[220, [[12, 'empty', 'First-use empty state']]]]) },
};
function WireDemo({ spec, label }) {
    const multi = !Array.isArray(spec);
    const keys = multi ? Object.keys(spec) : [];
    const [k, setK] = useState(keys[0] || '');
    const [dev, setDev] = useState('Desktop');
    const rows = multi ? spec[k] : spec;
    return (<Frame label={label} controls={<span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{multi && <Seg label="Variant" options={keys} value={k} onChange={setK}/>}<Seg label="Device" options={['Desktop', 'Mobile']} value={dev} onChange={setDev}/></span>} caption="Schematic wireframe — grey blocks are placeholders by design. Mono labels name each region; switch to Mobile to see how regions stack.">
      <div className={'wf-device ' + dev.toLowerCase()}><Wire rows={rows} mobile={dev === 'Mobile'}/></div>
    </Frame>);
}
register({
    heroes: () => {
        const [k, setK] = useState('Split');
        return (<Frame label="13 hero variants" controls={<select className="dsel" value={k} onChange={e => setK(e.target.value)} aria-label="Hero variant">{Object.keys(HEROES).map(x => <option key={x}>{x}</option>)}</select>} caption="Schematic wireframes. Pick a variant to enlarge it; the grid below shows all thirteen side by side.">
        <div className="wf-device desktop"><Wire rows={[NAV, ...HEROES[k]]}/></div>
        <div className="hero-grid-mini">{Object.entries(HEROES).map(([n, r]) => <button key={n} className={n === k ? 'on' : ''} onClick={() => setK(n)} aria-pressed={n === k}><div className="wf tiny"><Wire rows={r}/></div><span>{n}</span></button>)}</div>
      </Frame>);
    },
    ...Object.fromEntries(Object.entries({ ...W, ...PAGES }).map(([id, spec]) => [id, () => <WireDemo spec={spec} label={id.startsWith('page-') ? 'Page wireframe · desktop & mobile' : 'Section wireframe'}/>])),
});
