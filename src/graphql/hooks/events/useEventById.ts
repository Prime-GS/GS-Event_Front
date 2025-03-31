import { useQuery } from '@apollo/client'

import { IEventByIdData } from '@/graphql/types/events'
import { IGetByIdVariables } from '@/graphql/types/common'
import { GET_EVENT_BY_ID } from '@/graphql/queries'

export const useEventById = (id: number) => {
  const { data, ...q } = useQuery<IEventByIdData, IGetByIdVariables>(GET_EVENT_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only',
  })

  const event = data?.event

  return {
    event,
    ...q,
  }
}
