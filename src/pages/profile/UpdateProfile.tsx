import { useNavigate } from 'react-router-dom'

import { UpdateProfileForm } from '@/sections/users/UpdateUserForm'
import { useStores } from '@/stores/hooks'

export default function UpdateProfile() {
  const navigate = useNavigate()
  const { authStore } = useStores()
  if (!authStore.user || !authStore.isLoggedIn) {
    navigate('/404')
    return
  }

  const { id, username, email } = authStore.user

  return (
    <div className='row mt-5'>
      <div className='col col-md-6 mx-auto mx-auto'>
        <h4 className='mb-3'>Обновление {username}</h4>
        <UpdateProfileForm user={{ id, username, email }} />
      </div>
    </div>
  )
}
