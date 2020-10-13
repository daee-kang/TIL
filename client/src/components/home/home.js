import React, { useContext, useEffect, useState } from 'react'
import './home.scss'
import '../markdownDisplay/markdownDisplay.scss'
import api from '../../utils/api'

import { Context } from '../../Provider'

const Home = () => {
    const [addPageVal, setAddPageVal] = useState("")
    const [addCategVal, setAddCategVal] = useState("")
    const [categories, setCategories] = useState(null)
    const [addPageValCategory, setAddPageValCategory] = useState(null)

    const { updateTabItems, tabItems } = useContext(Context)

    useEffect(() => { 
        updateCategorySelectValues()
    }, [])

    const updateCategorySelectValues = () => {
        const items = tabItems.current
        let options = []
        let isSet = false
        items.map((item) => {
            if(!isSet) {
                //init value of select element
                setAddPageValCategory(item.title)
                isSet = true
            }
            options.push(<option value={item.title}>{item.title}</option>)
        })
        setCategories(options)
    }

    const submitAddCategory = async (e) => {
        await api.post(`${addCategVal}`)
        await updateTabItems()
        updateCategorySelectValues()
    }

    const submitAddPage = async (e) => {
        await api.post(`${addPageValCategory}/${addPageVal}`)
        await updateTabItems()
    }

    return (
        <div id="home">
            <div className="md-content">
                <h1>daee's dev journal</h1>
                These are just my dev notes :-)
                
                <div id="add-page">
                    <h2>add a new category:</h2>
                    <input value={addCategVal} onChange={(e) => setAddCategVal(e.target.value)}></input>
                    <button onClick={submitAddCategory}>yes</button>
                </div>

                <div id="add-page">
                    <h2>add a new page:</h2>
                    <select value={addPageValCategory} onChange={(e) => setAddPageValCategory(e.target.value)}>
                        {categories}
                    </select>
                    <input value={addPageVal} onChange={(e) => setAddPageVal(e.target.value)}></input>
                    <button onClick={submitAddPage}>yes</button>
                </div>


            </div>
        </div>
    )
}

export default Home