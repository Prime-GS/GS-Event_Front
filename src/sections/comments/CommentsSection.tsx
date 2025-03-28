import { Comment } from '@/components/comments/Comment'
import { CommentForm } from './CommentsForm'

export function CommentsSection() {
  return (
    <div className='row'>
      <div className='col col-md-8 col-lg-6'>
        <div className='card shadow-0 border'>
          <div className='card-body p-4'>
            <CommentForm />

            <Comment message='CommentsList' author='Admin' createdAt={new Date()} />

            <div className='card mb-4 bg-secondary'>
              <div className='card-body'>
                <p>Type your note, and hit enter to add it</p>

                <div className='d-flex justify-content-between'>
                  <div className='d-flex flex-row align-items-center'>
                    <p className='small mb-0 ms-2'>Martha</p>
                  </div>
                  <div className='d-flex flex-row align-items-center'>
                    <p className='small text-muted mb-0'>Upvote?</p>
                    <i className='far fa-thumbs-up mx-2 fa-xs text-body' style={{ marginTop: '-0.16rem' }} />
                    <p className='small text-muted mb-0'>3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='card mb-4'>
              <div className='card-body'>
                <p>Type your note, and hit enter to add it</p>

                <div className='d-flex justify-content-between'>
                  <div className='d-flex flex-row align-items-center'>
                    <p className='small mb-0 ms-2'>Mary Kate</p>
                  </div>
                  <div className='d-flex flex-row align-items-center text-body'>
                    <p className='small mb-0'>Upvoted</p>
                    <i className='fas fa-thumbs-up mx-2 fa-xs' style={{ marginTop: '-0.16rem' }} />
                    <p className='small mb-0'>2</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-body'>
                <p>Type your note, and hit enter to add it</p>

                <div className='d-flex justify-content-between'>
                  <div className='d-flex flex-row align-items-center'>
                    <p className='small mb-0 ms-2'>Johny</p>
                  </div>
                  <div className='d-flex flex-row align-items-center'>
                    <p className='small text-muted mb-0'>Upvote?</p>
                    <i className='far fa-thumbs-up ms-2 fa-xs text-body' style={{ marginTop: '-0.16rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
