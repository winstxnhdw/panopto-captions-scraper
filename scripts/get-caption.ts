import { getCaption } from '@/get-caption';

async function main() {
  const deliveryId = prompt('[?] Video ID: ');

  if (!deliveryId) {
    throw new Error('Invalid video ID!');
  }

  const caption = await getCaption(deliveryId);

  if (!caption) {
    throw new Error('Either your cookies are invalid or the video does not exist!');
  }

  await Bun.write(`${deliveryId}.txt`, caption);
}

void main();
