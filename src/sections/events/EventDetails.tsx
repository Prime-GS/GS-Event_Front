import { IEvent } from '@/graphql/types/events'
import moment from 'moment'

interface IProps {
  event: IEvent
}

export function EventDetails({ event }: IProps) {
  return (
    <div className='container p-2'>
      <h1 className='mb-0'>{event.title}</h1>
      <hr className='mt-0' />
      <p> {event.description}</p>
      <p>
        <strong>Дата начала:</strong> {moment(event.startedAt).format('MMMM D-HH:mm')}
      </p>
      <p>
        <strong>Подписавшиеся на ивент:</strong> {event.categories.length}
      </p>

      <hr className='mt-0' />
      <div className='mt-3'>
        {event.categories.length !== 0 && (
          <>
            <p>
              <strong>Категорий:</strong>
            </p>
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
        <p className='mt-3'>
          <strong>Создатель Ивента:</strong> {event.creator.username}
        </p>
      </div>
    </div>
  )
}
