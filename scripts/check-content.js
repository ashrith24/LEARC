import { topics, order, categories, sources, comparisons, paths, glossary } from '../src/content/index';
const errs = [];
const T = (id, where) => { if (!topics[id])
    errs.push(`${where}: unknown topic "${id}"`); };
const S = (id, where) => { if (!sources[id])
    errs.push(`${where}: unknown source "${id}"`); };
const cmpIds = new Set(comparisons.map(c => c.id));
for (const id of order) {
    const t = topics[id];
    (t.related || []).forEach(r => T(r, id + '.related'));
    (t.prereq || []).forEach(r => T(r, id + '.prereq'));
    (t.refs || []).forEach(r => S(r, id + '.refs'));
    (t.examples || []).forEach(e => S(e.source, id + '.examples'));
    (t.comparisons || []).forEach(c => { if (!cmpIds.has(c))
        errs.push(`${id}: unknown comparison ${c}`); });
}
for (const c of categories)
    (c.prereq || []).forEach(r => T(r, 'cat ' + c.id));
for (const c of comparisons) {
    c.related.forEach(r => T(r, 'cmp ' + c.id));
    (c.refs || []).forEach(r => S(r, 'cmp ' + c.id));
    c.options.forEach(o => o.topic && T(o.topic, 'cmp ' + c.id));
}
for (const p of paths) {
    [...p.steps, ...p.prereq].forEach(r => T(r, 'path ' + p.id));
}
for (const g of glossary)
    if (g.topic)
        T(g.topic, 'glossary ' + g.term);
const demos = new Set(order.map(id => topics[id].demo).filter(Boolean));
console.log(`topics=${order.length} categories=${categories.length} comparisons=${comparisons.length} paths=${paths.length} glossary=${glossary.length} sources=${Object.keys(sources).length} demos=${demos.size}`);
console.log(categories.map(c => c.num + ' ' + order.filter(i => topics[i].category === c.id).length).join(' | '));
const verified = order.filter(i => topics[i].verification === 'Verified examples').length;
console.log('topics with verified examples:', verified);
if (errs.length) {
    console.log(errs.join('\n'));
    process.exit(1);
}
else
    console.log('OK');
