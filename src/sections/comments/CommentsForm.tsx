import { Form as FormikForm, FormikProvider, useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useUpsertComment } from '@/graphql/hooks/comments'

import { LoadingButton } from '@/components/UI'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useStores } from '@/stores/hooks'

interface IFormValues {
  id?: number
  message: string
  afterSubmit?: string
}

interface IProps extends IFormValues {
  eventId: number
}

export function CommentForm({ comment = { id: undefined, message: '', eventId: -1 } }: { comment?: IProps }) {
  const [upsert, { loading }] = useUpsertComment()
  const { authStore } = useStores()
  const location = useLocation()
  const navigate = useNavigate()

  const CommentSchema = Yup.object().shape({
    message: Yup.string().required('Текст комментария обязателен'),
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      ...comment,
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, formHelper) => {
      if (!authStore.user) {
        navigate('/auth/login')
        return
      }

      try {
        const { data } = await upsert({
          variables: { input: { ...values, authorId: authStore.user.id, eventId: comment.eventId } },
        })

        if (data?.upsertComment) {
          navigate(location.pathname)
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
          <FloatingLabel label={`Комментарий *`} className='mb-3 flex-grow-1'>
            <Form.Control required className='' {...getFieldProps('message')} />
          </FloatingLabel>

          <LoadingButton className='mb-3 btn-primary' loading={loading} type='submit' variant='contained'>
            {'>'}
          </LoadingButton>
        </div>
      </FormikForm>
    </FormikProvider>
  )
}
