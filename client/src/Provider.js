import React , { createContext, useState, useRef } from 'react'
import Page from './components/page/page'
import api from './utils/api'

const Context = createContext()

const Provider = ({children}) => {

    const tabItems = useRef()
    const setUpdateState = useRef()
    const updateTabItems = async () => {
        const result = await api.get('http://localhost:5000/api/menuItems')
        console.log(result.data)
        setUpdateState.current(result.data)
    }

    const subItems = useRef()
    const updateSubItems = async (category, page) => {
        console.log('updated sub items')
        const res = await api.get(`http://localhost:5000/api/headers/${category}/${page}`)
        if (res.data != undefined) {
            console.log(res.data)
            subItems.current = res.data
        }
    }

    const activeLink = useRef()
    const updateSelected = useRef()
    const updateActiveLink = (incomingLink) => {
        if(updateSelected == null) return
        console.log("updated link")
        updateSelected.current(incomingLink)
    }

    return (
        <Context.Provider value = {{
            tabItems,
            setUpdateState,
            updateTabItems,
            
            subItems,
            updateSubItems,

            updateSelected,
            activeLink,
            updateActiveLink
        }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }