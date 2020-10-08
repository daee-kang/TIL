import React, { useContext, useEffect, useState } from 'react'
import './header.scss'
import { Context } from '../Provider'
import { NavLink } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'


const Header = (props) => {
    const { toggleSidebar, tabItems, allSubs } = useContext(Context)
    const [ searchVal, setSearchVal ] = useState("");  
    const [ searchDiv, setSearchDiv ] = useState(null);
    

    const searchHandler = (e) => {
        setSearchVal(e.target.value)

        //do search operations 
        let results = []
        let em = []

        for(let i = 0; i < tabItems.current.length; i++) {
            let pages = tabItems.current[i].pages
            for(let j = 0; j < pages.length; j++) {
                if(pages[j].includes(e.target.value)) {
                    results.push({
                        text: pages[j],
                        to: `page/${tabItems.current[i].title}/${pages[j]}`
                    })
                }
            }
        }
        results.map((result) => {
            em.push(
                <NavLink 
                    to={"/" + result.to}
                    className="search-link"
                    onClick={() => setSearchVal("")}
                >
                    {result.text}
                </NavLink>
            )
        }) 
        results = []

        for(let i = 0; i < allSubs.current.length; i++) {
            let sub = allSubs.current[i]
            
            if(sub.text.includes(e.target.value)) {
                results.push({
                    text: `${sub.page} > ${sub.text}`,
                    to: `page/${sub.category}/${sub.page}#${sub.text}`
                })
            }
        }
        results.map((result) => {
            em.push(
                <Link 
                    to={"/" + result.to}
                    className="search-link"
                    onClick={() => setSearchVal("")}
                >
                    {result.text}
                </Link>
            )
        }) 

        if(em.length === 0) {
            setSearchDiv(null)
            return
        }

        setSearchDiv(
            <div className="search-results">
                {em}
            </div>
        )
    }


    useEffect(() => {
        if(searchVal === "") setSearchDiv(null)

        
    }, [searchVal])

    return (
        <div className='header'>
            <div className="icon-container" onClick={() => toggleSidebar.current()} >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
            </div>
            <a href="/" className="site-title">daee</a>
            <div className="search-box">
                <input 
                    autoComplete="off" 
                    spellCheck="false"
                    value={searchVal}
                    onChange={searchHandler} 
                    onBlur={() => setSearchDiv(null)}
                    onFocus={searchHandler}
                    />
                {/* searh results down here m8 */}
                {searchDiv}
            </div>
            <div className="link-container">
                <a href="https://github.com/daee-kang" className="header-link">GitHub</a>
            </div>

        </div>
    )
}

export default Header