import { FileSystem } from '@effect/platform';
import { BunFileSystem, BunRuntime, BunTerminal } from '@effect/platform-bun';
import { Effect, Layer, Logger, LogLevel } from 'effect';
import { getCaption } from '@/get-caption';
import { ask } from '@/utils';

const main = Effect.gen(function* () {
  const deliveryId = yield* ask('Video ID: ');
  const caption = yield* getCaption(deliveryId);
  const filesystem = yield* FileSystem.FileSystem;

  yield* filesystem.writeFileString(`${deliveryId}.txt`, caption);
});

BunRuntime.runMain(
  main.pipe(
    Logger.withMinimumLogLevel(LogLevel.Debug),
    Effect.provide(Layer.merge(BunTerminal.layer, BunFileSystem.layer)),
  ),
);
