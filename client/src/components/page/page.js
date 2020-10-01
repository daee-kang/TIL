import React, { useState, useEffect, createRef, useRef, useCallback } from 'react'
import api from '../../utils/api'
import marked from 'marked'
import Editor from '../editor/editor'
import MarkdownDisplay from '../markdownDisplay/markdownDisplay'
import './page.scss'

const Page = (props) => {
    const { title, category } = props.match.params
    const [isEditing, setIsEditing] = useState(false)

    //if we navigate to different link, reload our isEditing state
    //we are loading the "same" component so watch for props
    useEffect(() =>{
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
                <button onClick={handleEditButton}>dab</button>
                    <MarkdownDisplay title={title} category={category} />
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