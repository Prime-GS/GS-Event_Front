import { Link } from 'react-router-dom'

const PageNotFound: React.FC = () => {
  return (
    <div className='min-vh-100 d-flex flex-column justify-content-center align-items-center text-white'>
      <h1 className='display-1'>404</h1>
      <h5>Страница не найдена</h5>
      <button className='btn btn-primary'>
        <Link to={'/'}> Вернуться</Link>
      </button>
    </div>
  )
}

export default PageNotFound
