import { replace_character } from '@/utils'

export const get_folder_id = (folder_url: string | null): string | undefined => {
  if (!folder_url) {
    return undefined
  }

  const folder_id_parameter = new URLSearchParams(new URL(folder_url).hash.substring(1)).get('folderID')
  return folder_id_parameter ? replace_character(folder_id_parameter, '"', '') : undefined
}
