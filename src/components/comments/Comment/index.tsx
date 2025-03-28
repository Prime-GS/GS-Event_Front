import moment from 'moment'

interface IProps {
  message: string
  author: string
  createdAt: Date
}

export function Comment({ author, createdAt, message }: IProps) {
  return (
    <div className='card mb-4'>
      <div className='card-body'>
        <p>{message}</p>

        <p className='small mb-0 ms-2'>
          {author} в {moment(createdAt).format('HH:mm y-M-d')}
        </p>
        {/* <div className='ms-auto'>
            <button className='btn small text-muted mb-0'>Ответить</button>
          </div> */}
      </div>
    </div>
  )
}
