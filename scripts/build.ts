import { mkdir, rm } from 'node:fs/promises';

async function main(args: string[]) {
  const arg = args.slice(2)[0];
  const buildDirectory = 'dist';

  await rm(buildDirectory, { recursive: true, force: true });
  await mkdir(buildDirectory);

  await Bun.build({
    entrypoints: ['src/index.ts'],
    outdir: `${buildDirectory}`,
    target: 'bun',
    format: 'esm',
    minify: arg !== '--test' && arg !== '-t',
  });
}

void main(Bun.argv);
