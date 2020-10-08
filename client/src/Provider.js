import React , { createContext, useState, useRef } from 'react'
import api from './utils/api'

const Context = createContext()

const Provider = ({children}) => {

    const tabItems = useRef()
    const setUpdateState = useRef()
    const updateTabItems = async () => {
        const result = await api.get('menuItems')
        setUpdateState.current(result.data)
        tabItems.current = result.data
    }

    const setCurrentSubs = useRef()
    const updateSubItems = async (category, page) => {
        console.log('updated sub items')
        const res = await api.get(`headers/${category}/${page}`)
        setCurrentSubs.current(res.data)
    }

    const allSubs = useRef()
    const updateAllSubItems = async (category, page) => {
        const res = await api.get(`allHeaders`)
        console.log('updated all sub items')
        console.log(res.data)
        allSubs.current = res.data
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

            allSubs,
            updateAllSubItems,

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