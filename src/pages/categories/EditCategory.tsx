import { useNavigate, useParams } from 'react-router-dom'

import { useCategoryById } from '@/graphql/hooks/categories'

import { CategoryForm } from '@/sections/categories/CategoryForm'
import { Loader } from '@/components/UI'

export default function EditCategory() {
  const navigate = useNavigate()
  const { id } = useParams()
  if (!id) {
    navigate('/404')
  }
  const categoryId = Number(id)
  const { category, loading } = useCategoryById(categoryId)

  if (!category) {
    navigate('/404')
    return
  }

  return loading ? (
    <Loader full />
  ) : (
    <div className='row mt-5'>
      <div className='col-6 mx-auto'>
        <h4 className='mb-3'>Редактирование {category.title}</h4>

        <CategoryForm
          category={{
            id: category.id,
            title: category.title,
            description: category.description ?? '',
            color: category.color ?? '',
          }}
        />
      </div>
    </div>
  )
}
