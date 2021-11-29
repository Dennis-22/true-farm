import {createContext, useContext, useReducer} from 'react'

const AppContext = createContext()

import { data } from './produectState'
import reducer from './reducer'


export default function AppProvider({children}){
    const [productsData, dispatch] = useReducer(reducer, data)

    const value = {
        productsData, dispatch,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}