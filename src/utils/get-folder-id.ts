import { z } from 'zod';
import { replaceCharacter } from '@/utils';

export const getFolderId = (folderUrl: string | null): string | undefined => {
  const verifiedUrl = z.string().url().safeParse(folderUrl);

  if (!verifiedUrl.success) {
    return undefined;
  }

  const folderIdParameter = new URLSearchParams(new URL(verifiedUrl.data).hash.substring(1)).get('folderID');

  return folderIdParameter ? replaceCharacter(folderIdParameter, '"', '') : undefined;
};
