import React, { useState, useEffect, useContext } from 'react'
import SubCategory from '../subCategory/subCategory'
import api from '../../utils/api'
import './tabBar.scss'

import { Context } from '../../Provider'

const TabBar = (props) => {
    const { updateSelected } = useContext(Context)
    const [ selected, setSelected ] = useState("") //this is handled in provider
    updateSelected.current = setSelected //sending the statesetter in provider
    //all of this is updated when page.js is rendered
    console.log(props.data)

    useEffect(() => {

    })

    //handle collapsing on click
    const collapse = (e) => {
        //handle if we click on the arrow
        if(e.target.tagName === "SPAN") {
            e.target = e.target.parentElement
        }
        
        e.target.classList.toggle("active")
        let content = e.target.nextElementSibling

        if(content == null) return;

        //expand collapse
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = 100 + "%";
        }

        //rotate arrow
        let arrow = e.target.querySelector('.arrow')
        if(arrow.classList.contains("right")) {
            arrow.classList.remove("right")
            arrow.classList.add("down")
        } else {
            arrow.classList.add("right")
            arrow.classList.remove("down")
        }
    }

    return (
        <div id="tabbar" className={`${props.sidebar ? "open" : "closed"}`}>
            {props.data.map(x => {
                let titles = []
                titles.push()
                
                let subCategories = []
                x.pages.map(page => {
                    const address = `/page/${x.title}/${page}`
                    subCategories.push(
                        <SubCategory
                            selected={selected} 
                            to={address}
                            name={page}
                            category={x.title}
                        />
                    )
                })

                return (
                    <>
                        <div
                            className="sidebar-item tab-item collapsible"
                            onClick={collapse}
                            > 
                                {x.title} 
                                <span className="arrow right"/>
                            </div>
                        <div className="content">{subCategories}</div>
                    </>
                )
            })}
        </div>
    )
}

export default TabBar