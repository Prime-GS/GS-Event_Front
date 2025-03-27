import React from 'react';

import styles from './iconButton.module.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function IconButton({ children, className, ...restProps }: IProps) {
  return (
    <button className={`${styles.btn}${className ? ` ${className}` : ''}`} {...restProps}>
      {children}
    </button>
  );
}
