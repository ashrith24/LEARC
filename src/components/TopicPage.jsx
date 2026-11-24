import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { topics, catById, prevNext, comparisons } from '../content';
import { href } from '../router';
import { Icon } from './Icon';
import { Crumbs } from './Chrome';
import { getDemo } from '../demos/registry';
export const pair = (s) => { const i = s.indexOf(': '); return i > 0 ? [s.slice(0, i), s.slice(i + 2)] : ['', s]; };
function DefList({ items, numbered }) {
    const ps = items.map(pair);
    if (ps.every(p => !p[0]))
        return <ul className="deflist" style={{ paddingLeft: 0 }}>{ps.map((p, i) => <li key={i} style={{ gridTemplateColumns: '1fr' }}><span>{p[1]}</span></li>)}</ul>;
    return <ul className={'deflist' + (numbered ? ' numbered' : '')}>{ps.map(([a, b], i) => <li key={i}><b>{a || '—'}</b><span>{b}</span></li>)}</ul>;
}
export function useScrollSpy(ids, dep) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const els = ids.map(id => document.getElementById(id)).filter(Boolean);
        const on = () => {
            const y = window.scrollY + window.innerHeight * 0.28;
            let cur = els[0]?.id;
            for (const el of els)
                if (el.offsetTop <= y)
                    cur = el.id;
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4)
                cur = els[els.length - 1]?.id;
            setActive(cur);
        };
        on();
        window.addEventListener('scroll', on, { passive: true });
        return () => window.removeEventListener('scroll', on);
    }, [dep]);
    return active;
}
export function jumpTo(id) {
    const el = document.getElementById(id);
    if (!el)
        return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    const h = el.querySelector('h2, h3, h4');
    if (h) {
        h.setAttribute('tabindex', '-1');
        h.focus({ preventScroll: true });
    }
}
export function Toc({ secs, active, extra }) {
    const meter = useRef(null);
    useEffect(() => {
        const on = () => { const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight); if (meter.current)
            meter.current.style.width = Math.round(p * 100) + '%'; };
        on();
        window.addEventListener('scroll', on, { passive: true });
        return () => window.removeEventListener('scroll', on);
    }, []);
    return (<aside className="toc" aria-label="On this page">
      <div className="label">On this page</div>
      <div className="toc-meter" aria-hidden="true"><i ref={meter}/></div>
      <ol>{secs.map(s => <li key={s.id}>
        <a href={'#' + s.id} data-native className={active === s.id || s.children?.some(c => c.id === active) ? 'on' : ''} aria-current={active === s.id || s.children?.some(c => c.id === active) ? 'location' : undefined} onClick={e => { e.preventDefault(); jumpTo(s.id); }}><span>{s.number || String(secs.indexOf(s) + 1).padStart(2, '0')}</span>{s.label}</a>
        {s.children?.length ? <details className="toc-subgroup"><summary aria-label={`Show ${s.children.length} ${s.label.toLowerCase()} subsections`}><Icon n="chev" s={13}/></summary><ol>{s.children.map(c => <li key={c.id}><a href={'#' + c.id} data-native className={active === c.id ? 'on' : ''} aria-current={active === c.id ? 'location' : undefined} onClick={e => { e.preventDefault(); jumpTo(c.id); }}><span>{c.number}</span>{c.label}</a></li>)}</ol></details> : null}
      </li>)}</ol>
      {extra}
    </aside>);
}
export function MobileToc({ secs }) {
    const d = useRef(null);
    return (<details className="toc-mobile" ref={d}>
      <summary>On this page <Icon n="chevD"/></summary>
      <ol>{secs.map(s => <li key={s.id}><a href={'#' + s.id} data-native onClick={e => { e.preventDefault(); d.current.open = false; jumpTo(s.id); }}><span>{s.number || String(secs.indexOf(s) + 1).padStart(2, '0')}</span> {s.label}</a>{s.children?.length ? <details className="toc-mobile-sub"><summary aria-label={`Show ${s.children.length} ${s.label.toLowerCase()} subsections`}><Icon n="chev" s={13}/></summary><ol>{s.children.map(c => <li key={c.id}><a href={'#' + c.id} data-native onClick={e => { e.preventDefault(); d.current.open = false; jumpTo(c.id); }}><span>{c.number}</span> {c.label}</a></li>)}</ol></details> : null}</li>)}</ol>
    </details>);
}
function Section({ s, i }) {
    return (<section className="sec" id={s.id} aria-labelledby={s.id + '-h'}>
      <div className="sec-h"><span className="idx" aria-hidden="true">{s.number}</span><h2 id={s.id + '-h'}>{s.label}</h2></div>
      {s.node}
    </section>);
}
function TypeList({ items, groups, guidance, examples, number, developerNotes = false }) {
    const implementationByType = {
        Primary: 'Use <button type="submit"> for form submission or type="button" for other actions. Keep one primary action per task and provide :focus-visible styling.',
        Secondary: 'Use a native button with the same action semantics as the primary control. Change visual emphasis in CSS rather than changing its behavior.',
        Tertiary: 'Use <button> for in-place actions; use <a href> when the control navigates. Keep the visible label and accessible name aligned.',
        Outline: 'Use a native button with a transparent background and solid border. Define hover, active, disabled and :focus-visible states explicitly.',
        Ghost: 'Use a native button with transparent resting styles. Add a clear hover/pressed surface without shrinking its hit target.',
        'Text / link-style button': 'Use <button> for actions and <a href> for navigation even when their visual styles are similar. Preserve keyboard and context-menu behavior.',
        Destructive: 'Use a button with explicit action wording. For consequential deletion, add a confirmation flow and never communicate danger by color alone.',
        'Icon button': 'Use <button aria-label="…"> when the icon has no visible text. Include a visible focus ring and a practical hit area.',
        'Split button': 'Build the main action and menu trigger as separate buttons. Give the menu trigger its own accessible name and aria-expanded state.',
        'Floating action button (FAB)': 'Use a semantic button and account for safe-area insets, keyboard focus, and overlap with scrolling content.',
        'Toggle button': 'Expose its state with aria-pressed="true|false" and update that state when activated; do not use aria-pressed for navigation.',
        'Button group': 'Group related controls semantically. For mutually exclusive options, consider radio inputs or a tab pattern with the matching keyboard behavior.',
        'Loading button': 'Set aria-busy while pending, prevent duplicate submission, and announce progress without hiding the action context.',
        'Disabled button': 'Use the disabled attribute when unavailable. If users need to discover why, keep an explanation nearby or use a guarded action pattern.',
        'Full-width (block) button': 'Use width: 100% within the intended form column and preserve a comfortable minimum height and visible focus state.',
    };
    const entries = items.map((item, i) => {
        const [label, description] = pair(item);
        const detail = guidance?.[label] || {};
        return { id: `s-type-${i + 1}`, number: `${number}.${i + 1}`, label: label || description, description: label ? description : '', detail: { ...detail, implementation: detail.implementation || (developerNotes ? implementationByType[label] : undefined) }, examples: examples?.[label] || [], index: i };
    });
    const groupByLabel = new Map();
    (groups || []).forEach(group => group.items.forEach(label => groupByLabel.set(label, group.title)));
    const grouped = new Map();
    const ungrouped = [];
    entries.forEach(entry => {
        const group = groupByLabel.get(entry.label);
        if (!group) { ungrouped.push(entry); return; }
        if (!grouped.has(group)) grouped.set(group, []);
        grouped.get(group).push(entry);
    });
    const renderEntry = entry => {
        const TypeHeading = 'h3';
        const GuidanceHeading = 'h4';
        return <Fragment key={entry.id}>
          <article className="type-entry" id={entry.id} aria-labelledby={entry.id + '-h'}>
            <div className="type-entry-head"><span>{entry.number}</span><TypeHeading id={entry.id + '-h'}>{entry.label}</TypeHeading></div>
            {entry.description && <p>{entry.description}</p>}
            {(entry.detail.use?.length || entry.detail.avoid?.length) ? <div className="type-guidance">
              {entry.detail.use?.length ? <div className="panel do type-guidance-card"><GuidanceHeading><Icon n="check" s={14}/>When to use</GuidanceHeading><ul>{entry.detail.use.map((x, i) => <li key={i}>{x}</li>)}</ul></div> : null}
              {entry.detail.avoid?.length ? <div className="panel dont type-guidance-card"><GuidanceHeading><Icon n="x" s={14}/>When to avoid</GuidanceHeading><ul>{entry.detail.avoid.map((x, i) => <li key={i}>{x}</li>)}</ul></div> : null}
            </div> : null}
            {entry.detail.implementation ? <div className="type-dev-note"><b>Developer implementation</b><p>{entry.detail.implementation}</p></div> : null}
            {entry.examples.length ? <div className="type-examples"><h4>Real-world examples</h4><div className="type-example-grid">{entry.examples.map((sample, i) => <article className={'type-example type-example-' + entry.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={i}>
              <b>{sample.product}</b><span>{sample.context}</span>
              <div className={'type-shot type-shot-' + sample.kind} style={{ '--sample-tone': sample.tone || '#3B82F6' }} aria-hidden="true">
                {sample.kind === 'logo' ? <div className="type-logo"><b>{sample.glyph}</b></div> : sample.kind === 'button' ? <div className="type-mini-ui"><b>{sample.action || 'Continue'}</b></div> : <div className="type-mini-ui"><span className="type-mini-control"/></div>}
              </div>
            </article>)}</div></div> : null}
          </article>
        </Fragment>;
    };
    const groupNames = [...grouped.keys()];
    return <div className="type-list">
      {groupNames.map(name => <details className="type-category" key={name}>
        <summary><span>{name}</span><span className="type-category-meta">{grouped.get(name).length} types <Icon n="chev" s={15}/></span></summary>
        <div className="type-category-content">{grouped.get(name).map(renderEntry)}</div>
      </details>)}
      {ungrouped.length ? <details className="type-category">
        <summary><span>{groupNames.length ? 'Other variants' : 'Types & variants'}</span><span className="type-category-meta">{ungrouped.length} types <Icon n="chev" s={15}/></span></summary>
        <div className="type-category-content">{ungrouped.map(renderEntry)}</div>
      </details> : null}
    </div>;
}
export function TopicPage({ id }) {
    const t = topics[id];
    const c = catById[t.category];
    const { prev, next } = prevNext(id);
    const Demo = getDemo(t.demo);
    const isPage = t.type === 'Page layout';
    const isStyle = t.type === 'Style';
    const secs = useMemo(() => {
        const s = [];
        s.push({ id: 's-definition', label: 'Definition', node: <div><p className="lead-def">{t.definition}</p></div> });
        s.push({ id: 's-purpose', label: 'Why it exists', node: <div className="prose"><p>{t.purpose}</p></div> });
        if (Demo)
            s.push({ id: 's-demo', label: isStyle ? 'Live specimen' : 'Visual demonstration', node: <Demo topic={t}/> });
        if (t.anatomy?.length)
            s.push({ id: 's-anatomy', label: isPage ? 'Page anatomy' : isStyle ? 'Visual traits' : 'Anatomy', node: <DefList items={t.anatomy} numbered/> });
        if (t.types?.length)
            s.push({ id: 's-types', label: isPage ? 'Section order & layout alternatives' : 'Types & variants', typeItems: t.types, node: null });
        if (t.states?.length)
            s.push({ id: 's-states', label: 'States & behaviour', node: <DefList items={t.states}/> });
        if (t.use?.length || t.avoid?.length)
            s.push({ id: 's-usage', label: isPage ? 'Usage & common mistakes' : 'When to use — and when not to', node: (<div className="split2">
        {t.use?.length ? <div className="panel do"><h3><Icon n="check"/>{isStyle ? 'Suits' : 'Use when'}</h3><ul>{t.use.map((x, i) => <li key={i}>{x}</li>)}</ul></div> : null}
        {t.avoid?.length ? <div className="panel dont"><h3><Icon n="x"/>{isPage ? 'Common mistakes' : isStyle ? 'Limitations' : 'Avoid when'}</h3><ul>{t.avoid.map((x, i) => <li key={i}>{x.replace(/^Watch for: /, '')}</li>)}</ul></div> : null}
      </div>) });
        if ((t.pros?.length || t.cons?.length) && !isStyle)
            s.push({ id: 's-tradeoffs', label: 'Advantages & limitations', node: (<div className="split2">
        <div className="panel"><h3 style={{ color: 'var(--tx-1)' }}>Advantages</h3><ul>{(t.pros || []).map((x, i) => <li key={i}>{x}</li>)}</ul></div>
        <div className="panel"><h3 style={{ color: 'var(--tx-1)' }}>Limitations</h3><ul>{(t.cons || []).map((x, i) => <li key={i}>{x}</li>)}</ul></div>
      </div>) });
        const cmps = comparisons.filter(cm => t.comparisons?.includes(cm.id) || cm.options.some(o => o.topic === t.id));
        if (t.differs?.length || cmps.length)
            s.push({ id: 's-differs', label: 'Differences from similar concepts', node: (<div>
        {t.differs?.length ? <DefList items={t.differs}/> : null}
        {cmps.length ? <div className="rel" style={{ marginTop: 14 }}>{cmps.map(cm => <a key={cm.id} href={href.cmp(cm.id)}><span className="label">Comparison</span><b>{cm.title}</b></a>)}</div> : null}
      </div>) });
        if (t.responsive)
            s.push({ id: 's-responsive', label: 'Responsive behaviour', node: <div className="note"><Icon n="device" s={20}/><div>{t.responsive}</div></div> });
        if (t.a11y)
            s.push({ id: 's-a11y', label: 'Accessibility', node: <div className="note a11y"><Icon n="a11y" s={20}/><div>{t.a11y}</div></div> });
        s.push({ id: 's-examples', label: 'Real-world examples', node: (<div>
        {t.examples?.length ? t.examples.map((e, i) => (<article className="ex" key={i}>
            <div className="ex-top"><b>{e.product}</b><span className="ex-ctx">{e.context}</span></div>
            <p>{e.observed}</p>
          </article>)) : <div className="pending">No product examples are available for this entry yet.</div>}
      </div>) });
        const rel = [...(t.prereq || []).map(r => ['Prerequisite', r]), ...(t.related || []).map(r => ['Related', r])].filter(([, r]) => topics[r]);
        if (rel.length)
            s.push({ id: 's-related', label: 'Related topics', node: <div className="rel">{rel.map(([k, r]) => <a key={k + r} href={href.topic(r)}><span className="label">{k} · {catById[topics[r].category].short}</span><b>{topics[r].title}</b></a>)}</div> });
        if (t.takeaways?.length)
            s.push({ id: 's-check', label: 'Learning check', node: (<div><ol className="takeaways">{t.takeaways.map((k, i) => <li key={i}>{k}</li>)}</ol>
        <p className="muted" style={{ marginTop: 14, fontSize: 15 }}><b style={{ color: 'var(--tx-1)' }}>Observation task:</b> find {t.title.toLowerCase().startsWith('the') ? '' : 'an example of '}“{t.title}” in a product you use today. Describe it using the vocabulary on this page{t.anatomy?.length ? ' — name its parts' : ''}{t.use?.length ? ' and judge whether it fits the “use when” guidance' : ''}.</p></div>) });
        const usageSection = s.find(section => section.id === 's-usage');
        if (usageSection && !isPage && t.types?.length)
            usageSection.label = 'Usage principles';
        s.forEach((section, i) => { section.number = String(i + 1).padStart(2, '0'); });
        const typeSection = s.find(section => section.typeItems);
        if (typeSection) {
            const typeGroupByLabel = new Map();
            (t.typeGroups || []).forEach(group => group.items.forEach(label => typeGroupByLabel.set(label, group.title)));
            let previousGroup = null;
            const subSectionNumber = String(Number(typeSection.number));
            typeSection.children = typeSection.typeItems.map((item, i) => {
                const [label, description] = pair(item);
                const name = label || description;
                const group = typeGroupByLabel.get(name);
                const groupStart = !!group && group !== previousGroup;
                previousGroup = group || null;
                return { id: `s-type-${i + 1}`, number: `${subSectionNumber}.${i + 1}`, label: name, group, groupStart };
            });
            typeSection.node = <TypeList items={typeSection.typeItems} groups={t.typeGroups} guidance={t.typeGuidance} examples={t.typeExamples} number={subSectionNumber} developerNotes={t.id === 'buttons'}/>;
        }
        return s;
    }, [id]);
    const sectionIds = secs.flatMap(s => [s.id, ...(s.children || []).map(c => c.id)]);
    const active = useScrollSpy(sectionIds, id);
    useEffect(() => { document.title = `Learc — ${t.title}`; }, [id]);
    return (<div className="doc">
      <article className="doc-body">
        <header className="t-head">
          <Crumbs items={[['Home', href.home], ['UI Encyclopedia', href.ui], [c.domain], [c.short, href.cat(c.id)], [t.group], [t.title]]}/>
          <div className="t-kicker"><span className="num">{c.num}.{String(t.index - (Object.values(topics).filter(x => x.category === c.id)[0].index) + 1).padStart(2, '0')}</span><span className="label">{c.domain} / {c.short} / {t.group}</span></div>
          <h1>{t.title}</h1>
          <p className="t-sum">{t.summary}</p>
          <div className="t-meta">
            <span className="chip blue">{t.type}</span>
            <span className="chip"><span className="dot" style={{ color: t.level === 'Beginner' ? 'var(--ok)' : t.level === 'Intermediate' ? 'var(--warn)' : 'var(--err)' }}/>{t.level}</span>
            <span className="chip">{t.readMins} min read</span>
          </div>
          {t.aliases?.length ? <p className="aka"><b>Also called / covers:</b> {t.aliases.join(' · ')}</p> : null}
          <MobileToc secs={secs}/>
        </header>
        {secs.map((s, i) => <Section key={s.id} s={s} i={i}/>)}
        <nav className="pn" aria-label="Previous and next topic">
          {prev ? <a href={href.topic(prev.id)}><Icon n="arrowL" s={14}/>Previous</a> : <span />}
          {next ? <a className="next" href={href.topic(next.id)}>Next<Icon n="arrow" s={14}/></a> : <span />}
        </nav>
      </article>
      <Toc secs={secs} active={active} extra={<div className="toc-card">
          <div className="label">Learning tip</div>
          {t.prereq?.length ? <><p>Read these first if anything here is unfamiliar:</p>{t.prereq.map(p => <a key={p} href={href.topic(p)}>{topics[p].title}</a>)}</> : <p>{t.takeaways?.[0] || (Demo ? 'Explore the demonstration and compare its variations.' : `As you read, connect each idea to a real ${t.type.toLowerCase()} you have seen in a product.`)}</p>}
          {next && <><p style={{ marginTop: 10 }}>Up next:</p><a href={href.topic(next.id)}>{next.title} →</a></>}
        </div>}/>
    </div>);
}
