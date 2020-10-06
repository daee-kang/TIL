import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import marked from 'marked'
import Editor from '../editor/editor'
import './markdownDisplay.scss'

const MarkdownDisplay = (props) => {
    const { title, category } = props
    const [text, setText] = useState("")

    //override function for marked, 
    //allows us to put hash href on header
    const renderer = {
        heading(text, level) {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

            return `
                  <h${level} class="marked" id="/page/${category}/${title}#${escapedText}">
                    ${text}
                  </h${level}>`;
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get(`http://localhost:5000/api/${category}/${title}`)
            if (res.data != undefined) {
                let text = res.data.text
                marked.use({ renderer })
                const innerhtml = marked(text)
                setText(innerhtml)
            }
            else setText("")
        }

        fetch()
    })

    return (
        <div id="md-body">
            <div id="md-content" dangerouslySetInnerHTML={{ __html: text }}>
            </div>
        </div>
    )
}

export default MarkdownDisplay