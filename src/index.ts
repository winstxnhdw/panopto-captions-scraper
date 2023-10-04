import { config } from '@/config'

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

const get_sessions = async (folder_id: string): Promise<Session> => {
  const sessions_request = await fetch('https://mediaweb.ap.panopto.com/Panopto/Services/Data.svc/GetSessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: config.COOKIE,
    },
    body: JSON.stringify({
      queryParameters: {
        sortColumn: 1,
        maxResults: 99999,
        folderID: folder_id,
      },
    }),
  })

  return sessions_request.json()
}

const get_deliveries = async (delivery_id: string): Promise<Delivery[]> => {
  const deliveries_request = await fetch('https://mediaweb.ap.panopto.com/Panopto/Pages/Viewer/DeliveryInfo.aspx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: config.COOKIE,
    },
    body: new URLSearchParams({
      deliveryId: delivery_id,
      getCaptions: 'true',
      language: '0',
      responseType: 'json',
    }),
  })

  return deliveries_request.json()
}

async function main() {
  const folder_url = prompt('[?] Folder URL: ')

  if (!folder_url) {
    throw new Error('Invalid folder URL!')
  }

  const folder_id = new URLSearchParams(new URL(folder_url).hash.substring(1)).get('folderID')?.replace(/"/g, '')

  if (!folder_id) {
    throw new Error('Invalid folder URL!')
  }

  const sessions = await get_sessions(folder_id)

  const results = await Promise.all(
    sessions.d.Results.map(async ({ DeliveryID }) => {
      const deliveries = await get_deliveries(DeliveryID)
      return deliveries.map((delivery) => delivery.Caption.trim().replace(/\n/g, ' ')).join(' ')
    }),
  )

  await Bun.write(`${folder_id}.txt`, results.join('\n\n'))
}

void main()
