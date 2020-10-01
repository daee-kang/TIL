import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { Context } from '../../Provider'

const SubCategory = (props) => {
    const { subItems, updateSubItems} = useContext(Context)

    const { to, category, selected, db_id} = props
    const [child, setChild] = useState(<div>{category}</div>)

    useEffect(() => {
        const f = async () => {
            if(selected === to) {
                await updateSubItems()
                console.log(subItems.current)
                console.log(db_id)
                //let subs = subItems.current[db_id]
                setChild(
                    <div>
                        {category}
                        {/* {subs.map(x => {
                            return <div>
                                {x}
                            </div>
                        })} */}
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