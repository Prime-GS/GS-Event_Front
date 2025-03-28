import { useMutation } from '@apollo/client'

import { IRegistrationData, IRegistrationVariables } from '@/graphql/types/auth'
import { REGISTRATION } from '@/graphql/queries'

export const useRegistration = () => {
  return useMutation<IRegistrationData, IRegistrationVariables>(REGISTRATION)
}
