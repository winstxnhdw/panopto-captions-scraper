import { Command, Options } from '@effect/cli';
import { BunContext, BunRuntime } from '@effect/platform-bun';
import { Data, Effect } from 'effect';

class InstallerCompileError extends Data.TaggedError('InstallerCompileError')<{
  readonly cause: unknown;
}> {}

const compile = ({ outfile, target }: Command.Command.ParseConfig<typeof options>) =>
  Effect.tryPromise({
    catch: (cause) => new InstallerCompileError({ cause }),
    try: () =>
      Bun.build({
        entrypoints: ['src/index.ts'],
        minify: true,
        bytecode: true,
        sourcemap: 'inline',
        compile: { outfile, target: target as Bun.Build.CompileTarget },
      }),
  });

const options = {
  outfile: Options.text('outfile').pipe(Options.withDefault('dist/PanoptoScraper')),
  target: Options.text('target').pipe(Options.withDefault('bun-linux-x64')),
};

const cli = Command.run(Command.make('compile', options, compile), {
  name: 'Bun Compile CLI',
  version: 'v1.0.0',
});

BunRuntime.runMain(cli(Bun.argv).pipe(Effect.provide(BunContext.layer)));
