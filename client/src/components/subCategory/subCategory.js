import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { Context } from '../../Provider'

const SubCategory = (props) => {
    const { subItems, updateSubItems} = useContext(Context)

    const { to, category, name, selected} = props
    const [child, setChild] = useState(<div>{category}</div>)

    useEffect(() => {
        const f = async () => {
            if(selected === to) {
                await updateSubItems(category, name)
                console.log(subItems.current)
                setChild(
                    <div>
                        {name}
                        {subItems.current.map(x => {
                            return <div>
                                {x}
                            </div>
                        })}
                    </div>
                )
            } else {
                setChild(
                    <div>
                        {name}
                    </div>
                )
            }
        }
        
        f()
    }, [selected])

    return (
        <NavLink 
            to={to}
            activeClassName="link-active"
            className="sidebar-item category-item"
        >
            {child}
        </NavLink>
    )
}

export default SubCategory

//<Link to={address} className="sidebar-item category-item">{y.category}</Link>)