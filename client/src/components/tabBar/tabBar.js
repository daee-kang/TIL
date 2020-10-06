import React, { useState, useEffect, useContext } from 'react'
import SubCategory from '../subCategory/subCategory'
import api from '../../utils/api'
import './tabBar.scss'

import { Context } from '../../Provider'

const TabBar = (props) => {
    const { updateSelected, subItems, updateSubItems, activeLink } = useContext(Context)
    const [ selected, setSelected ] = useState("") //this is handled in provider
    updateSelected.current = setSelected //sending the statesetter in provider
    //all of this is updated when page.js is rendered
    console.log(props.data)

    return (
        <div id="tabbar" className={`${props.sidebar ? "open" : "closed"}`}>
            {props.data.map(x => {
                let elems = []
                elems.push(<a href="#" key={x.title} className="sidebar-item tab-item"> {x.title} </a>)
                x.pages.map(page => {
                    const address = `/page/${x.title}/${page}`
                    elems.push(
                        <SubCategory
                            selected={selected} 
                            to={address}
                            name={page}
                            category={x.title}
                        />
                    )
                })

                return <div>{elems}</div>
            })}
        </div>
    )
}

export default TabBar