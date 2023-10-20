import { replace_character } from '@/utils'
import { expect, test } from 'bun:test'

test('can replace word', () => expect(replace_character('a/b/c', '/', '_')).toBe('a_b_c'))

test('can replace word with whitespace', () => expect(replace_character('"hello world"', '"', '')).toBe('hello world'))

test('can replace newlines', () =>
  expect(replace_character('this is a\n\nmultiline\nstring\n', '\n', ' ')).toBe('this is a  multiline string '))
