import { Data, Effect, Schema } from 'effect';
import { replaceCharacter } from '@/utils';

class InvalidFolderURLError extends Data.TaggedError('InvalidFolderURLError')<{ url: string }> {}

const getFolderIdParamter = (url: URL): Effect.Effect<string, InvalidFolderURLError, never> =>
  Effect.gen(function* () {
    const folderIdParameter = new URLSearchParams(url.hash.substring(1)).get('folderID');

    return yield* folderIdParameter
      ? Effect.succeed(replaceCharacter(folderIdParameter, '"', ''))
      : Effect.fail(new InvalidFolderURLError({ url: url.toString() }));
  });

export const getFolderId = (folderUrl: string) =>
  Effect.gen(function* () {
    const verifiedUrl = yield* Schema.decodeUnknown(Schema.URL)(folderUrl);
    const folderIdParameter = yield* getFolderIdParamter(verifiedUrl);

    return replaceCharacter(folderIdParameter, '"', '');
  });
