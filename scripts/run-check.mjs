import { build } from 'esbuild';

const script = process.argv[2];
if (!['check-content.js', 'check-demos.js'].includes(script)) {
  throw new Error(`Unknown check script: ${script}`);
}

const result = await build({
  entryPoints: [`scripts/${script}`],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  target: 'node18',
});
const code = result.outputFiles[0].text;
await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
