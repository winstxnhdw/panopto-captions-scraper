import { get_folder_id } from '@/utils'
import { expect, test } from 'bun:test'

test('can extract folderID', () =>
  expect(
    get_folder_id(
      'https://mediaweb.ap.panopto.com/Panopto/Pages/Sessions/List.aspx#folderID="4bf1e9b5-2c4b-4f2c-8883-b05d0063d096"',
    ),
  ).toBe('4bf1e9b5-2c4b-4f2c-8883-b05d0063d096'))

test('can handle nulls', () => expect(get_folder_id(null)).toBeUndefined())

test('can handle bad URLs', () =>
  expect(get_folder_id('https://mediaweb.ap.panopto.com/Panopto/Pages/Sessions/List.aspx')).toBeUndefined())
