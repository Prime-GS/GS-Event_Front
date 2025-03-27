import { Form, FormikProvider, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent } from 'react'
import * as Yup from 'yup'

import { useUpsertCategory } from '@/graphql/hooks/categories'

import { LoadingButton } from '@/components/UI'

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

  const { errors, handleSubmit, getFieldProps, handleChange } = formik

  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '#') {
      e.currentTarget.value = ''
    } else if (!e.currentTarget.value.startsWith('#')) {
      e.currentTarget.value = '#' + e.currentTarget.value.replace('#', '')
    }
    e.currentTarget.value = e.currentTarget.value.slice(0, 7)
    handleChange(e)
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        {!!errors.afterSubmit && (
          <div className='alert alert-danger' role='alert'>
            {errors.afterSubmit}
          </div>
        )}

        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Название <span className='text-primary'>*</span>
          </label>
          <input
            id='title'
            type='text'
            className='form-control'
            placeholder='Название категории'
            {...getFieldProps('title')}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Описание
          </label>
          <textarea id='description' className='form-control' rows={3} {...getFieldProps('description')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='color' className='form-label'>
            Цвет категории
          </label>
          <input
            id='color'
            className='form-control form-control-sm'
            placeholder='#FFFFFF'
            style={{ width: 75 }}
            max={7}
            min={1}
            {...getFieldProps('color')}
            onChange={onColorChange}
          />
        </div>

        <LoadingButton className='mb-3 btn-primary' loading={loading} type='submit' variant='contained'>
          {category ? 'Редактировать' : 'Создать'}
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
