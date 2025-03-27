import { Link } from 'react-router-dom'

import { HasRolesContent } from '@/components/auth'
import CategoryList from '@/sections/categories/CategoryList'

export default function Categories() {
  return (
    <section className='page-section'>
      <div className='d-flex justify-content-between'>
        <h3>Категории</h3>
        <HasRolesContent roles={['admin']}>
          <button className='btn btn-primary'>
            <Link to='/categories/create'>Создать категорию</Link>
          </button>
        </HasRolesContent>
      </div>
      
      <CategoryList />
    </section>
  )
}
