import { z } from 'zod';
import { request } from '@/request';
import { replace_character } from '@/utils';

const DeliveriesSchema = z.array(
  z.object({
    Caption: z.string(),
  }),
);

type Deliveries = z.infer<typeof DeliveriesSchema>;

const get_deliveries = async (delivery_id: string): Promise<Deliveries | undefined> => {
  const body = new URLSearchParams({
    deliveryId: delivery_id,
    getCaptions: 'true',
    language: '0',
    responseType: 'json',
  });

  const response = await request<Deliveries>(
    'Pages/Viewer/DeliveryInfo.aspx',
    'application/x-www-form-urlencoded',
    body,
  );

  return DeliveriesSchema.safeParse(response).success ? response : undefined;
};

export const get_caption = async (delivery_id: string): Promise<string | undefined> => {
  const deliveries = await get_deliveries(delivery_id);

  return deliveries
    ? deliveries.map(({ Caption }) => replace_character(Caption.trim(), '\n', ' ')).join(' ')
    : undefined;
};
