const reg = {};
export const register = (m) => Object.assign(reg, m);
export const getDemo = (id) => id ? (reg[id] || (id.startsWith('style:') ? reg['style'] : undefined)) : undefined;
export const demoIds = () => Object.keys(reg);
