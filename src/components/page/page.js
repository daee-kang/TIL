import React, { useState, useEffect, createRef, useRef, useCallback, useContext } from 'react'
import Editor from '../editor/editor'
import MarkdownDisplay from '../markdownDisplay/markdownDisplay'
import './page.scss'
import { Context } from '../../Provider'

const Page = (props) => {
    const { updateActiveLink } = useContext(Context)

    const { title, category } = props.match.params
    const [isEditing, setIsEditing] = useState(false)

    //if we navigate to different link, reload our isEditing state
    //we are loading the "same" component so watch for props
    useEffect(() => {
        updateActiveLink(`/page/${category}/${title}`)
        setIsEditing(false)
    }, [title, category])

    const handleEditButton = () => {
        setIsEditing(!isEditing)
    }

    const goBackFromEditor = useCallback(() => {
        setIsEditing(false)
    }, [setIsEditing])

    const getElem = () => {
        if(isEditing) {
            return (
                <div>
                    <Editor title={title} category={category} back={goBackFromEditor}/>
                </div>
            )
        } else {
            return (
                <div>
                    <MarkdownDisplay title={title} category={category} />
                    <button className="btn" onClick={handleEditButton}>edit</button>
                </div>
            )
        }
    }

    return (
        <div id="page">
            { getElem() }
        </div>
    )
}

export default Page