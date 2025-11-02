export const replaceCharacter = (source: string, character: string, replacement: string) =>
  source.replace(new RegExp(character, 'g'), replacement);
