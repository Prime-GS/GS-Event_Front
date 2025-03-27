import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    email
    roles
  }
`

export const GET_USERS = gql`
  query GetUsersQuery($pagination: PaginationInput, $filter: FilterInput) {
    users(pagination: $pagination, filter: $filter) {
      data {
        ...UserFragment
      }
      total
    }
  }
  ${USER_FRAGMENT}
`

export const GET_USER_BY_ID = gql`
  query GetUserByIdQuery($id: Int!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const CREATE_USER = gql`
  mutation CreateUserMutation($input: UserInput!) {
    createUser(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const DELETE_USER = gql`
  mutation DelUser($id: Int!) {
    deleteUser(id: $id)
  }
`
