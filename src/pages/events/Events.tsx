import { Link } from 'react-router-dom'

import { EventList } from '@/sections/events/EventList'
import { HasRolesContent } from '@/components/auth'

export default function Events() {
  return (
    <section className='page-section'>
      <div className='d-flex justify-content-between mb-3'>
        <h3>Ивенты</h3>
        <HasRolesContent roles={['admin']}>
          <button className='btn btn-primary'>
            <Link to='/events/create'>Создать ивент</Link>
          </button>
        </HasRolesContent>
      </div>

      <EventList />
    </section>
  )
}
