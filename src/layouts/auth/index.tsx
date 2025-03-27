import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <div className='main-layout'>
        <Outlet />
      </div>
    </>
  )
}
