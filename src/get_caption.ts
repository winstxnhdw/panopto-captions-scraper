import { request } from '@/request'
import { replace_character } from '@/utils'

interface Delivery {
  Caption: string
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

export const get_caption = async (delivery_id: string): Promise<string> => {
  const deliveries = await get_deliveries(delivery_id)
  return deliveries.map(({ Caption }) => replace_character(Caption.trim(), '\n', ' ')).join(' ')
}
