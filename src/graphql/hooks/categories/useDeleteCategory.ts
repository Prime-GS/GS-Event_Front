import { useMutation } from '@apollo/client'

import { DELETE_CATEGORY, GET_CATEGORIES } from '@/graphql/queries'
import { IDeleteVariables } from '@/graphql/types/common'

export const useDeleteCategory = () => {
  return useMutation<boolean, IDeleteVariables>(DELETE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
  })
}
