import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../../Provider'
import './footer.scss'


const Footer = (props) => {
    const { tabItems } = useContext(Context)
    const { title, category } = props

    const getFooterElems = () => {
        let tabs = tabItems.current

        let next, prev

        console.log(tabs)
        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].title === category) {
                let pages = tabs[i].pages;

                for(let j = 0; j < pages.length; j++) {
                    if(pages[j] === title) {
                        if(j > 0) {
                            prev = pages[j - 1]
                        }
                        if(j < pages.length - 1) {
                            next = pages[j + 1]
                        }
                    }
                }

                if(!prev && !next) return

                let elems = []
                if(prev) {
                    elems.push(
                        <NavLink
                            className="left-link footer-link"
                            onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                            to={`/page/${category}/${prev}`}
                        >
                            ← {prev}
                        </NavLink>
                    )
                }
                if(next) {
                    elems.push(
                        <NavLink
                            className="right-link footer-link"
                            onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                            to={`/page/${category}/${next}`}
                        >
                            {next} →
                        </NavLink>
                    )
                }

                return (
                    <div id="footer">
                        {elems}
                    </div>
                )
            }
        }
        
    }

    return (
        <>
            {getFooterElems()}
        </>
    )
}

export default Footer;