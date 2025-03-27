import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import Router from './router/Router'
import { client } from './core/apollo'
import '@/scss/styles.scss'
import moment from 'moment'
import 'moment/dist/locale/ru'

function App() {
  moment.locale('ru')
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
