import { useStores } from '@/stores/hooks'
import { CommentForm } from './CommentsForm'
import { CommentsList } from './CommentsList'

export function CommentsSection({ id }: { id: number }) {
  const { authStore } = useStores()
  return (
    <div className='card shadow-0 border mt-3'>
      <div className='card-body p-4'>
        {authStore.isLoggedIn && <CommentForm eventId={id} />}
        <div className='mt-3' />
        <CommentsList id={id} />
      </div>
    </div>
  )
}
