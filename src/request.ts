import { config } from '@/config';

export const request = async <T>(endpoint: string, contentType: string, body: BodyInit): Promise<T | undefined> => {
  const response = await fetch(`https://mediaweb.ap.panopto.com/Panopto/${endpoint}`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': contentType,
      Cookie: config.COOKIE,
    },
  });

  try {
    return response.json();
  } catch {
    return undefined;
  }
};
