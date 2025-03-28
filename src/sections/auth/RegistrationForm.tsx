import { Form as FormikForm, FormikProvider, useFormik } from 'formik'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useCheckEmail } from '@/graphql/hooks/auth/useCheckEmail'
import { useRegistration } from '@/graphql/hooks/auth'

import { LoadingButton } from '@/components/UI'
import { useStores } from '@/stores/hooks'

interface IFormValues {
  username: string
  email: string
  password: string
  afterSubmit?: string
}

export function RegistrationForm() {
  const [checkEmail] = useCheckEmail()
  const [registration, { loading }] = useRegistration()
  const { authStore } = useStores()
  const navigate = useNavigate()

  const RegistrationSchema = Yup.object().shape({
    username: Yup.string().required('Имя пользователя обязательно'),
    email: Yup.string().email('Почта не валидна').required('Почта обязательна'),
    password: Yup.string().min(8, 'Пароль должен иметь минимум 8 символов').required('Пароль обязателен'),
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values, formHelper) => {
      try {
        const check = await checkEmail({ variables: { email: values.email } })
        if (!check.data?.checkEmail) {
          formHelper.setErrors({ afterSubmit: `Почта ${values.email} уже занята` })
          return
        }

        const { data } = await registration({ variables: { input: { ...values } } })

        if (data?.registration) {
          authStore.login(data.registration.user, data.registration.token, true)
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

        {!!errors.username && <small className='text-danger'>{errors.username}</small>}
        <FloatingLabel label={`Имя пользователя *`} className='mb-3'>
          <Form.Control required {...getFieldProps('username')} />
        </FloatingLabel>

        {!!errors.email && <small className='text-danger'>{errors.email}</small>}
        <FloatingLabel label={`Email *`} className='mb-3'>
          <Form.Control type='email' required {...getFieldProps('email')} />
        </FloatingLabel>

        {!!errors.password && <small className='text-danger'>{errors.password}</small>}
        <FloatingLabel label={`Пароль *`} className='mb-3'>
          <Form.Control type='password' required {...getFieldProps('password')} />
        </FloatingLabel>

        <LoadingButton className='btn-primary mb-3' loading={loading} type='submit' variant='contained'>
          Регистрация
        </LoadingButton>
      </FormikForm>
    </FormikProvider>
  )
}
