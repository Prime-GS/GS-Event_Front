import { gql } from '@apollo/client'

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    title
    description
    color
    createdAt
    updatedAt
  }
`

export const GET_CATEGORIES = gql`
  query GetCategoriesQuery($pagination: PaginationInput, $filter: FilterInput) {
    categories(pagination: $pagination, filter: $filter) {
      data {
        ...CategoryFragment
      }
      total
    }
  }
  ${CATEGORY_FRAGMENT}
`

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryByIdQuery($id: Int!) {
    category(id: $id) {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`

export const UPSERT_CATEGORY = gql`
  mutation UpsertCategoryMutation($input: CategoryInput!) {
    upsertCategory(input: $input) {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`


export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`
