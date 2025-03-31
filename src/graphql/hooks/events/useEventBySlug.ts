import { useQuery } from '@apollo/client'

import { IEventBySlugData } from '@/graphql/types/events'
import { IGetBySlugVariables } from '@/graphql/types/common'
import { GET_EVENT_BY_SLUG } from '@/graphql/queries'

export const useEventBySlug = (slug: string) => {
  const { data, ...q } = useQuery<IEventBySlugData, IGetBySlugVariables>(GET_EVENT_BY_SLUG, {
    variables: { slug },
    fetchPolicy: 'network-only',
  })

  const event = data?.eventBySlug

  return {
    event,
    ...q,
  }
}
