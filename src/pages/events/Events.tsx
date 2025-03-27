import { Link } from 'react-router-dom'

import { HasRolesContent } from '@/components/auth'

export default function Events() {
  return (
    <section className='page-section'>
      <div className='d-flex justify-content-between'>
        <h3>Ивенты</h3>
        <HasRolesContent roles={['admin']}>
          <button className='btn btn-primary'>
            <Link to='/events/create'>Создать ивент</Link>
          </button>
        </HasRolesContent>
      </div>

      {/* <EventList /> */}
    </section>
  )
}
