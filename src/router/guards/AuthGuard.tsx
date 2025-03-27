import React, { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useStores } from '@/stores/hooks'
import { Loader } from '@/components/UI'

export const AuthGuard: React.FC<PropsWithChildren> = observer(({ children }) => {
  const { authStore } = useStores()
  const { pathname } = useLocation()

  if (authStore.loading) {
    return <Loader full />
  }

  if (!authStore.isLoggedIn) {
    return <Navigate to={{ pathname: '/auth/login' }} state={{ from: pathname }} />
  }

  return <>{children}</>
})
