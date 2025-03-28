import { useStores } from '@/stores/hooks'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { authStore } = useStores()

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header bg-primary text-white'>
          <h3>Профиль</h3>
        </div>
        <div className='card-body'>
          <h5 className='card-title'>{authStore.user?.username}</h5>
          <p className='card-text'>Email: {authStore.user?.email}</p>
          {authStore.user?.roles && (
            <p className='card-text'>Роли: {authStore.user?.roles.map((role) => role).join(', ')}</p>
          )}
          <Link to='/profile/update'>
            <button className='btn btn-primary'>Редактировать профиль</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
