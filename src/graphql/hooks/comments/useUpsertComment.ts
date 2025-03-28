import { useMutation } from '@apollo/client'

import { IUpsertCommentData, IUpsertCommentVariables } from '@/graphql/types/comments'
import { UPSERT_COMMENT } from '@/graphql/queries'

export const useUpsertComment = () => {
  return useMutation<IUpsertCommentData, IUpsertCommentVariables>(UPSERT_COMMENT)
}
