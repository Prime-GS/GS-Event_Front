import { Link } from 'react-router-dom'

import { EventList } from '@/sections/events/EventList'

export default function Events() {
  return (
    <section className='page-section'>
      <div className='d-flex justify-content-between mb-3'>
        <h3>Ивенты</h3>
        <Link to='/events/create'>
          <button className='btn btn-primary'>Создать ивент</button>
        </Link>
      </div>

      <EventList />
    </section>
  )
}
