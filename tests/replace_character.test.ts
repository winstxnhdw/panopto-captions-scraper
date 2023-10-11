import { replace_character } from '@/utils/replace_character.js'
import { expect, test } from 'bun:test'

test('replace_character', () => {
  const original_characters = ['a/b/c', '"hello world"', 'this is a\n\nmultiline\nstring\n'] as const
  const replaced_characters = ['a_b_c', 'hello world', 'this is a  multiline string '] as const
  const characters = ['/', '"', '\n'] as const
  const replacement_characters = ['_', '', ' '] as const
  const indices = [0, 1, 2] as const

  for (const i of indices) {
    expect(replace_character(original_characters[i], characters[i], replacement_characters[i])).toBe(
      replaced_characters[i],
    )
  }
})
