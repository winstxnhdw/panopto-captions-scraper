import { FileSystem } from '@effect/platform';
import { BunFileSystem, BunRuntime, BunTerminal } from '@effect/platform-bun';
import { Effect, Layer, Schema } from 'effect';
import { getCaption } from '@/get-caption';
import { getFolderId } from '@/get-folder-id';
import { request } from '@/request';
import { ask } from '@/utils';

const SessionSchema = Schema.transform(
  Schema.Struct({
    d: Schema.Struct({ Results: Schema.Array(Schema.Struct({ DeliveryID: Schema.String })) }),
  }),
  Schema.Array(Schema.String),
  {
    decode: (input) => input.d.Results.map(({ DeliveryID }) => DeliveryID),
    encode: (input) => ({ d: { Results: input.map((DeliveryID) => ({ DeliveryID })) } }),
  },
);

const getSessions = (folderId: string) =>
  Effect.gen(function* () {
    const body = JSON.stringify({
      queryParameters: {
        sortColumn: 1,
        maxResults: 99999,
        folderID: folderId,
      },
    });

    return yield* request('Services/Data.svc/GetSessions', 'application/json', body, SessionSchema);
  });

const getCaptions = (folderId: string) =>
  Effect.gen(function* () {
    const sessions = yield* getSessions(folderId);
    const results = yield* Effect.all(sessions.map(getCaption));

    return results.join('\n\n');
  });

const main = Effect.gen(function* () {
  const input = yield* ask('Folder URL: ');
  const folderId = yield* getFolderId(input);
  const captions = yield* getCaptions(folderId);
  const filesystem = yield* FileSystem.FileSystem;

  yield* filesystem.writeFileString(`${folderId}.txt`, captions);
});

BunRuntime.runMain(main.pipe(Effect.provide(Layer.merge(BunTerminal.layer, BunFileSystem.layer))));
