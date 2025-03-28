import { IListResponse } from './common'
import { ICategory } from './categories'
import { IUser } from './users'

export interface IEvent {
  id: number
  title: string
  slug: string
  description: string
  startedAt: Date
  categoriesIds: number[]
  categories: ICategory[]
  subscribersIds: number[]
  subscribers: IUser[]
  creatorId: number
  creator: IUser
  createdAt: Date
  updatedAt: Date
}

export interface IEventInput {
  id?: number
  title: string
  slug: string
  description: string
  startedAt: Date
  categoriesIds: number[]
}

export interface IEventsData {
  events: IListResponse<IEvent>
}

export interface IEventByIdData {
  event: IEvent
}

export interface IEventBySlugData {
  eventBySlug: IEvent
}

export interface IUpsertEventData {
  upsertEvent: IEvent
}

export interface IUpsertEventVariables {
  input: IEventInput
}
