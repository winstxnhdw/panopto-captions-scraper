import { config } from '@/config'

export const request = async <T>(endpoint: string, content_type: string, body: BodyInit): Promise<T> => {
  const request = await fetch(`https://mediaweb.ap.panopto.com/Panopto/${endpoint}`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': content_type,
      Cookie: config.COOKIE,
    },
  })

  return request.json()
}
