import { gql } from '@apollo/client'

export const EVENT_FRAGMENT = gql`
  fragment EventFragment on Event {
    id
    title
    description
    color
    createdAt
    updatedAt
  }
`

export const GET_EVENTS = gql`
  query GetEventsQuery($pagination: PaginationInput, $filter: FilterInput) {
    events(pagination: $pagination, filter: $filter) {
      data {
        ...EventFragment
      }
      total
    }
  }
  ${EVENT_FRAGMENT}
`

export const GET_EVENT_BY_ID = gql`
  query GetEventByIdQuery($id: Int!) {
    event(id: $id) {
      ...EventFragment
    }
  }
  ${EVENT_FRAGMENT}
`

export const UPSERT_EVENT = gql`
  mutation UpsertEventMutation($input: EventInput!) {
    upsertEvent(input: $input) {
      ...EventFragment
    }
  }
  ${EVENT_FRAGMENT}
`

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: Int!) {
    deleteEvent(id: $id)
  }
`
