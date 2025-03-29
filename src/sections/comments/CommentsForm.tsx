import { Form as FormikForm, FormikProvider, useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'

import { useUpsertComment } from '@/graphql/hooks/comments'

import { IconButton } from '@/components/UI'
import { SendIcon } from '@/components/icons'

interface IFormValues {
  id?: number
  message: string
  afterSubmit?: string
}

interface IProps {
  comment?: IFormValues
  eventId: number
}

export function CommentForm({ comment = { id: undefined, message: '' }, eventId }: IProps) {
  const [upsert] = useUpsertComment()

  const CommentSchema = Yup.object().shape({
    message: Yup.string().required('Текст комментария обязателен'),
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      ...comment,
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, formHelper) => {
      try {
        const { data } = await upsert({
          variables: { input: { ...values, eventId } },
        })

        if (data?.upsertComment) {
          window.location.reload()
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

        <div className='d-flex flex-row'>
          <Form.Control style={{ height: '40px' }} required className='small' {...getFieldProps('message')} />

          <IconButton className='btn' type='submit'>
            <SendIcon color='#3363c2' />
          </IconButton>
        </div>
      </FormikForm>
    </FormikProvider>
  )
}
