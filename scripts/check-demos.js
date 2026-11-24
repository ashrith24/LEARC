import '../src/demos';
import { demoIds } from '../src/demos/registry';
import { topics, order, comparisons } from '../src/content/index';
const ids = new Set(demoIds());
const missing = order.map(id => topics[id].demo).filter(d => d && !ids.has(d) && !d.startsWith('style:'));
const cm = comparisons.map(c => c.demo).filter(d => d && !ids.has(d));
console.log('registered', ids.size, 'missing topic demos:', missing, 'missing cmp demos:', cm);
