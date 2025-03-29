import { useCommentsByEvent } from '@/graphql/hooks/comments'
import { Comment } from '@/components/comments/Comment'

export function CommentsList({ id }: { id: number }) {
  const { comments, total } = useCommentsByEvent(id)

  return total === 0 ? (
    <span>Комментариев нет</span>
  ) : (
    <>
      {comments.map(({ message, author, createdAt }) => (
        <Comment message={message} author={author.username} createdAt={createdAt} />
      ))}
    </>
  )
}
