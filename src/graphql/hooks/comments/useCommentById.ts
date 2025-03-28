import { useQuery } from '@apollo/client'

import { ICommentByIdData } from '@/graphql/types/comments'
import { IGetByIdVariables } from '@/graphql/types/common'
import { GET_COMMENT_BY_ID } from '@/graphql/queries'

export const useCommentById = (id: number) => {
  const { data, ...q } = useQuery<ICommentByIdData, IGetByIdVariables>(GET_COMMENT_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only',
  })

  const comment = data?.comment

  return {
    comment,
    ...q,
  }
}
