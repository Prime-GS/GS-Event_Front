import { useMutation } from '@apollo/client'

import { ISubscribeData, ISubscribeVariable } from '@/graphql/types/events'
import { TOGGLE_SUBSCRIBE } from '@/graphql/queries'

export const useToggleSubscribe = () => {
  return useMutation<ISubscribeData, ISubscribeVariable>(TOGGLE_SUBSCRIBE)
}
