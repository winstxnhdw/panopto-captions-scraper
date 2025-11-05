import { Data, Effect, Schema } from 'effect';
import { request } from '@/request';
import { replaceCharacter } from '@/utils';

class NoCaptionsAvailableError extends Data.TaggedError('NoCaptionsAvailableError') {}

const CaptionsSchema = Schema.Array(Schema.Struct({ Caption: Schema.String }));
const DeliverySchema = Schema.Struct({
  Delivery: Schema.Struct({ AvailableCaptions: Schema.Array(Schema.Struct({ Language: Schema.Number })) }),
});

const getLanguage = (deliveryId: string) =>
  Effect.gen(function* () {
    const deliveryBody = new URLSearchParams({
      deliveryId,
      responseType: 'json',
    });

    const deliveryResponse = yield* request(
      'Pages/Viewer/DeliveryInfo.aspx',
      'application/x-www-form-urlencoded',
      deliveryBody,
      DeliverySchema,
    );

    const language = deliveryResponse.Delivery.AvailableCaptions.at(0);
    return yield* language ? Effect.succeed(language.Language.toString()) : Effect.fail(new NoCaptionsAvailableError());
  });

export const getCaption = (deliveryId: string) =>
  Effect.gen(function* () {
    const captionsBody = new URLSearchParams({
      deliveryId,
      getCaptions: 'true',
      language: yield* getLanguage(deliveryId),
      responseType: 'json',
    });

    const captionsResponse = yield* request(
      'Pages/Viewer/DeliveryInfo.aspx',
      'application/x-www-form-urlencoded',
      captionsBody,
      CaptionsSchema,
    );

    yield* Effect.logDebug(`Fetched ${captionsResponse.length} captions for video ${deliveryId}`);
    return captionsResponse.map(({ Caption }) => replaceCharacter(Caption.trim(), '\n', ' ')).join(' ');
  });
