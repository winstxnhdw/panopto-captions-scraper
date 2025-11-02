import { expect, test } from 'bun:test';
import { replaceCharacter } from '@/utils';

test('can replace word', () => expect(replaceCharacter('a/b/c', '/', '_')).toBe('a_b_c'));

test('can replace word with whitespace', () => expect(replaceCharacter('"hello world"', '"', '')).toBe('hello world'));

test('can replace newlines', () =>
  expect(replaceCharacter('this is a\n\nmultiline\nstring\n', '\n', ' ')).toBe('this is a  multiline string '));
