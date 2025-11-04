import { Data, Effect } from 'effect';

class NoInputProvidedError extends Data.TaggedClass('NoInputProvidedError') {}

export const ask = (message: string) =>
  Effect.gen(function* () {
    const input = prompt(`[?] ${message}`);
    return yield* input ? Effect.succeed(input) : Effect.fail(new NoInputProvidedError());
  });
