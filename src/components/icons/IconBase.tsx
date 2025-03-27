import { ComponentPropsWithoutRef } from 'react'

export interface IIconProps extends ComponentPropsWithoutRef<'svg'> {
  alt?: string
  color?: string
  size?: string | number
}

export function IconBase(props: IIconProps) {
  const { alt, color = 'currentColor', size = '1.2rem', children, ...restProps } = props

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} fill={color} viewBox='0 0 18 18' {...restProps}>
      {!!alt && <title>{alt}</title>}
      {children}
    </svg>
  )
}
