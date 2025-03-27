import { Form as FormikForm, FormikProvider, useFormik } from 'formik'
import { Alert, FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import * as Yup from 'yup'

import { useUpsertEvent } from '@/graphql/hooks/events'

import { IconButton, LoadingButton } from '@/components/UI'
import { useCategories } from '@/graphql/hooks/categories'
import { CloseIcon } from '@/components/icons'
import { createSlug } from '@/utils'
import moment from 'moment'

interface IFormValues {
  id?: number
  title: string
  slug: string
  description: string
  startedAt: string
  categoriesIds?: number[]
  afterSubmit?: string
}

export function EventForm({
  event = {
    id: undefined,
    title: '',
    slug: '',
    description: '',
    startedAt: moment().add(1, 'd').format('yyyy-MM-DDThh:mm'),
    categoriesIds: [],
  },
}: {
  event?: IFormValues
}) {
  const { categories } = useCategories()

  const [upsert, { loading }] = useUpsertEvent()
  const navigate = useNavigate()

  const [categoriesIds, setCategoriesIds] = useState<number[]>(event.categoriesIds ?? [])

  const eventSchema = Yup.object().shape({
    title: Yup.string().required('Название обязательно'),
    description: Yup.string().required('Описание обязательно').min(20, 'Описание должно содержать минимум 20 символов'),
    categoriesIds: Yup.array().optional(),
    startedAt: Yup.date()
      .required('Время начала обязательно')
      .min(moment(), 'Время проведения должно быть позже текущего времени'),
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      ...event,
    },
    validationSchema: eventSchema,
    onSubmit: async (values, formHelper) => {
      try {
        console.log(values.categoriesIds)

        const { data } = await upsert({
          variables: {
            input: {
              ...values,
              categoriesIds,
              startedAt: new Date(values.startedAt),
            },
          },
        })

        if (data?.upsertEvent) {
          navigate('/events')
        }
      } catch (error: any) {
        formHelper.setErrors({ afterSubmit: error.message || 'Неверные данные' })
      }
    },
  })
  const { errors, handleSubmit, getFieldProps, handleChange, setFieldValue } = formik

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('slug', createSlug(e.currentTarget.value))
    handleChange(e)
  }
  
  const onCategoryClick = (categoryId: number) => {
    setCategoriesIds((prev) => {
      if (prev.includes(categoryId)) {
        const filtered = prev.filter((id) => id !== categoryId)
        return filtered
      }
      prev.push(categoryId)
      return [...prev]
    })
  }

  return (
    <FormikProvider value={formik}>
      <FormikForm autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Alert key={`form-danger-afterSubmit`} variant={'danger'} show={!!errors.afterSubmit}>
          {errors.afterSubmit}
        </Alert>

        {!!errors.title && <small className='text-danger'>{errors.title}</small>}
        <FloatingLabel label={`Название *`} className='mb-3'>
          <Form.Control required {...getFieldProps('title')} onChange={onTitleChange} />
        </FloatingLabel>

        {!!errors.slug && <small className='text-danger'>{errors.slug}</small>}
        <FloatingLabel label={`Путь (генерируется автоматически) *`} className='mb-3'>
          <Form.Control required {...getFieldProps('slug')} />
        </FloatingLabel>

        {!!errors.description && <small className='text-danger'>{errors.description}</small>}
        <FloatingLabel label={`Описание *`} className='mb-3'>
          <Form.Control required as='textarea' style={{ minHeight: '150px' }} {...getFieldProps('description')} />
        </FloatingLabel>

        {!!errors.categoriesIds && <small className='text-danger'>{errors.categoriesIds}</small>}
        <Form.Group className='mb-1'>
          <Form.Label>Категории</Form.Label>
          <Form.Select multiple style={{ overflowY: 'auto' }} onChange={() => {}}>
            {categories.map((cat) => {
              return (
                !categoriesIds.includes(cat.id) && (
                  <option
                    key={`category-select-${cat.id}`}
                    value={cat.id}
                    onClick={() => {
                      onCategoryClick(cat.id)
                    }}
                  >
                    {cat.title}
                  </option>
                )
              )
            })}
          </Form.Select>
        </Form.Group>

        <p className='m-0'>Выбранные категории</p>
        <div className='d-flex flex-wrap gap-2 mb-3 bg-secondary p-2 rounded-3' style={{ minHeight: 50 }}>
          {categories.map((cat) => {
            return (
              categoriesIds.includes(cat.id) && (
                <IconButton
                  key={`selected-category-${cat.id}`}
                  className='rounded-3 bg-primary py-1'
                  onClick={() => {
                    onCategoryClick(cat.id)
                  }}
                >
                  {cat.title} <CloseIcon size={10} className='ml-2' />
                </IconButton>
              )
            )
          })}
        </div>

        {!!errors.startedAt && <small className='text-danger'>{errors.startedAt}</small>}
        <FloatingLabel label={`Время начала *`} className='mb-3 w-50'>
          <Form.Control required type='datetime-local' id='startedAt' {...getFieldProps('startedAt')} />
        </FloatingLabel>

        <LoadingButton className='mb-3 btn-primary' loading={loading} type='submit' variant='contained'>
          {event.id ? 'Редактировать' : 'Создать'}
        </LoadingButton>
      </FormikForm>
    </FormikProvider>
  )
}
