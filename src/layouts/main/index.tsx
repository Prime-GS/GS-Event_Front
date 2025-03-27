import { Outlet } from 'react-router-dom'

import { Header } from '@/components/layout/Header'

export function MainLayout() {
  return (
    <div data-bs-theme='dark'>
      <Header />
      <div className='main-layout'>
        <Outlet />
      </div>
    </div>
  )
}
