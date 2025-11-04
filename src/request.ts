import { Effect, Redacted, Schema } from 'effect';

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
      catch: (error) =>
        new Error(`Network request to https://mediaweb.ap.panopto.com/Panopto/${endpoint} failed: ${error}`),
    });

    const json = yield* Effect.tryPromise({
      try: () => response.json(),
      catch: (error) => new Error(`Failed to parse JSON response: ${error}`),
    });

    return yield* Schema.decodeUnknown(schema)(json);
  });
