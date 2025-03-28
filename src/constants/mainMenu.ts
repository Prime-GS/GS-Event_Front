export interface IMenuItem {
  title: string
  to: string
  roles?: string[]
  children?: IMenuItem[]
}

export const mainMenu: IMenuItem[] = [
  {
    title: 'Главная',
    to: '/',
  },
  {
    title: 'Ивенты',
    to: '/events',
  },
  {
    title: 'Категории',
    to: '/categories',
    roles: ['admin'],
  },
]
