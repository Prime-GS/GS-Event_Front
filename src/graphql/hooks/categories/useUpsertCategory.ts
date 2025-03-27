import { useMutation } from '@apollo/client'

import { IUpsertCategoryData, IUpsertCategoryVariables } from '@/graphql/types/categories'
import { UPSERT_CATEGORY } from '@/graphql/queries'

export const useUpsertCategory = () => {
  return useMutation<IUpsertCategoryData, IUpsertCategoryVariables>(UPSERT_CATEGORY)
}
