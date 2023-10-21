import { config } from '@/config'
import { get_folder_id, replace_character } from '@/utils'

interface Result {
  DeliveryID: string
}

interface Session {
  d: {
    Results: Result[]
  }
}

interface Delivery {
  Caption: string
}

const request = async <T>(endpoint: string, content_type: string, body: BodyInit): Promise<T> => {
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

const get_sessions = async (folder_id: string): Promise<Session> => {
  const body = JSON.stringify({
    queryParameters: {
      sortColumn: 1,
      maxResults: 99999,
      folderID: folder_id,
    },
  })

  return request('Services/Data.svc/GetSessions', 'application/json', body)
}

const get_deliveries = async (delivery_id: string): Promise<Delivery[]> => {
  const body = new URLSearchParams({
    deliveryId: delivery_id,
    getCaptions: 'true',
    language: '0',
    responseType: 'json',
  })

  return request('Pages/Viewer/DeliveryInfo.aspx', 'application/x-www-form-urlencoded', body)
}

const get_captions = async (folder_id: string): Promise<string> => {
  const sessions = await get_sessions(folder_id)

  const results = await Promise.all(
    sessions.d.Results.map(async ({ DeliveryID }) => {
      const deliveries = await get_deliveries(DeliveryID)
      return deliveries.map(({ Caption }) => replace_character(Caption.trim(), '\n', ' ')).join(' ')
    }),
  )

  return results.join('\n\n')
}

async function main() {
  const folder_url = prompt('[?] Folder URL: ')
  const folder_id = get_folder_id(folder_url)

  if (!folder_id) {
    throw new Error('Invalid folder URL!')
  }

  await Bun.write(`${folder_id}.txt`, await get_captions(folder_id))
}

void main()
