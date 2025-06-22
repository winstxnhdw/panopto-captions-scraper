import { get_caption } from '@/get_caption';

async function main() {
  const delivery_id = prompt('[?] Video ID: ');

  if (!delivery_id) {
    throw new Error('Invalid video ID!');
  }

  const caption = await get_caption(delivery_id);

  if (!caption) {
    throw new Error('Either your cookies are invalid or the video does not exist!');
  }

  await Bun.write(`${delivery_id}.txt`, caption);
}

void main();
