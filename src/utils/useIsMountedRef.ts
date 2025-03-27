import { useRef, useEffect } from 'react'

export function useIsMountedRef() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
  }, [])

  return isMounted
}

export function useIsMountedTest() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
  }, [])

  return isMounted
}
