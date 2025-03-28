import { gql } from '@apollo/client'

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    title
    description
    color
    createdAt
    updatedAt
  }
`

export const GET_COMMENTS_BY_EVENT = gql`
  query GetCommentsQuery($id: Int!, $pagination: PaginationInput, $filter: FilterInput) {
    commentsByEvent(id: $id, pagination: $pagination, filter: $filter) {
      data {
        ...CommentFragment
      }
      total
    }
  }
  ${COMMENT_FRAGMENT}
`

export const GET_COMMENT_BY_ID = gql`
  query GetCommentByIdQuery($id: Int!) {
    comment(id: $id) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`

export const UPSERT_COMMENT = gql`
  mutation UpsertCommentMutation($input: CommentInput!) {
    upsertComment(input: $input) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id)
  }
`
