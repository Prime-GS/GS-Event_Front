import styles from './loader.module.scss'

export function Loader({ full }: { full?: boolean }) {
  return (
    <div className={full ? styles.wrapper : ''}>
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
