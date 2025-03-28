import { useNavigate } from 'react-router-dom'
import { Form as FormikForm, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'

import { LoadingButton } from '@/components/UI'
import { useLogin } from '@/graphql/hooks/auth'
import { useStores } from '@/stores/hooks'
import { FloatingLabel, Form } from 'react-bootstrap'

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
      } catch (error: any) {
        console.log(error)
        formHelper.setErrors({ afterSubmit: error })
      }
    },
  })

  const { errors, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <FormikForm autoComplete='off' noValidate onSubmit={handleSubmit}>
        {!!errors.afterSubmit && (
          <div className='alert alert-danger' role='alert'>
            {errors.afterSubmit}
          </div>
        )}

        {!!errors.login && <small className='text-danger'>{errors.login}</small>}
        <FloatingLabel label={`Username/Email *`} className='mb-3'>
          <Form.Control required {...getFieldProps('login')} />
        </FloatingLabel>

        {!!errors.password && <small className='text-danger'>{errors.password}</small>}
        <FloatingLabel label={`Пароль *`} className='mb-3'>
          <Form.Control type='password' required {...getFieldProps('password')} />
        </FloatingLabel>

        <LoadingButton className='btn-primary mb-3' loading={loading} type='submit' variant='contained'>
          Вход
        </LoadingButton>
      </FormikForm>
    </FormikProvider>
  )
}
