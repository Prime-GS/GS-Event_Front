import { ReactNode } from 'react'
import { Loader } from '../Loader'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
  children: ReactNode
  className?: string
  variant?: string
}

export function LoadingButton({ children, loading, className, ...options }: IProps) {
  return (
    <button disabled={loading} className={`btn${className ? ` ${className}` : ''}`} {...options}>
      {loading ? <Loader /> : children}
    </button>
  )
}
