import { z } from 'zod';
import { request } from '@/request';
import { replaceCharacter } from '@/utils';

const DeliveriesSchema = z.array(
  z.object({
    Caption: z.string(),
  }),
);

type Deliveries = z.infer<typeof DeliveriesSchema>;

const getDeliveries = async (deliveryId: string): Promise<Deliveries | undefined> => {
  const body = new URLSearchParams({
    deliveryId,
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

export const getCaption = async (deliveryId: string): Promise<string | undefined> => {
  const deliveries = await getDeliveries(deliveryId);

  return deliveries
    ? deliveries.map(({ Caption }) => replaceCharacter(Caption.trim(), '\n', ' ')).join(' ')
    : undefined;
};
