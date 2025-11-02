import { getCaption } from '@/get-caption';
import { request } from '@/request';
import { getFolderId } from '@/utils';

interface Result {
  DeliveryID: string;
}

interface Session {
  d: {
    Results: Result[];
  };
}

const getSessions = async (folderId: string): Promise<Session | undefined> => {
  const body = JSON.stringify({
    queryParameters: {
      sortColumn: 1,
      maxResults: 99999,
      folderID: folderId,
    },
  });

  return request('Services/Data.svc/GetSessions', 'application/json', body);
};

const getCaptions = async (folderId: string): Promise<string | undefined> => {
  const sessions = await getSessions(folderId);

  if (!sessions) {
    return undefined;
  }

  const results = await Promise.all(sessions.d.Results.map(async ({ DeliveryID }) => getCaption(DeliveryID)));

  return !results.some((result) => !result) ? results.join('\n\n') : undefined;
};

async function main() {
  const folderUrl = prompt('[?] Folder URL: ');
  const folderId = getFolderId(folderUrl);

  if (!folderId) {
    throw new Error('Invalid folder URL!');
  }

  const captions = await getCaptions(folderId);

  if (!captions) {
    throw new Error('Either your cookies are invalid or the video does not exist!');
  }

  await Bun.write(`${folderId}.txt`, captions);
}

void main();
