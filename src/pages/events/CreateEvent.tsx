import { EventForm } from '@/sections/events/EventForm'

export default function CreateEvent() {
  return (
    <div className='row mt-5'>
      <div className='col col-md-6 mx-auto mx-auto'>
        <h4 className='mb-3'>Создание нового ивента</h4>

        <EventForm />
      </div>
    </div>
  )
}
