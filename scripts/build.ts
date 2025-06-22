import { mkdir, rm } from 'node:fs/promises';

const build_directory = 'dist';

async function main(args: string[]) {
  const arg = args.slice(2)[0];

  await rm(build_directory, { recursive: true, force: true });
  await mkdir(build_directory);

  await Bun.build({
    entrypoints: ['src/index.ts'],
    outdir: `${build_directory}`,
    target: 'bun',
    format: 'esm',
    minify: arg !== '--test' && arg !== '-t',
  });
}

void main(Bun.argv);
