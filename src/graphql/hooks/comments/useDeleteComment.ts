import { useMutation } from '@apollo/client'

import { DELETE_COMMENT, GET_CATEGORIES } from '@/graphql/queries'
import { IDeleteVariables } from '@/graphql/types/common'

export const useDeleteComment = () => {
  return useMutation<boolean, IDeleteVariables>(DELETE_COMMENT, {
    refetchQueries: [GET_CATEGORIES],
  })
}
