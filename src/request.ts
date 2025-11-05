import { Data, Effect, Redacted, Schema } from 'effect';

class NetworkError extends Data.TaggedError('NetworkError')<{ error: unknown }> {}
class JSONParseError extends Data.TaggedError('JSONParseError')<{ error: unknown }> {}

export const request = <A, I, R>(
  endpoint: string,
  contentType: string,
  body: BodyInit,
  schema: Schema.Schema<A, I, R>,
) =>
  Effect.gen(function* () {
    const cookie = yield* Schema.Config('COOKIE', Schema.Redacted(Schema.String.pipe(Schema.startsWith('.ASPXAUTH='))));
    const headers = {
      'Content-Type': contentType,
      Cookie: Redacted.value(cookie),
    };

    const response = yield* Effect.tryPromise({
      try: () => fetch(`https://mediaweb.ap.panopto.com/Panopto/${endpoint}`, { method: 'POST', body, headers }),
      catch: (error) => new NetworkError({ error }),
    });

    const json = yield* Effect.tryPromise({
      try: () => response.json(),
      catch: (error) => new JSONParseError({ error }),
    });

    return yield* Schema.decodeUnknown(schema)(json);
  });
