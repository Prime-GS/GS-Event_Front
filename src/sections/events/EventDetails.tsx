import { Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useDeleteEvent, useToggleSubscribe } from '@/graphql/hooks/events'
import { IEvent } from '@/graphql/types/events'

import { CloseIcon, DeleteIcon, EditIcon } from '@/components/icons'
import { IconButton } from '@/components/UI'
import { useStores } from '@/stores/hooks'
import moment from 'moment'

interface IProps {
  event: IEvent
}

export function EventDetails({ event }: IProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [toggleSubscribe] = useToggleSubscribe()
  const [deleteEvent] = useDeleteEvent()
  const { authStore } = useStores()
  const navigate = useNavigate()

  const subscribed = authStore.user ? event.subscribersIds.includes(authStore.user?.id) : false
  const creatorCheck = (authStore.user?.id === event.creatorId || authStore.user?.roles?.includes('admin')) ?? false

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleOpen = () => {
    setModalOpen(true)
  }

  const onDelete = () => {
    deleteEvent({ variables: { id: event.id } })
    navigate('/events')
    handleClose()
  }

  return (
    <>
      <Modal centered animation={false} show={modalOpen} onHide={handleClose} className='text-white'>
        <div className='modal-header'>
          <h3 className='modal-title fs-5'>Удаление {event.title}</h3>
          <IconButton type='button' className='btn-close' onClick={handleClose}>
            <CloseIcon color='#fff' size={14} />
          </IconButton>
        </div>
        <Modal.Body>Вы уверены что хотите удалить?</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={handleClose}>
            Закрыть
          </button>
          <button className='btn btn-primary' onClick={onDelete}>
            Удалить
          </button>
        </Modal.Footer>
      </Modal>
      <div className='container position-relative pb-1'>
        {creatorCheck && (
          <div className='position-absolute end-0'>
            <IconButton type='button'>
              <Link to={`/events/edit/${event.id}`}>
                <EditIcon color='#fff' width={20} height={20} />
              </Link>
            </IconButton>
            <IconButton type='button' onClick={handleOpen}>
              <DeleteIcon color='#fff' width={20} height={20} />
            </IconButton>
          </div>
        )}
        <h1 className='mb-0'>{event.title}</h1>
        <hr />
        <p>{event.description}</p>
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
                <button
                  className={`btn ${subscribed ? 'btn-secondary' : 'btn-primary'} position-absolute bottom-0 end-0`}
                  onClick={() => {
                    toggleSubscribe({ variables: { id: event.id } })
                    window.location.reload()
                  }}
                >
                  {subscribed ? 'Отписаться' : 'Подписаться'}
                </button>
              </div>
            </>
          )}
          <p className='mt-3 w-100'>
            <strong>Создатель Ивента:</strong> {event.creator.username}
          </p>
        </div>
      </div>
    </>
  )
}
