import { createContext, useContext } from 'react'

import * as stores from '..'

const StoresContext = createContext({ ...stores })

export const useStores = () => useContext(StoresContext)
