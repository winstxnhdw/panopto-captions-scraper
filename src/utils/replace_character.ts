export const replace_character = (string: string, character: string, replacement: string) =>
  string.replace(new RegExp(character, 'g'), replacement)
