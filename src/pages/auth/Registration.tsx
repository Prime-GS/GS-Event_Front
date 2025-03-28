import { Link } from 'react-router-dom'

import { RegistrationForm } from '@/sections/auth'

export default function Registration() {
  return (
    <div className='row mt-5'>
      <div className='col col-md-6 mx-auto mx-auto'>
        <h4 className='mb-3'>Регистрация</h4>

        <RegistrationForm />

        <div className='text-right'>
          <Link to='/auth/login'>Есть аккаунт?</Link>
        </div>
      </div>
    </div>
  )
}
