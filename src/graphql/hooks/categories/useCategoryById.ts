import { useQuery } from '@apollo/client'

import { ICategoryByIdData } from '@/graphql/types/categories'
import { IGetByIdVariables } from '@/graphql/types/common'
import { GET_CATEGORY_BY_ID } from '@/graphql/queries'

export const useCategoryById = (id: number) => {
  const { data, ...q } = useQuery<ICategoryByIdData, IGetByIdVariables>(GET_CATEGORY_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only',
  })

  const category = data?.category

  return {
    category,
    ...q,
  }
}
