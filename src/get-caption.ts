import { z } from 'zod';
import { request } from '@/request';
import { replaceCharacter } from '@/utils';

const DeliverySchema = z.object({
  Delivery: z.object({
    AvailableCaptions: z.array(
      z.object({
        Language: z.number().transform((number) => number.toString()),
      }),
    ),
  }),
});

const CaptionsSchema = z.array(
  z.object({
    Caption: z.string(),
  }),
);

type Captions = z.infer<typeof CaptionsSchema>;
type Delivery = z.infer<typeof DeliverySchema>;

const getDeliveries = async (deliveryId: string): Promise<Captions | undefined> => {
  const deliveryBody = new URLSearchParams({
    deliveryId,
    responseType: 'json',
  });

  const deliveryRequest = await request<Delivery>(
    'Pages/Viewer/DeliveryInfo.aspx',
    'application/x-www-form-urlencoded',
    deliveryBody,
  );

  const deliveryResponse = await DeliverySchema.parseAsync(deliveryRequest);
  const language = deliveryResponse.Delivery.AvailableCaptions.at(0)?.Language;

  if (!language) {
    throw new Error('No captions available for this video!');
  }

  const captionsBody = new URLSearchParams({
    deliveryId,
    getCaptions: 'true',
    language: language,
    responseType: 'json',
  });

  const captionsRequest = await request<Captions>(
    'Pages/Viewer/DeliveryInfo.aspx',
    'application/x-www-form-urlencoded',
    captionsBody,
  );

  return CaptionsSchema.safeParse(captionsRequest).success ? captionsRequest : undefined;
};

export const getCaption = async (deliveryId: string): Promise<string | undefined> => {
  const deliveries = await getDeliveries(deliveryId);

  return deliveries
    ? deliveries.map(({ Caption }) => replaceCharacter(Caption.trim(), '\n', ' ')).join(' ')
    : undefined;
};
