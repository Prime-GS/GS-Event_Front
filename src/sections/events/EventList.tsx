import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useDeleteEvent, useEvents } from '@/graphql/hooks/events'
import { IEvent } from '@/graphql/types/events'

import { CloseIcon, DeleteIcon, EditIcon } from '@/components/icons'
import { HasRolesContent } from '@/components/auth'
import { IconButton } from '@/components/UI'
import moment from 'moment'

export function EventList() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(undefined)

  const { events } = useEvents()
  const [deleteEvent] = useDeleteEvent()

  const handleClose = () => {
    setModalOpen(false)
    setSelectedEvent(undefined)
  }

  const handleOpen = (event?: IEvent) => {
    setModalOpen(true)
    setSelectedEvent(event)
  }

  const onDelete = () => {
    if (selectedEvent) {
      deleteEvent({ variables: { id: selectedEvent.id } })
      handleClose()
    }
  }

  return (
    <>
      <Modal centered animation={false} show={modalOpen} onHide={handleClose} className='text-white'>
        <div className='modal-header'>
          <h3 className='modal-title fs-5'>Удаление {selectedEvent?.title}</h3>
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

      <div className='row mt-2'>
        {events.map((event) => (
          <div key={`Event-item-${event.id}`} className='col-12 col-md-6 col-lg-4 mb-4'>
            <div className='card h-100' style={{ maxHeight: '300px' }}>
              <div className='card-body d-flex flex-column justify-content-between gap-2'>
                <div className='card-title'>
                  <h3>
                    <Link to={`/events/${event.slug}`}>{event.title}</Link>
                  </h3>
                  {event.categories.length !== 0 ? (
                    <div className='d-flex flex-wrap gap-2'>
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
                  ) : (
                    <div style={{ fontSize: '14px' }} className='d-inline bg-primary rounded-5 px-2'>
                      Категорий нет
                    </div>
                  )}
                </div>
                <div className='small d-block mt-auto w-75'>
                  Дата начала: {moment(event.startedAt).format('D MMMM HH:mm')}
                </div>

                <div className='position-absolute bottom-0 end-0'>
                  <HasRolesContent roles={['admin']}>
                    <IconButton type='button'>
                      <Link to={`/events/edit/${event.id}`}>
                        <EditIcon color='#fff' width={20} height={20} />
                      </Link>
                    </IconButton>
                    <IconButton
                      type='button'
                      onClick={() => {
                        handleOpen(event)
                      }}
                    >
                      <DeleteIcon color='#fff' width={20} height={20} />
                    </IconButton>
                  </HasRolesContent>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
