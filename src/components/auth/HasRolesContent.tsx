import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores/hooks'

interface IProps {
  roles: string[]
}

export const HasRolesContent: React.FC<IProps & PropsWithChildren> = observer(({ roles, children }) => {
  const { authStore } = useStores()
  const isUserHasRoles = authStore.hasAnyRole(roles)

  if (roles.length === 0) {
    return children
  }

  if (!isUserHasRoles) {
    return null
  }

  return children
})
