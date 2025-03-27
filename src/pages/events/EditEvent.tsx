import { useNavigate, useParams } from 'react-router-dom'

export default function EditEvent() {
  const navigate = useNavigate()
  const { id } = useParams()
  if (!id) {
    navigate('/404')
  }
  // const eventId = Number(id)
  // const { Event: event, loading } = useEventById(eventId)

  // if (!event) {
  //   navigate('/404')
  //   return
  // }

  return (
    // loading ? (
    //   <Loader full />
    // ) :
    <div className='row mt-5'>
      <div className='col-6 mx-auto'>
        <h4 className='mb-3'>Редактирование ивента</h4>

        {/* <EventForm /> */}
      </div>
    </div>
  )
}
