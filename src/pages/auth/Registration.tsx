import { Link as RouterLink } from 'react-router-dom'

import { LoginForm } from '../../sections/auth'

export default function Login() {
  return (
    <Box>
      <Typography variant='h4' mb={3}>
        Регистрация
      </Typography>

      <LoginForm />

      <Box textAlign='right'>
        <Link component={RouterLink} to='/auth/forgot-password'>
          Забыли пароль?
        </Link>
      </Box>
    </Box>
  )
}
