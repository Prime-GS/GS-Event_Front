import { useMutation } from '@apollo/client'
import { ICreateUserData, ICreateUserVariables } from '../../types/users'
import { CREATE_USER, GET_USERS } from '../../queries/users'

export const useCreateUser = () => {
  return useMutation<ICreateUserData, ICreateUserVariables>(CREATE_USER, {
    refetchQueries: [GET_USERS],
  })
}
