import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { Context } from '../../Provider'

const SubCategory = (props) => {
    const { setCurrentSubs, updateSubItems, updateCurrentSub } = useContext(Context)
    const { to, category, name, selected } = props
    const [subs, setSubs] = useState([])
    const [currentSub, setCurrentSub] = useState("")

    useEffect(() => {
        const f = async () => {
            if (selected === to) {
                setCurrentSubs.current = setSubs
                await updateSubItems(category, name)

                console.log(window.location.hash)
            }
        }
        updateCurrentSub.current = setCurrentSub
        f()
        console.log(htmlDecode(props.location))
    }, [selected])

    useEffect(() => {
        console.log(currentSub)
    }, [currentSub])

    const htmlDecode = (input) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    return (
        <div>
            <NavLink
                to={to}
                activeClassName="link-active"
                className="sidebar-item category-item"
            >
                {name}
            </NavLink>
            <div>
                {selected === to ? subs.map(x => {
                    return <Link 
                            smooth 
                            to={`${to}#${x}`} 
                            className={
                                x == currentSub ? "subcategory-active subcategory" : "subcategory"
                            }
                            >
                        {htmlDecode(x)}
                    </Link>
                }) : null}
            </div>
        </div>

    )
}

export default SubCategory

//<Link to={address} className="sidebar-item category-item">{y.category}</Link>)