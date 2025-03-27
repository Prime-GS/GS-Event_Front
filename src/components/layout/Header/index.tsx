'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { OffcanvasMenu, IconButton } from '@/components/UI'
import { CloseIcon, SearchIcon } from '@/components/icons'
import { HasRolesContent } from '@/components/auth'
import { IMenuItem, mainMenu } from '@/constants/mainMenu'

import styles from './header.module.scss'

export function Header() {
  const [offcanvasShow, setOffcanvasShow] = useState(false)
  const [offcanvasHiding, setOffcanvasHiding] = useState(false)
  const [searchShow, setSearchShow] = useState(false)

  const showOffcanvas = () => {
    setOffcanvasShow(true)
  }

  const handleCloseOffcanvas = () => {
    setOffcanvasHiding(() => {
      setTimeout(() => {
        setOffcanvasShow(false)
        setOffcanvasHiding(false)
      }, 300)
      return true
    })
  }

  const toggleSearchShow = () => {
    setSearchShow((prev) => !prev)
  }

  return (
    <>
      <header className={`${styles.root} sticky-top`}>
        <div className={styles.togglesBox}>
          {offcanvasShow ? (
            <IconButton onClick={handleCloseOffcanvas} type='button' aria-label='Close menu'>
              <CloseIcon size={16} color='#fff' />
            </IconButton>
          ) : (
            <button className={`${styles.navToggler}`} aria-label='Open menu' type='button' onClick={showOffcanvas}>
              <span />
              <span />
              <span />
            </button>
          )}
        </div>

        <div className={styles.logoContainer}>
          <Link to='/'>
            <img src='logo.png' alt='GSEvent' width={'auto'} height={48} />
          </Link>
        </div>
        <form action={'/search'} className={`${styles.search} ${searchShow ? styles.showSearch : ''}`}>
          <div className={styles.searchField}>
            <input type='text' name='q' className={styles.searchInput} placeholder='Поиск по сайту' />
            <IconButton type='submit' className={styles.searchSubmit} aria-label='Search menu'>
              <SearchIcon color='#ced4da' />
            </IconButton>
          </div>

          <IconButton onClick={toggleSearchShow} className={styles.searchClose} type='button' aria-label='Close menu'>
            <CloseIcon size={15} color='#fff' />
          </IconButton>
        </form>

        <nav className={styles.nav}>
          {mainMenu.map((item) => (
            <HasRolesContent key={item.title} roles={item.roles ? item.roles : []}>
              {item.children ? (
                <DropdownMenu item={item} />
              ) : (
                <div>
                  <Link to={item.to}>
                    <button className='btn'>{item.title}</button>
                  </Link>
                </div>
              )}
            </HasRolesContent>
          ))}
        </nav>

        <IconButton onClick={toggleSearchShow}>
          <SearchIcon />
        </IconButton>
      </header>

      <OffcanvasMenu show={offcanvasShow} hiding={offcanvasHiding} onClose={handleCloseOffcanvas} />
    </>
  )
}

function DropdownMenu({ item }: { item: IMenuItem }) {
  return (
    <div key={item.title}>
      <button
        className='btn btn-secondary dropdown-toggle'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Dropdown button
      </button>
      <ul className='dropdown-menu'>
        {item.children?.map((i) => (
          <li key={i.title} className='dropdown-item'>
            <Link to={i.to}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
