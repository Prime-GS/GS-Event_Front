'use client'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useCategories, useDeleteCategory } from '@/graphql/hooks/categories'
import { ICategory } from '@/graphql/types/categories'

import { CloseIcon, DeleteIcon, EditIcon } from '@/components/icons'
import { HasRolesContent } from '@/components/auth'
import { IconButton } from '@/components/UI'

export default function CategoryList() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined)

  const { categories } = useCategories()
  const [deleteCategory] = useDeleteCategory()

  const toggleModal = (category?: ICategory) => {
    setModalOpen(!modalOpen)
    setSelectedCategory((prev) => {
      if (!prev) return category
      return prev.id === category?.id ? undefined : category
    })
  }

  const onDelete = () => {
    if (selectedCategory) {
      deleteCategory({ variables: { id: selectedCategory.id } })
      toggleModal()
    }
  }

  return (
    <>
      {modalOpen && (
        <>
          <div className='offcanvas-backdrop fade show' />

          <div className='modal fade' style={{ display: 'block' }}>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h3 className='modal-title fs-5'>Удаление {selectedCategory?.title}</h3>
                  <IconButton
                    type='button'
                    className='btn-close'
                    onClick={() => {
                      toggleModal()
                    }}
                  >
                    <CloseIcon color='#fff' size={14} />
                  </IconButton>
                </div>
                <div className='modal-body'>Вы уверены что хотите удалить?</div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => {
                      toggleModal()
                    }}
                  >
                    Закрыть
                  </button>
                  <button className='btn btn-primary' onClick={onDelete}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className='row mt-2 gap-1'>
        {categories.map((category) => (
          <div key={`category-item-${category.id}`} className='col-12 card'>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <h5 className='card-title'>{category.title}</h5>

                <HasRolesContent roles={['admin']}>
                  <div className='d-flex flex-row gap-2'>
                    <IconButton
                      type='button'
                      style={{ width: '16px', height: '16px', padding: 0 }}
                      onClick={() => {
                        toggleModal(category)
                      }}
                    >
                      <DeleteIcon color='#fff' width={16} height={16} />
                    </IconButton>
                    <IconButton
                      type='button'
                      style={{ width: '16px', height: '16px', padding: 0 }}
                      onClick={() => {
                        navigate(`/categories/edit/${category.id}`)
                      }}
                    >
                      <EditIcon color='#fff' width={16} height={16} />
                    </IconButton>
                  </div>
                </HasRolesContent>
              </div>
              <p className='card-text'>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
