import { topics, order, catById, categories, comparisons, glossary, paths } from './content';
import { href } from './router';
const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9+ ]+/g, ' ').trim();
const docs = [
    ...order.map(id => { const t = topics[id]; return { kind: 'Lesson', title: t.title, aliases: t.aliases || [], tags: [...(t.tags || []), t.type, t.level], body: t.summary + ' ' + t.definition, sub: t.summary, meta: catById[t.category].short, to: href.topic(id) }; }),
    ...categories.map(c => ({ kind: 'Topic', title: c.title, aliases: [c.short], tags: [c.domain], body: c.intro, sub: c.intro, meta: 'Category · ' + c.domain, to: href.cat(c.id) })),
    ...comparisons.map(c => ({ kind: 'Comparison', title: c.title, aliases: [], tags: ['vs', 'difference', 'compare'], body: c.answer, sub: c.question, meta: 'Comparison', to: href.cmp(c.id) })),
    ...paths.map(p => ({ kind: 'Learning path', title: p.title, aliases: [], tags: ['path', 'learn', p.level], body: p.summary, sub: p.summary, meta: p.steps.length + ' steps', to: href.path(p.id) })),
    ...glossary.filter(g => !topics[g.topic || ''] || topics[g.topic].title !== g.term).map(g => ({ kind: 'Glossary', title: g.term, aliases: [], tags: [], body: g.def, sub: g.def, meta: 'Glossary', to: g.topic ? href.topic(g.topic) : href.glossary })),
];
const prepared = docs.map(d => ({ d, t: norm(d.title), a: d.aliases.map(norm), g: d.tags.map(norm), b: norm(d.body) }));
export function search(q, limit = 40) {
    const nq = norm(q);
    if (!nq)
        return [];
    const terms = nq.split(' ').filter(Boolean);
    const out = [];
    for (const p of prepared) {
        let s = 0;
        if (p.t === nq)
            s += 120;
        else if (p.t.startsWith(nq))
            s += 80;
        else if (p.t.includes(nq))
            s += 55;
        for (const a of p.a) {
            if (a === nq)
                s = Math.max(s, 100);
            else if (a.startsWith(nq))
                s += 40;
            else if (a.includes(nq))
                s += 22;
        }
        let all = true;
        for (const term of terms) {
            let hit = false;
            if (p.t.split(' ').some(w => w.startsWith(term))) {
                s += 14;
                hit = true;
            }
            if (p.a.some(a => a.split(' ').some(w => w.startsWith(term)))) {
                s += 9;
                hit = true;
            }
            if (p.g.some(g => g.startsWith(term))) {
                s += 6;
                hit = true;
            }
            if (p.b.includes(term)) {
                s += 3;
                hit = true;
            }
            if (!hit)
                all = false;
        }
        if (!all)
            s = Math.min(s, s > 50 ? s : 0);
        if (s > 0)
            out.push({ kind: p.d.kind, title: p.d.title, sub: p.d.sub, meta: p.d.meta, to: p.d.to, score: s + (p.d.kind === 'Topic' ? 2 : p.d.kind === 'Comparison' ? 1 : 0) });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, limit);
}
export const suggestions = ['Buttons', 'Modal vs drawer', 'Contrast ratio', 'Type scale', 'Bento grid', 'Glassmorphism', 'Design tokens', 'Easing', 'Combobox', 'Empty state'];
