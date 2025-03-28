import { Form as FormikForm, FormikProvider, useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as Yup from 'yup'

import { useUpdateUser } from '@/graphql/hooks/users'

import { LoadingButton } from '@/components/UI'
import { FloatingLabel, Form } from 'react-bootstrap'

interface IFormValues {
  id: number
  username: string
  email: string
  password?: string
  afterSubmit?: string
}

export function UpdateProfileForm({ user }: { user: IFormValues }) {
  const [update, { loading }] = useUpdateUser()
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  const categorySchema = Yup.object().shape({
    username: Yup.string().required('Имя пользователя обязательно'),
    email: Yup.string().email('Почта не валидна').required('Почта обязательна'),
    password: Yup.string().min(8).optional(),
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      ...user,
      password: '',
    },
    validationSchema: categorySchema,
    onSubmit: async (values, formHelper) => {
      try {
        const { data } = await update({ variables: { input: { ...values, password: values.password ?? undefined } } })

        if (data?.updateUser) {
          navigate('/profile')
        }
      } catch (error) {
        console.log(error)
        formHelper.setErrors({ afterSubmit: 'Неверные данные' })
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
          <Form.Control required {...getFieldProps('email')} />
        </FloatingLabel>

        <Form.Check // prettier-ignore
          type='switch'
          label='Менять пароль?'
          onChange={togglePassword}
          className='mb-3'
        />

        {showPassword && (
          <>
            {!!errors.password && <small className='text-danger'>{errors.password}</small>}
            <FloatingLabel label={`Пароль`} className='mb-3'>
              <Form.Control required {...getFieldProps('password')} />
            </FloatingLabel>
          </>
        )}
        <Link to='/profile'>
          <button type='button' className='btn btn-outline-secondary'>
            Отмена
          </button>
        </Link>
        <LoadingButton className='btn-primary ms-3' loading={loading} type='submit' variant='contained'>
          Редактировать
        </LoadingButton>
      </FormikForm>
    </FormikProvider>
  )
}
