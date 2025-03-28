import { IEvent } from '@/graphql/types/events'
import { useStores } from '@/stores/hooks'
import moment from 'moment'
import { Link } from 'react-router-dom'

interface IProps {
  event: IEvent
}

export function EventDetails({ event }: IProps) {
  const { authStore } = useStores()

  const creatorCheck = (authStore.user?.id === event.creatorId || authStore.user?.roles?.includes('admin')) ?? false

  return (
    <div className='container position-relative'>
      {creatorCheck && (
        <Link to={`/events/edit/${event.id}`}>
          <button className='btn btn-primary position-absolute end-0'>Редактировать</button>
        </Link>
      )}
      <h1 className='mb-0'>{event.title}</h1>
      <hr />
      <p> {event.description}</p>
      <p>
        <strong>Дата начала:</strong> {moment(event.startedAt).format('MMMM D HH:mm')}
      </p>
      <p>
        <strong>Подписавшиеся на ивент:</strong> {event.subscribers.length}
      </p>

      <hr className='mt-0' />
      <div className='mt-3'>
        {event.categories.length !== 0 && (
          <>
            <strong>Категорий:</strong>
            <div className='d-flex flex-wrap gap-2 mb-3 bg-secondary p-2 rounded-3'>
              {event.categories.map((cat) => {
                return (
                  <div
                    key={`selected-category-${cat.id}`}
                    style={{ fontSize: '12px' }}
                    className='bg-primary rounded-5 px-2'
                  >
                    {cat.title}
                  </div>
                )
              })}
            </div>
          </>
        )}
        <p className='mt-3 w-100'>
          <strong>Создатель Ивента:</strong> {event.creator.username}
          <button className='btn btn-primary position-absolute end-0'>Подписаться</button>
        </p>
      </div>
    </div>
  )
}
