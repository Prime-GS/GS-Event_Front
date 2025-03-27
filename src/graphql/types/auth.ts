import { IUser } from './users'

export interface ILoginInput {
  login: string
  password: string
}

export interface IUpdateProfileInput {
  id: number
  username?: string
  password?: string
}

export interface ILoginData {
  login: {
    user: IUser
    token: string
  }
}

export interface IUpdateProfileData {
  updateMyProfile: IUser
}

export interface IUpdateProfileVariables {
  input: IUpdateProfileInput
}

export interface ILoginVariables {
  input: ILoginInput
}

export interface IMeData {
  me: IUser
}
