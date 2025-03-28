import { useQuery } from '@apollo/client'

import { IPaginationInput, ISearchInput } from '@/graphql/types/common'
import { ICommentsByEventData, ICommentsByEventVaries } from '@/graphql/types/comments'
import { GET_COMMENTS_BY_EVENT } from '@/graphql/queries/comment'

export const useComments = (id: number, pagination?: IPaginationInput, filter?: ISearchInput) => {
  const { data, ...q } = useQuery<ICommentsByEventData, ICommentsByEventVaries>(GET_COMMENTS_BY_EVENT, {
    variables: {
      id,
      pagination,
      filter,
    },
    fetchPolicy: 'network-only',
  })

  const comments = data?.commentsByEvent.data ?? []
  const total = data?.commentsByEvent.total ?? 0

  return {
    comments,
    total,
    ...q,
  }
}
