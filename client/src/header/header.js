import React, { useContext } from 'react'
import './header.scss'
import { Context } from '../Provider'


const Header = (props) => {
    const { toggleSidebar } = useContext(Context)

    return (
        <div className='header'>
            <div className="icon-container" onClick={() => toggleSidebar.current()} >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
            </div>
            <a href="/" className="site-title">dab</a>
        </div>
    )
}

export default Header