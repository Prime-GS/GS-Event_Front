import { useQuery } from '@apollo/client'

import { IPaginationInput, ISearchInput, IGetVariables } from '@/graphql/types/common'
import { IEventsData } from '@/graphql/types/events'
import { GET_EVENTS } from '@/graphql/queries'

export const useEvents = (pagination?: IPaginationInput, filter?: ISearchInput) => {
  const { data, ...q } = useQuery<IEventsData, IGetVariables>(GET_EVENTS, {
    variables: {
      pagination,
      filter,
    },
    fetchPolicy: 'network-only',
  })

  const events = data?.events.data ?? []
  const total = data?.events.total ?? 0

  return {
    events,
    total,
    ...q,
  }
}
