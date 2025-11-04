import { Data, Effect } from 'effect';

class NoFolderURLProvidedError extends Data.TaggedClass('NoFolderURLProvidedError') {}

export const ask = (message: string) =>
  Effect.gen(function* () {
    const input = prompt(`[?] ${message}`);
    return yield* input ? Effect.succeed(input) : Effect.fail(new NoFolderURLProvidedError());
  });
