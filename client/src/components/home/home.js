import React from 'react'
import './home.scss'
import '../markdownDisplay/markdownDisplay.scss'

const Home = () => {
    return (
        <div id="home">
            <div className="md-content">
                <h1>daee's dev journal</h1>
                These are just my dev notes :-)
                
                <div id="add-page">
                    <h2>add a new category:</h2>
                    <input></input>
                </div>

                <div id="add-page">
                    <h2>add a new page:</h2>
                    
                </div>
            </div>
        </div>
    )
}

export default Home