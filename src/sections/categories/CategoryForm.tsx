import { Form as FormikForm, FormikProvider, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useUpsertCategory } from '@/graphql/hooks/categories'

import { LoadingButton } from '@/components/UI'
import { FloatingLabel, Form } from 'react-bootstrap'

interface IFormValues {
  id?: number
  title: string
  description?: string
  color?: string
  afterSubmit?: string
}

export function CategoryForm({
  category = { id: undefined, title: '', description: '', color: '' },
}: {
  category?: IFormValues
}) {
  const [upsert, { loading }] = useUpsertCategory()
  const navigate = useNavigate()

  const categorySchema = Yup.object().shape({
    title: Yup.string().required('Название обязательно'),
    description: Yup.string().optional(),
    color: Yup.string().optional(),
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      ...category,
    },
    validationSchema: categorySchema,
    onSubmit: async (values, formHelper) => {
      try {
        const { data } = await upsert({ variables: { input: { ...values } } })

        if (data?.upsertCategory) {
          navigate('/categories')
        }
      } catch (error) {
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

        {!!errors.title && <small className='text-danger'>{errors.title}</small>}
        <FloatingLabel label={`Название *`} className='mb-3'>
          <Form.Control required {...getFieldProps('title')} />
        </FloatingLabel>

        {!!errors.description && <small className='text-danger'>{errors.description}</small>}
        <FloatingLabel label={`Описание`} className='mb-3'>
          <Form.Control as='textarea' style={{ minHeight: '150px' }} {...getFieldProps('description')} />
        </FloatingLabel>

        {!!errors.color && <small className='text-danger'>{errors.color}</small>}
        <FloatingLabel label={`Цвет`} className='mb-3'>
          <Form.Control style={{ width: '60px' }} type='color' {...getFieldProps('color')} />
        </FloatingLabel>

        <LoadingButton className='mb-3 btn-primary' loading={loading} type='submit' variant='contained'>
          {category ? 'Редактировать' : 'Создать'}
        </LoadingButton>
      </FormikForm>
    </FormikProvider>
  )
}
