import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries/users'
import { IGetUsersData, IGetUsersVariables } from '../../types/users'
import { IPaginationInput, ISearchInput } from '../../types/common'

export const useUsers = (pagination?: IPaginationInput, filter?: ISearchInput) => {
  const { data, ...q } = useQuery<IGetUsersData, IGetUsersVariables>(GET_USERS, {
    variables: {
      pagination,
      filter,
    },
    fetchPolicy: 'network-only',
  })

  const users = data?.users.data ?? []
  const total = data?.users.total ?? 0

  return {
    users,
    total,
    ...q,
  }
}
