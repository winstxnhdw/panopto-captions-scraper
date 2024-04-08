import { get_caption } from '@/get_caption'
import { request } from '@/request'
import { get_folder_id } from '@/utils'

interface Result {
  DeliveryID: string
}

interface Session {
  d: {
    Results: Result[]
  }
}

const get_sessions = async (folder_id: string): Promise<Session | undefined> => {
  const body = JSON.stringify({
    queryParameters: {
      sortColumn: 1,
      maxResults: 99999,
      folderID: folder_id,
    },
  })

  return request('Services/Data.svc/GetSessions', 'application/json', body)
}

const get_captions = async (folder_id: string): Promise<string | undefined> => {
  const sessions = await get_sessions(folder_id)

  if (!sessions) {
    return undefined
  }

  const results = await Promise.all(sessions.d.Results.map(async ({ DeliveryID }) => get_caption(DeliveryID)))

  return !results.some((result) => !result) ? results.join('\n\n') : undefined
}

async function main() {
  const folder_url = prompt('[?] Folder URL: ')
  const folder_id = get_folder_id(folder_url)

  if (!folder_id) {
    throw new Error('Invalid folder URL!')
  }

  const captions = await get_captions(folder_id)

  if (!captions) {
    throw new Error('Either your cookies are invalid or the video does not exist!')
  }

  await Bun.write(`${folder_id}.txt`, captions)
}

void main()
