import { LoginForm } from '@/sections/auth'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='row mt-5'>
      <div className='col col-md-6 mx-auto'>
        <h4 className='mb-3'>Вход</h4>

        <LoginForm />

        <div className='text-right'>
          <Link to='/auth/registration'>Нет аккаунта?</Link>
        </div>
      </div>
    </div>
  )
}
