import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../../queries/users'
import { IGetUserByIdData, IGetUserByIdVariables } from '../../types/users'

export const useUserById = (id: number) => {
  const { data, ...q } = useQuery<IGetUserByIdData, IGetUserByIdVariables>(GET_USER_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only',
  })

  const user = data?.user

  return {
    user,
    ...q,
  }
}
