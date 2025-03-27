import { ApolloClient, InMemoryCache, ApolloLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'

//@ts-expect-error type
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

import * as stores from '../stores'

const API_URL = import.meta.env.VITE_API_URL

const httpLink = createUploadLink({
  uri: API_URL,
})

const getTokenFromStorage = () => {
  const data = localStorage.getItem('@auth')

  if (data) {
    const { token } = JSON.parse(data)

    return token ?? null
  }

  return null
}

const authMiddlewareLink: ApolloLink = new ApolloLink((operation, forward) => {
  const token = getTokenFromStorage()
  const headers = operation.getContext().headers || {}

  operation.setContext({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  return forward(operation)
})

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: Infinity,
    retryIf: (error) => {
      return !!error
    },
  },
})

export const client = new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        for (const { message, locations, path, extensions } of graphQLErrors ?? []) {
          if (extensions && ['NO_SESSION', 'INVALID_TOKEN', 'UNAUTHENTICATED'].includes(extensions.code as string)) {
            stores.authStore.logout()
          }

          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        }
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    }),
    retryLink,
    authMiddlewareLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
})
