import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useStores } from '../../stores/hooks'

export const GuestGuard: React.FC<PropsWithChildren> = observer(({ children }) => {
  const { authStore } = useStores()

  if (authStore.isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return <>{children}</>
})
