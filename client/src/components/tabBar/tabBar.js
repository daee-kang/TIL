import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './tabBar.scss'

const TabBar = (props) => {
    return (
        <div id="tabbar" className={`${props.sidebar ? "open" : "closed"}`}>
            {props.data.map(x => {
                let elems = []
                elems.push(<a href="#" className="sidebar-item tab-item"> {x.name} </a>)
                x.pages.map(y => {
                    const address = `/page/${x.name}/${y.category}`
                    elems.push(<Link to={address} className="sidebar-item category-item">{y.category}</Link>)
                })

                return <div>{elems}</div>
            })}
        </div>
    )
}

export default TabBar