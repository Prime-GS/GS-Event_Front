import { useMutation } from '@apollo/client'

import { DELETE_EVENT, GET_EVENTS } from '@/graphql/queries'
import { IDeleteVariables } from '@/graphql/types/common'

export const useDeleteEvent = () => {
  return useMutation<boolean, IDeleteVariables>(DELETE_EVENT, {
    refetchQueries: [GET_EVENTS],
  })
}
