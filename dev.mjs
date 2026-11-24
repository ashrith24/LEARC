import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const build = spawnSync(process.execPath, ['build.mjs', '--dev'], { stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status ?? 1);

const port = Number(process.env.PORT || 4173);
const html = await readFile('dist/index.html');
createServer((request, response) => {
  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  response.end(html);
}).listen(port, '127.0.0.1', () => {
  console.log(`development server running at http://localhost:${port}`);
});
