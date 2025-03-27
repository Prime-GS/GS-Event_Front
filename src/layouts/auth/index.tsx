import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div data-bs-theme='dark'>
      <div className='main-layout'>
        <Outlet />
      </div>
    </div>
  )
}
