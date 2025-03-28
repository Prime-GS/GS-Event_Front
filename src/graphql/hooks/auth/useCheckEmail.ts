import { useMutation } from '@apollo/client'

import { CHECK_EMAIL } from '@/graphql/queries'
import { ICheckEmailData } from '@/graphql/types/auth'

export const useCheckEmail = () => {
  return useMutation<ICheckEmailData, { email: string }>(CHECK_EMAIL)
}
