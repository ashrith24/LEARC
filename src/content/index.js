import * as c01 from './topics/01-foundations';
import * as c02 from './topics/02-color';
import * as c03 from './topics/03-shapes';
import * as c04 from './topics/04-typography';
import * as c05 from './topics/05-icons';
import * as c06 from './topics/06-layout';
import * as c07 from './topics/07-surfaces';
import * as c08 from './topics/08-elements';
import * as c09 from './topics/09-forms';
import * as c10 from './topics/10-content';
import * as c11 from './topics/11-navigation';
import * as c12 from './topics/12-feedback';
import * as c13 from './topics/13-landing';
import * as c14 from './topics/14-app-patterns';
import * as c15 from './topics/15-page-layouts';
import * as c16 from './topics/16-styles';
import * as c17 from './topics/17-design-systems';
import * as c18 from './topics/18-motion';
import * as c19 from './topics/19-responsive-a11y';
import { sources } from './sources';
import { extraTerms } from './glossary';
import { comparisons } from './comparisons';
import { paths } from './paths';
export { sources, comparisons, paths };
export const CONTENT_DATE = '2026-11-24';
const modules = [c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19];
export const categories = modules.map(m => m.cat);
export const topics = {};
export const order = [];
const words = (t) => Object.values(t).reduce((n, v) => n + (typeof v === 'string' ? v.split(/\s+/).length : Array.isArray(v) ? v.reduce((m, x) => m + (typeof x === 'string' ? x.split(/\s+/).length : JSON.stringify(x).split(/\s+/).length), 0) : 0), 0);
for (const m of modules) {
    const byId = Object.fromEntries(m.topics.map(t => [t.id, t]));
    for (const g of m.cat.groups) {
        for (const id of g.topics) {
            const t = byId[id];
            if (!t)
                throw new Error(`Missing topic ${id} in ${m.cat.id}`);
            const hasVerified = (t.examples || []).some(e => sources[e.source]?.checked);
            topics[id] = {
                ...t, category: m.cat.id, group: g.title, index: order.length,
                readMins: Math.max(2, Math.round(words(t) / 180) + (t.demo ? 1 : 0)), status: 'Published', lastReviewed: CONTENT_DATE,
                verification: hasVerified ? 'Verified examples' : 'Examples pending verification',
            };
            order.push(id);
        }
    }
}
export const catById = Object.fromEntries(categories.map(c => [c.id, c]));
export const topicsIn = (catId) => order.filter(id => topics[id].category === catId).map(id => topics[id]);
export const prevNext = (id) => {
    const i = order.indexOf(id);
    return { prev: i > 0 ? topics[order[i - 1]] : undefined, next: i < order.length - 1 ? topics[order[i + 1]] : undefined };
};
export const glossary = (() => {
    const seen = new Set();
    const list = [];
    for (const g of extraTerms) {
        seen.add(g.term.toLowerCase());
        list.push(g);
    }
    for (const id of order) {
        const t = topics[id];
        if (!seen.has(t.title.toLowerCase())) {
            seen.add(t.title.toLowerCase());
            list.push({ term: t.title, def: t.summary, topic: id });
        }
    }
    return list.sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
})();
export const TYPES = ['Concept', 'Principle', 'Element', 'Component', 'Pattern', 'Page layout', 'Style', 'System', 'Standard'];
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const DOMAINS = ['Foundations', 'Elements & Components', 'Patterns & Page Structures', 'Styles & Systems'];
