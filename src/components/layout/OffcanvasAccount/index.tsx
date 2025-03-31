import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useStores } from '@/stores/hooks'

export const OffcanvasAccount = observer(() => {
  const { authStore } = useStores()
  const navigate = useNavigate()

  const logout = () => {
    authStore.logout()
    navigate('/auth/login')
  }

  return (
    <div>
      {authStore.isLoggedIn ? (
        <div className='d-flex justify-content-around'>
          <img src='/user-placeholder.png' width={32} height={32} className='rounded-circle' />
          <span>{authStore.user?.username}</span>
          <Link to='/profile'>
            <button className='btn'>Профиль</button>
          </Link>
          <button className='btn' onClick={logout}>
            Выйти
          </button>
        </div>
      ) : (
        <div className='d-flex justify-content-around'>
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
