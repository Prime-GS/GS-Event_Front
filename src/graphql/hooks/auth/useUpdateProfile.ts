import { useMutation } from '@apollo/client'
import { ME, UPDATE_PROFILE } from '../../queries/auth'
import { IUpdateProfileData, IUpdateProfileVariables } from '../../types/auth'

export const useProfileUser = () => {
  return useMutation<IUpdateProfileData, IUpdateProfileVariables>(UPDATE_PROFILE, {
    refetchQueries: [ME],
  })
}
