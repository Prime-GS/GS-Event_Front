import { useMutation } from '@apollo/client'

import { IUpsertEventData, IUpsertEventVariables } from '@/graphql/types/events'
import { UPSERT_EVENT } from '@/graphql/queries'

export const useUpsertEvent = () => {
  return useMutation<IUpsertEventData, IUpsertEventVariables>(UPSERT_EVENT)
}
