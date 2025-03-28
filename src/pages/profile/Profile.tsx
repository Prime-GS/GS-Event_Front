import { Profile } from '@/sections/users/Profile'

export default function ProfilePage() {
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header bg-primary text-white'>
          <h3>Профиль</h3>
        </div>
        <Profile />
      </div>
    </div>
  )
}
