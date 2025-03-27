import { useMutation } from '@apollo/client'
import { GET_USERS, UPDATE_USER } from '../../queries/users'
import { IUpdateUserData, IUpdateUserVariables } from '../../types/users'

export const useUpdateUser = () => {
  return useMutation<IUpdateUserData, IUpdateUserVariables>(UPDATE_USER, {
    refetchQueries: [GET_USERS],
  })
}
