import { useMutation } from '@apollo/client'
import { DELETE_USER, GET_USERS } from '../../queries/users'
import { IDeleteVariables } from '../../types/locations'

export const useDeleteUser = () => {
  return useMutation<boolean, IDeleteVariables>(DELETE_USER, {
    refetchQueries: [GET_USERS],
  })
}
