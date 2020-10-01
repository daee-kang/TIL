import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import marked from 'marked'
import Editor from '../editor/editor'
import './markdownDisplay.scss'

const MarkdownDisplay = (props) => {
    const { title, category } = props
    const [text, setText] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get(`http://localhost:5000/api/tabs/${category}/${title}`)
            if(res.data != undefined) {
                let text = res.data.text
                const innerhtml = marked(text)
                setText(innerhtml)
            }
            else setText("")
        }

        fetch()
    })

    return (
        <div id="md-body">
            <div id="md-content" dangerouslySetInnerHTML={{__html: text}}>
            </div>
        </div>
    )
}

export default MarkdownDisplay