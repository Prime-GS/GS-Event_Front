'use client'

import { useEffect } from 'react'

import styles from './offcanvasMenu.module.scss'
import { Link } from 'react-router-dom'
import { mainMenu } from '@/constants/mainMenu'
import { HasRolesContent } from '@/components/auth'

interface IProps {
  show: boolean
  hiding: boolean
  onClose: () => void
}

export function OffcanvasMenu({ show, hiding, onClose }: IProps) {
  useEffect(() => {
    if (show) {
      document.body.classList.add('scroll-disable')
    } else {
      document.body.classList.remove('scroll-disable')
    }
  }, [show])

  return (
    <>
      <div className={`${styles.root} offcanvas offcanvas-start${show ? ' show' : ''}${hiding ? ' hiding' : ''}`}>
        <div className={styles.body}>
          <div className={styles.menuContainer}>
            {mainMenu.map((item) => (
              <HasRolesContent key={`nav-offcanvas-${item.to}`} roles={item.roles ?? []}>
                <div className={styles.menuItem}>
                  <Link to={item.to} onClick={onClose}>
                    {item.title}
                  </Link>
                </div>
              </HasRolesContent>
            ))}
          </div>
        </div>
      </div>
      {show && <div className='offcanvas-backdrop fade show'></div>}
    </>
  )
}
