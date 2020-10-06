import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { Context } from '../../Provider'

const SubCategory = (props) => {
    const { setCurrentSubs, updateSubItems } = useContext(Context)
    const { to, category, name, selected } = props
    const [subs, setSubs] = useState([])

    useEffect(() => {
        const f = async () => {
            if (selected === to) {
                setCurrentSubs.current = setSubs
                await updateSubItems(category, name)
            }
        }

        f()
    }, [selected])

    const htmlDecode = (input) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }

    return (
        <NavLink
            to={to}
            activeClassName="link-active"
            className="sidebar-item category-item"
        >
            {name}
            <div>
                {selected === to ? subs.map(x => {
                    return <Link smooth to={`${to}#${x}`}>
                        {htmlDecode(x)}
                    </Link>
                }) : null}
            </div>
        </NavLink>
    )
}

export default SubCategory

//<Link to={address} className="sidebar-item category-item">{y.category}</Link>)