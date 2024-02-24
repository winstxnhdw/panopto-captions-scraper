import { replace_character } from '@/utils'
import { z } from 'zod'

export const get_folder_id = (folder_url: string | null): string | undefined => {
  const verified_url = z.string().url().safeParse(folder_url)

  if (!verified_url.success) {
    return undefined
  }

  const folder_id_parameter = new URLSearchParams(new URL(verified_url.data).hash.substring(1)).get(
    'folderID',
  )

  return folder_id_parameter ? replace_character(folder_id_parameter, '"', '') : undefined
}
