import { useNavigate } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'

import { LoadingButton } from '@/components/UI'
import { useLogin } from '@/graphql/hooks/auth'
import { useStores } from '@/stores/hooks'

interface IFormValues {
  login: string
  password: string
  afterSubmit?: string
}

export function LoginForm() {
  const [login, { loading }] = useLogin()
  const { authStore } = useStores()
  const navigate = useNavigate()

  const LoginSchema = Yup.object().shape({
    login: Yup.string().required('Логин обязателен'),
    password: Yup.string().required('Пароль обязателен'),
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, formHelper) => {
      try {
        const { data } = await login({ variables: { input: { ...values } } })

        if (data?.login) {
          authStore.login(data.login.user, data.login.token, true)
          navigate('/')
        }
      } catch (error) {
        formHelper.setErrors({ afterSubmit: 'Неверные данные' })
      }
    },
  })

  const { errors, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        {!!errors.afterSubmit && (
          <div className='alert alert-danger' role='alert'>
            {errors.afterSubmit}
          </div>
        )}

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Логин/Email
          </label>
          <input
            id='email'
            type='email'
            className='form-control'
            placeholder='name@example.com'
            {...getFieldProps('login')}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Пароль
          </label>
          <input id='password' type='password' className='form-control' {...getFieldProps('password')} />
        </div>

        <LoadingButton className='mb-3' loading={loading} type='submit' variant='contained'>
          Войти
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
