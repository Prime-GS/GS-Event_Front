import { Header } from '@/components/layout/Header'
import { Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <>
      <Header />
      <div className='main-layout'>
        <Outlet />
      </div>
    </>
  )
}
