import { useNavigate, useParams } from 'react-router-dom'

import { useEventBySlug } from '@/graphql/hooks/events'

import { EventDetails } from '@/sections/events/EventDetails'
import { Loader } from '@/components/UI'

export default function Event() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { event, loading } = useEventBySlug(slug ?? '')

  if (!event) {
    navigate('/404')
    return null
  }

  return loading ? <Loader full /> : <EventDetails event={event} />
}
