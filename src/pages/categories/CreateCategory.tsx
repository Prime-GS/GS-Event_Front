import { CategoryForm } from '@/sections/categories/CategoryForm'

export default function CreateCategory() {
  return (
    <div className='row mt-5'>
      <div className='col col-md-6 mx-auto mx-auto'>
        <h4 className='mb-3'>Создание новой категории</h4>

        <CategoryForm />
      </div>
    </div>
  )
}
