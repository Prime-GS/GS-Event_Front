import { useNavigate, useParams } from 'react-router-dom'

import { useEventBySlug } from '@/graphql/hooks/events/useEventBySlug'

import { EventDetails } from '@/sections/events/EventDetails'

export default function Event() {
  const navigate = useNavigate()
  const { slug } = useParams()

  if (!slug) {
    navigate('/404')
    return
  }
  const { event } = useEventBySlug(slug)
  if (!event) {
    navigate('/404')
    return
  }

  return (
    <div>
      <EventDetails event={event} />
    </div>
  )
}
