import React, { useState, useEffect } from 'react'
import './tabBar.scss'

const TabBar = (props) => {
    return (
        <div id="tabbar" className={`${props.sidebar ? "open" : "closed"}`}>
            {props.data.map(x => {
                let elems = []
                elems.push(<a href="#" className="tab-item"> {x.name} </a>)
                x.pages.map(y => {
                    elems.push(<a href="#" className="category-item">{y.category}</a>)
                })

                return <div>{elems}</div>
            })}
        </div>
    )
}

export default TabBar