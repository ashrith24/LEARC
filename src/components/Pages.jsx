import { useEffect, useMemo, useState } from 'react';
import { categories, catById, topics, order, topicsIn, comparisons, glossary, paths, DOMAINS, TYPES, LEVELS } from '../content';
import { href } from '../router';
import { Icon } from './Icon';
import { Crumbs, useReveal } from './Chrome';
import { CategoryArt } from './CategoryArt';
import { useScrollSpy, Toc, MobileToc } from './TopicPage';
import { getDemo } from '../demos/registry';
export { DesignTrends } from './DesignTrendsPage';
const lvlColor = (l) => l === 'Beginner' ? 'var(--ok)' : l === 'Intermediate' ? 'var(--warn)' : 'var(--err)';
const Lvl = ({ l }) => <span className="chip"><span className="dot" style={{ color: lvlColor(l) }}/>{l}</span>;
const title = (s) => { document.title = `Learc — ${s}`; };
/* ───────── Filtered catalogue (used by UI index and category pages) ───────── */
export function Catalogue({ cat, heading = 'All lessons' }) {
    const [q, setQ] = useState('');
    const [c, setC] = useState(cat || '');
    const [lv, setLv] = useState('');
    const [ty, setTy] = useState('');
    const [ver, setVer] = useState(false);
    const list = useMemo(() => order.map(id => topics[id]).filter(t => (!c || t.category === c) && (!lv || t.level === lv) && (!ty || t.type === ty) && (!ver || t.verification === 'Verified examples') &&
        (!q || (t.title + ' ' + (t.aliases || []).join(' ') + ' ' + t.summary + ' ' + (t.tags || []).join(' ')).toLowerCase().includes(q.toLowerCase()))), [q, c, lv, ty, ver]);
    const reset = () => { setQ(''); setC(cat || ''); setLv(''); setTy(''); setVer(false); };
    return (<section aria-labelledby="cat-h">
      <h2 id="cat-h" style={{ fontSize: 26, marginBottom: 14 }}>{heading}</h2>
      <div className="filters" role="search">
        <div className="field"><Icon n="search"/><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search lessons by name, alias or tag" aria-label="Search lessons"/></div>
        {!cat && <select value={c} onChange={e => setC(e.target.value)} aria-label="Topic"><option value="">All topics</option>{categories.map(x => <option key={x.id} value={x.id}>{x.num} {x.short}</option>)}</select>}
        <select value={lv} onChange={e => setLv(e.target.value)} aria-label="Difficulty"><option value="">All levels</option>{LEVELS.map(x => <option key={x}>{x}</option>)}</select>
        <select value={ty} onChange={e => setTy(e.target.value)} aria-label="Topic type"><option value="">All types</option>{TYPES.map(x => <option key={x}>{x}</option>)}</select>
        <label className="check"><input type="checkbox" checked={ver} onChange={e => setVer(e.target.checked)}/>Has verified examples</label>
      </div>
      <p className="count" aria-live="polite">{list.length} {list.length === 1 ? 'lesson' : 'lessons'}</p>
      {list.length ? (<ul className="tlist">
          {list.map(t => <li key={t.id}><a href={href.topic(t.id)}>
            <span className="n">{catById[t.category].num}</span><b>{t.title}</b><span className="s">{t.summary}</span><span className="m">{t.type}<br />{t.level}</span>
          </a></li>)}
        </ul>) : <div className="empty"><p><b>No lessons match these filters.</b></p><button className="btn btn-sm" onClick={reset}>Clear filters</button></div>}
    </section>);
}
/* ───────── UI Encyclopedia index ───────── */
export function UIIndex() {
    useEffect(() => title('UI Encyclopedia — categories and topics'), []);
    useReveal('ui');
    return (<div className="wrap">
      <Crumbs items={[['Home', href.home], ['UI Encyclopedia']]}/>
      <header className="page-head">
        <span className="label">Volume 1 · {order.length} lessons · 19 topics · 4 categories</span>
        <h1>Categories, topics, sections and lessons</h1>
        <p>Move from a broad category to a topic, browse its sections, then open a lesson. Every lesson links to related ideas and comparisons.</p>
      </header>
      <div className="domains reveal">
        {DOMAINS.map(d => (<div className="domain" key={d}>
            <h2>{d}</h2>
            <ol>{categories.filter(c => c.domain === d).map(c => <li key={c.id}><a href={href.cat(c.id)}><span className="n">{c.num}</span><span><b>{c.title}</b><small>{topicsIn(c.id).length} lessons · {c.groups.length} sections</small></span></a></li>)}</ol>
          </div>))}
      </div>
      <div className="reveal"><Catalogue /></div>
    </div>);
}
export function CategoryPage({ id }) {
    const c = catById[id];
    const ts = topicsIn(id);
    useEffect(() => title(`${c.title} — UI Encyclopedia`), [id]);
    useReveal(id);
    const route = [...ts].sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level));
    const idx = categories.indexOf(c);
    const prev = categories[idx - 1], next = categories[idx + 1];
    return (<div className="wrap">
      <Crumbs items={[['Home', href.home], ['UI Encyclopedia', href.ui], [c.num + ' ' + c.short]]}/>
      <header className="cat-hero">
        <div>
          <span className="big-n" aria-hidden="true">{c.num}</span>
          <span className="label" style={{ display: 'block', marginBottom: 10 }}>{c.domain} · {ts.length} lessons</span>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
          {c.prereq?.length ? <p style={{ fontSize: 14, color: 'var(--tx-3)' }}>Prerequisites: {c.prereq.map((p, i) => <span key={p}>{i ? ', ' : ''}<a href={href.topic(p)}>{topics[p].title}</a></span>)}</p> : null}
        </div>
        <CategoryArt id={id}/>
      </header>
      <h2 className="sr-only">Learning outcomes</h2>
      <ol className="outcomes reveal">{c.outcomes.map((o, i) => <li key={i}>{o}</li>)}</ol>
      <section className="reveal" aria-labelledby="route-h">
        <h2 id="route-h" style={{ fontSize: 22, marginBottom: 12 }}>Route: beginner → advanced</h2>
        <div className="route-line" tabIndex={0} aria-label="Topics ordered by difficulty">
          {route.map((t, i) => <a key={t.id} href={href.topic(t.id)}><span className="label">{String(i + 1).padStart(2, '0')} · {t.level}</span>{t.title}</a>)}
        </div>
      </section>
      {c.groups.map((g, gi) => (<section className="grp-block reveal" key={g.title} aria-labelledby={'g' + gi}>
          <h2 id={'g' + gi}>{g.title} <small>{g.topics.length} {g.topics.length === 1 ? 'lesson' : 'lessons'}</small></h2>
          <div className="tcards">
            {g.topics.map(tid => {
                const t = topics[tid];
                return (<a className="tcard" key={tid} href={href.topic(tid)}>
                <span className="tn">{c.num}.{String(ts.indexOf(t) + 1).padStart(2, '0')} · {t.type}</span>
                <b>{t.title}</b><p>{t.summary}</p>
                <span className="foot"><Lvl l={t.level}/>{t.verification === 'Verified examples' && <span className="chip ok">Verified examples</span>}</span>
              </a>);
            })}
          </div>
        </section>))}
      <Catalogue cat={id} heading={`Filter ${c.short} lessons`}/>
      <nav className="pn" aria-label="Previous and next topic">
        {prev ? <a href={href.cat(prev.id)}><span className="label">← Subject {prev.num}</span><b>{prev.title}</b></a> : <span />}
        {next ? <a className="next" href={href.cat(next.id)}><span className="label">Subject {next.num} →</span><b>{next.title}</b></a> : <span />}
      </nav>
    </div>);
}
/* ───────── Comparisons ───────── */
export function CompareIndex() {
    useEffect(() => title('Comparisons — UI Encyclopedia'), []);
    return (<div className="wrap">
      <Crumbs items={[['Home', href.home], ['Comparisons']]}/>
      <header className="page-head"><span className="label">{comparisons.length} side-by-side studies</span><h1>Commonly confused, clearly compared</h1><p>Each comparison covers definition, purpose, anatomy, interaction, use cases, limitations and accessibility — and ends with a practical selection rule.</p></header>
      <div className="cmp-index">{comparisons.map((c, i) => <a key={c.id} href={href.cmp(c.id)}><span className="n">{String(i + 1).padStart(2, '0')}</span><span><b>{c.title}</b><p>{c.question}</p></span></a>)}</div>
    </div>);
}
export function ComparePage({ id }) {
    const c = comparisons.find(x => x.id === id);
    const Demo = getDemo(c.demo);
    useEffect(() => title(`${c.title} — Comparisons`), [id]);
    const secs = [{ id: 'c-answer', label: 'Short answer' }, ...(Demo ? [{ id: 'c-demo', label: 'Side-by-side preview' }] : []), { id: 'c-options', label: 'Each option' }, { id: 'c-table', label: 'Difference table' }, { id: 'c-rule', label: 'Selection rule' }, { id: 'c-related', label: 'Related topics' }];
    const active = useScrollSpy(secs.map(s => s.id), id);
    const i = comparisons.indexOf(c);
    return (<div className="doc">
      <article className="doc-body">
        <header className="t-head"><Crumbs items={[['Home', href.home], ['Comparisons', href.compare], [c.title]]}/><div className="t-kicker"><span className="num">CMP.{String(i + 1).padStart(2, '0')}</span><span className="label">Comparison</span></div><h1>{c.title}</h1><p className="t-sum">{c.question}</p><MobileToc secs={secs}/></header>
        <section className="sec" id="c-answer"><div className="sec-h"><span className="idx">01</span><h2>Short answer</h2></div><p className="lead-def">{c.answer}</p></section>
        {Demo && <section className="sec" id="c-demo"><div className="sec-h"><span className="idx">02</span><h2>Side-by-side preview</h2></div><Demo /></section>}
        <section className="sec" id="c-options"><div className="sec-h"><span className="idx">{Demo ? '03' : '02'}</span><h2>Each option</h2></div>
          <div className="cmp-grid">{c.options.map(o => (<div className="cmp-col" key={o.name}>
              <h3>{o.topic ? <a href={href.topic(o.topic)} style={{ color: 'inherit' }}>{o.name}</a> : o.name}</h3>
              <dl><dt>Definition</dt><dd>{o.definition}</dd><dt>Purpose</dt><dd>{o.purpose}</dd><dt>Anatomy</dt><dd>{o.anatomy}</dd><dt>Interaction</dt><dd>{o.interaction}</dd><dt>Use for</dt><dd>{o.use}</dd><dt>Limitations</dt><dd>{o.limits}</dd><dt>Accessibility</dt><dd>{o.a11y}</dd></dl>
            </div>))}</div>
        </section>
        <section className="sec" id="c-table"><div className="sec-h"><span className="idx">{Demo ? '04' : '03'}</span><h2>Difference table</h2></div>
          <div className="tablewrap"><table className="dt"><thead><tr>{c.table[0].map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{c.table.slice(1).map(r => <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody></table></div>
        </section>
        <section className="sec" id="c-rule"><div className="sec-h"><span className="idx">{Demo ? '05' : '04'}</span><h2>Selection rule</h2></div><div className="rule"><span className="label">Rule</span><span>{c.rule}</span></div></section>
        <section className="sec" id="c-related"><div className="sec-h"><span className="idx">{Demo ? '06' : '05'}</span><h2>Related topics</h2></div>
          <div className="rel">{c.related.map(r => <a key={r} href={href.topic(r)}><span className="label">{catById[topics[r].category].short}</span><b>{topics[r].title}</b></a>)}</div>
        </section>
        <nav className="pn" aria-label="Previous and next comparison">
          {comparisons[i - 1] ? <a href={href.cmp(comparisons[i - 1].id)}><span className="label">← Previous comparison</span><b>{comparisons[i - 1].title}</b></a> : <span />}
          {comparisons[i + 1] ? <a className="next" href={href.cmp(comparisons[i + 1].id)}><span className="label">Next comparison →</span><b>{comparisons[i + 1].title}</b></a> : <span />}
        </nav>
      </article>
      <Toc secs={secs} active={active}/>
    </div>);
}
/* ───────── Glossary ───────── */
export function Glossary() {
    const [q, setQ] = useState('');
    useEffect(() => title('Glossary — UI Encyclopedia'), []);
    const list = glossary.filter(g => !q || (g.term + ' ' + g.def).toLowerCase().includes(q.toLowerCase()));
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const byL = {};
    list.forEach(g => { const L = /[a-z]/i.test(g.term[0]) ? g.term[0].toUpperCase() : '#'; (byL[L] || (byL[L] = [])).push(g); });
    const keys = Object.keys(byL).sort((a, b) => a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b));
    return (<div className="wrap">
      <Crumbs items={[['Home', href.home], ['Glossary']]}/>
      <header className="page-head"><span className="label">{glossary.length} terms & abbreviations</span><h1>Glossary</h1><p>Short definitions in plain language. Each term links to the encyclopedia entry that explains it in full.</p></header>
      <div className="filters" role="search"><div className="field"><Icon n="search"/><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search terms and definitions" aria-label="Search the glossary"/></div><span className="count" style={{ margin: 0 }} aria-live="polite">{list.length} terms</span></div>
      <nav className="az" aria-label="Jump to letter">{letters.map(L => byL[L] ? <a key={L} href={'#gl-' + L} data-native onClick={e => { e.preventDefault(); document.getElementById('gl-' + L)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>{L}</a> : <span key={L} aria-hidden="true">{L}</span>)}</nav>
      {keys.length === 0 && <div className="empty"><b>No terms match “{q}”.</b></div>}
      {keys.map(L => (<section className="gl-letter" id={'gl-' + L} key={L} aria-labelledby={'gl-h-' + L}>
          <h2 id={'gl-h-' + L}>{L}</h2>
          <dl>{byL[L].map(g => <div key={g.term}><dt>{g.term}{g.abbr && <span className="chip" style={{ height: 20, fontSize: 11 }}>abbr.</span>}</dt><dd>{g.def} {g.topic && topics[g.topic] && <a href={href.topic(g.topic)}>→ {topics[g.topic].title}</a>}</dd></div>)}</dl>
        </section>))}
    </div>);
}
/* ───────── Learning paths ───────── */
export function PathsIndex() {
    useEffect(() => title('Learning paths — UI Encyclopedia'), []);
    return (<div className="wrap">
      <Crumbs items={[['Home', href.home], ['Learning paths']]}/>
      <header className="page-head"><span className="label">{paths.length} curated routes</span><h1>Learning paths</h1><p>Sequenced routes through the encyclopedia with prerequisites, outcomes and suggested next steps. Start with the beginner path if you are new to UI design.</p></header>
      <div className="paths">
        {paths.map((p, i) => (<a key={p.id} href={href.path(p.id)} className={'pcard' + (i === 0 ? ' feature' : '')}>
            <span className="label">{p.level} · {p.steps.length} steps · ~{p.steps.reduce((s, x) => s + topics[x].readMins, 0)} min</span>
            <b>{p.title}</b><p>{p.summary}</p>
            <span className="pdots" aria-hidden="true">{p.steps.map((s, j) => <i key={j} className={j === 0 ? 'c' : ''}/>)}</span>
          </a>))}
      </div>
    </div>);
}
export function PathPage({ id }) {
    const p = paths.find(x => x.id === id);
    useEffect(() => title(`${p.title} — Learning paths`), [id]);
    return (<div className="wrap" style={{ maxWidth: 860 }}>
      <Crumbs items={[['Home', href.home], ['Learning paths', href.paths], [p.title]]}/>
      <header className="t-head"><div className="t-kicker"><span className="num">PATH</span><span className="label">{p.level} · {p.steps.length} steps</span></div><h1>{p.title}</h1><p className="t-sum">{p.summary}</p></header>
      <section className="sec"><div className="sec-h"><span className="idx">01</span><h2>Outcomes</h2></div><ul className="takeaways">{p.outcomes.map(o => <li key={o}>{o}</li>)}</ul></section>
      <section className="sec"><div className="sec-h"><span className="idx">02</span><h2>Prerequisites</h2></div>{p.prereq.length ? <div className="rel">{p.prereq.map(r => <a key={r} href={href.topic(r)}><span className="label">Read first</span><b>{topics[r].title}</b></a>)}</div> : <p className="muted">None — this path starts from zero.</p>}</section>
      <section className="sec"><div className="sec-h"><span className="idx">03</span><h2>Sequence</h2></div>
        <ol className="steps">{p.steps.map((s, i) => { const t = topics[s]; return <li key={s}><a href={href.topic(s)}><span className="sn">{String(i + 1).padStart(2, '0')}</span><span><b>{t.title}</b><small>{catById[t.category].short} · {t.summary}</small></span><span className="chip">{t.readMins} min</span></a></li>; })}</ol>
      </section>
      {p.next?.length ? <section className="sec"><div className="sec-h"><span className="idx">04</span><h2>Suggested next</h2></div><div className="rel">{p.next.map(n => { const np = paths.find(x => x.id === n); return <a key={n} href={href.path(n)}><span className="label">Path</span><b>{np.title}</b></a>; })}</div></section> : null}
    </div>);
}
/* ───────── UX (future) ───────── */
const uxAreas = ['UX fundamentals & discipline overview', 'Design thinking process', 'UX research', 'Understanding users & behaviour', 'Information architecture', 'Interaction design & user flows', 'UX laws, principles & heuristics', 'Usability & usability evaluation', 'Wireframing & prototyping', 'UX writing & content design', 'Accessibility & inclusive experience design', 'UX metrics, analytics & experimentation', 'Product strategy & end-to-end experience', 'UX deliverables & professional practice', 'UX learning experiences'];
export function UXPage() {
    useEffect(() => title('UX Encyclopedia — final planned release'), []);
    return (<div className="wrap">
      <Crumbs items={[['Home', href.home], ['UX Encyclopedia']]}/>
      <header className="page-head"><span className="label">Status · Planned · Not part of V1</span><h1>The UX Encyclopedia comes last.</h1><p>UX is the final planned major content release. It begins only after the UI Encyclopedia passes its completion criteria, and after the V2 Component Playground and V3 Design Studio. Nothing below is published yet — this page reserves the destination and shows the planned scope.</p></header>
      <div className="ux-grid" role="list" aria-label="Planned UX topic areas">{uxAreas.map((a, i) => <div role="listitem" key={a}><span className="label">15.{i + 1}</span><b>{a}</b><small>Planned</small></div>)}</div>
      <section className="sec"><div className="sec-h"><span className="idx">01</span><h2>Release sequence</h2></div>
        <ol className="steps">{[['V1.0', 'Static UI Encyclopedia', 'Available now'], ['V1.x', 'Content completion & quality', 'In progress'], ['V2.0', 'Component Playground & Asset Library', 'Planned'], ['V3.0', 'Design Studio & Guided Learning', 'Planned'], ['Final', 'UX Encyclopedia', 'Planned']].map(([v, n, s], i) => <li key={v}><a href={i === 0 ? href.ui : href.ux}><span className="sn">{v}</span><span><b>{n}</b><small>{s}</small></span>{i === 0 ? <span className="chip blue">Live</span> : <span className="chip">{s}</span>}</a></li>)}</ol>
        <p className="muted" style={{ marginTop: 16 }}>Where UI lessons touch UX concepts (affordances, feedback, flows), they link here instead of covering the UX treatment early.</p>
      </section>
    </div>);
}
export function NotFound({ hash }) {
    useEffect(() => title('Page not found — UI Encyclopedia'), []);
    return (<div className="nf">
      <span className="label">404 · Not found</span>
      <h1>Page not found</h1>
      <p className="muted">There is no entry at “#{hash}”. The address may be mistyped, or the topic may have been renamed.</p>
      <p style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><a className="btn btn-primary" href={href.ui}>Browse all topics</a><a className="btn" href={href.glossary}>Open the glossary</a></p>
    </div>);
}
