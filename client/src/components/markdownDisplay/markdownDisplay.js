import React, { useState, useEffect, useContext } from 'react'
import api from '../../utils/api'
import marked from 'marked'
import hljs from 'highlight.js'
import './markdownDisplay.scss'
import Footer from '../footer/footer'

const MarkdownDisplay = (props) => {
    const { title, category } = props
    const [text, setText] = useState("")

    //override function for marked, 
    //allows us to put hash href on header
    const renderer = {
        heading(text, level) {
            return `
                  <h${level} class="marked" id="${text}">
                    ${text}
                  </h${level}>`;
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get(`${category}/${title}`)
            if (res.data != "not found") {
                console.log(res.data)

                let text = res.data.text
                marked.setOptions({
                    highlight: function(code, language) {
                        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                        return hljs.highlight(validLanguage, code).value;
                    },
                    gfm: true,
                    breaks: true
                })
                marked.use({renderer})
                const innerhtml = marked(text)
                setText(innerhtml)
            }
            else setText("")
        }

        fetch()
    })

    return (
        <div id="md-body">
            <div className="md-content" dangerouslySetInnerHTML={{ __html: text }}>
            </div>
            <Footer title={title} category={category}/>
        </div>
    )
}

export default MarkdownDisplay