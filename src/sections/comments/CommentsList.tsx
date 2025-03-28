import { useCommentsByEvent } from '@/graphql/hooks/comments'

export function CommentsList(id: number) {
  const { comments } = useCommentsByEvent(id)

  return comments.length === 0 ? (
    <p>Комментариев нет</p>
  ) : (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: '1rem' }}>
          <p>
            <strong>{comment.author.username}</strong>
          </p>
          <p>{comment.message}</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
