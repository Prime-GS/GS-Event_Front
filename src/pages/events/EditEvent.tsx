import { Loader } from '@/components/UI'
import { useEventById } from '@/graphql/hooks/events'
import { EventForm } from '@/sections/events/EventForm'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditEvent() {
  const navigate = useNavigate()
  const { id: params } = useParams()
  if (!params) {
    navigate('/404')
  }
  const eventId = Number(params)
  const { event, loading } = useEventById(eventId)

  if (!event) {
    navigate('/404')
    return
  }
  const { id, title, slug, description, categoriesIds, startedAt } = event

  return loading ? (
    <Loader full />
  ) : (
    <div className='row mt-5'>
      <div className='col col-md-6 mx-auto mx-auto'>
        <h4 className='mb-3'>Редактирование ивента {event.title}</h4>

        <EventForm
          event={{
            id,
            title,
            slug,
            description,
            categoriesIds,
            startedAt: moment(startedAt).add(1, 'd').format('yyyy-MM-DDThh:mm'),
          }}
        />
      </div>
    </div>
  )
}
