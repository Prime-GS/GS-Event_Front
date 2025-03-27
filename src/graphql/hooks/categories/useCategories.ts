import { useQuery } from '@apollo/client'

import { IPaginationInput, ISearchInput, IGetVariables } from '@/graphql/types/common'
import { ICategoriesData } from '@/graphql/types/categories'
import { GET_CATEGORIES } from '@/graphql/queries'

export const useCategories = (pagination?: IPaginationInput, filter?: ISearchInput) => {
  const { data, ...q } = useQuery<ICategoriesData, IGetVariables>(GET_CATEGORIES, {
    variables: {
      pagination,
      filter,
    },
    fetchPolicy: 'network-only',
  })

  const categories = data?.categories.data ?? []
  const total = data?.categories.total ?? 0

  return {
    categories,
    total,
    ...q,
  }
}
