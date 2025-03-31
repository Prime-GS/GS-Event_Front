import { IUser } from './users'

export interface ILoginInput {
  login: string
  password: string
}

export interface IRegistrationInput {
  username: string
  email: string
  password: string
}

export interface ICheckEmailData {
  checkEmail: boolean
}

export interface IUpdateProfileInput {
  id: number
  username: string
  password?: string
}

export interface ILoginData {
  login: {
    user: IUser
    token: string
  }
}

export interface IRegistrationData {
  registration: {
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

export interface IRegistrationVariables {
  input: IRegistrationInput
}

export interface IMeData {
  me: IUser
}
