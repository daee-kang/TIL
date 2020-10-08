import React , { createContext, useState, useRef } from 'react'
import api from './utils/api'

const Context = createContext()

const Provider = ({children}) => {

    const tabItems = useRef()
    const setUpdateState = useRef()
    const updateTabItems = async () => {
        const result = await api.get('menuItems')
        console.log(result.data)
        setUpdateState.current(result.data)
    }

    const setCurrentSubs = useRef()
    const updateSubItems = async (category, page) => {
        console.log('updated sub items')
        const res = await api.get(`headers/${category}/${page}`)
        setCurrentSubs.current(res.data)
    }

    const activeLink = useRef()
    const updateSelected = useRef()
    const updateActiveLink = (incomingLink) => {
        if(updateSelected == null) return
        console.log("updated link")
        updateSelected.current(incomingLink)
    }

    const updateCurrentSub = useRef()

    const toggleSidebar = useRef()

    return (
        <Context.Provider value = {{
            tabItems,
            setUpdateState,
            updateTabItems,
            
            setCurrentSubs,
            updateSubItems,

            updateSelected,
            activeLink,
            updateActiveLink,

            updateCurrentSub,

            toggleSidebar
        }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }