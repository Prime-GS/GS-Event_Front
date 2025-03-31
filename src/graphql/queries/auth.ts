import { gql } from '@apollo/client'
import { USER_FRAGMENT } from './users'

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserFragment
      }
      token
    }
  }
  ${USER_FRAGMENT}
`

export const REGISTRATION = gql`
  mutation Registration($input: RegistrationInput!) {
    registration(input: $input) {
      user {
        ...UserFragment
      }
      token
    }
  }
  ${USER_FRAGMENT}
`

export const CHECK_EMAIL = gql`
  mutation CheckEmail($email: String!) {
    checkEmail(email: $email)
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateInput!) {
    updateMyProfile(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const ME = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
