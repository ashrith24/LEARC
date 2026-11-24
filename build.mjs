// Build the React application with esbuild, then inline JS + CSS into one static index.html.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const prod = !process.argv.includes('--dev');
const r = await build({
  entryPoints: ['src/main.jsx'], bundle: true, write: false, minify: prod, format: 'iife',
  jsx: 'automatic', target: 'es2020',
  loader: { '.png': 'dataurl' },
  define: { 'process.env.NODE_ENV': prod ? '"production"' : '"development"' }, logLevel: 'warning',
});
const js = r.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = ['tokens.css', 'base.css', 'app.css', 'demos.css', 'styles16.css']
  .map(f => readFileSync('src/styles/' + f, 'utf8')).join('\n');
const html = readFileSync('src/index.html', 'utf8')
  .replace('/*__CSS__*/', () => css).replace('/*__JS__*/', () => js);
mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html);
console.log('built dist/index.html', (html.length / 1024).toFixed(0) + ' KB');
