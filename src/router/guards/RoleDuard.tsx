import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react-lite'

import { useStores } from '../../stores/hooks'

type IProps = {
  roles: string[]
}

export const RoleGuard: React.FC<PropsWithChildren & IProps> = observer(({ children, roles }) => {
  const { authStore } = useStores()

  if (!authStore.hasAnyRole(roles)) {
    return null
  }

  return <>{children}</>
})
