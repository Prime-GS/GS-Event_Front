import { useMutation } from '@apollo/client'
import { LOGIN } from '../../queries/auth'
import { ILoginData, ILoginVariables } from '../../types/auth'

export const useLogin = () => {
  return useMutation<ILoginData, ILoginVariables>(LOGIN)
}
