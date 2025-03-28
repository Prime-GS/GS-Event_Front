import { IListResponse } from './common'

export interface IUser {
  id: number
  username: string
  email: string
  roles: string[]
}

export interface IUserInput {
  username: string
  email: string
  password: string
  roles?: string[]
}

export interface IUpdateUserInput {
  id: number
  username: string
  email: string
  password?: string
}

export interface IGetUsersData {
  users: IListResponse<IUser>
}

export interface IGetUserByIdData {
  user: IUser
}

export interface ICreateUserData {
  createUser: IUser
}

export interface ICreateUserVariables {
  input: IUserInput
}

export interface IUpdateUserData {
  updateUser: IUser
}

export interface IUpdateUserVariables {
  input: IUpdateUserInput
}
