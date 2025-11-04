import { expect, test } from 'bun:test';
import { Effect } from 'effect';
import { getFolderId } from '@/get-folder-id';

const getFolderIdEffect = (folderUrl: string) => {
  const result = Effect.runSyncExit(getFolderId(folderUrl));
  return result._op === 'Success' ? result.value : result.cause.toString();
};

test('can extract folderID', () =>
  expect(
    getFolderIdEffect(
      'https://mediaweb.ap.panopto.com/Panopto/Pages/Sessions/List.aspx#folderID="4bf1e9b5-2c4b-4f2c-8883-b05d0063d096"',
    ),
  ).toBe('4bf1e9b5-2c4b-4f2c-8883-b05d0063d096'));

test('will fail on bad URLs', () =>
  expect(getFolderIdEffect('https://mediaweb.ap.panopto.com/Panopto/Pages/Sessions/List.aspx')).toStartWith(
    'InvalidFolderURLError',
  ));

test('will fail on non-URL strings', () => expect(getFolderIdEffect('hello world')).toStartWith('ParseError'));
