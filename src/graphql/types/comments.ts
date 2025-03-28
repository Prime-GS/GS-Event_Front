import { IGetVariables, IListResponse } from './common'
import { IEvent } from './events'
import { IUser } from './users'

export interface IComment {
  id: number
  message: string
  eventId: number
  event: IEvent
  authorId: number
  author: IUser
  answerTo?: number
  createdAt: Date
  updatedAt: Date
}

export interface ICommentInput {
  id?: string
  message: string
  eventId: number
  authorId: number
  answerTo?: number
}

export interface ICommentsByEventData {
  commentsByEvent: IListResponse<IComment>
}

export interface ICommentsByEventVaries extends IGetVariables {
  id: number
}

export interface ICommentByIdData {
  comment: IComment
}

export interface IUpsertCommentData {
  upsertComment: IComment
}

export interface IUpsertCommentVariables {
  input: ICommentInput
}
