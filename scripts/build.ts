import { mkdir, rm } from 'node:fs/promises';
import { Command, Options } from '@effect/cli';
import { BunContext, BunRuntime } from '@effect/platform-bun';
import { Effect } from 'effect';

const test = Options.boolean('test').pipe(
  Options.withAlias('t'),
  Options.optional,
  Options.withDescription('Disable the minify build for debug purposes'),
);

const command = Command.make('build', { test }, ({ test }) =>
  Effect.gen(function* () {
    const buildDirectory = 'dist';
    yield* Effect.tryPromise(() => rm(buildDirectory, { recursive: true, force: true }));
    yield* Effect.tryPromise(() => mkdir(buildDirectory));
    return yield* Effect.tryPromise(() =>
      Bun.build({
        entrypoints: ['src/index.ts'],
        outdir: buildDirectory,
        target: 'bun',
        format: 'esm',
        minify: !test,
      }),
    );
  }),
);

const cli = Command.run(command, {
  name: 'Bun Build CLI',
  version: 'v1.0.0',
});

cli(Bun.argv).pipe(Effect.provide(BunContext.layer), BunRuntime.runMain);
