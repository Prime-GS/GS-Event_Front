import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { useStores } from '@/stores/hooks'

export const HeaderAccount = observer(() => {
  const { authStore } = useStores()
  const navigate = useNavigate()

  const logout = () => {
    authStore.logout()
    navigate('/auth/login')
  }

  return (
    <div>
      {authStore.isLoggedIn ? (
        <NavDropdown
          className='rounded-circle'
          title={<img src='/user-placeholder.png' width={32} height={32} className='rounded-circle' />}
        >
          <NavDropdown.Item className='m-0' disabled>
            {authStore.user?.username}
          </NavDropdown.Item>

          <Link to='/profile' className='m-0 w-100'>
            <NavDropdown.Item as='span'>Профиль</NavDropdown.Item>
          </Link>

          <NavDropdown.Divider />
          <NavDropdown.Item className='m-0' onClick={logout}>
            Выйти
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <div className='d-flex gap-2'>
          <Link to='/auth/registration' className='m-0'>
            <button type='button' className='btn btn-outline-light'>
              Регистрация
            </button>
          </Link>
          <Link to='/auth/login' className='m-0'>
            <button type='button' className='btn btn-primary'>
              Вход
            </button>
          </Link>
        </div>
      )}
    </div>
  )
})
