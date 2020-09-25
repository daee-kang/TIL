import React, { useState, useEffect, createRef, useRef } from 'react'
import api from '../../utils/api'
import marked from 'marked'

const Page = (props) =>{
    const { title, category } = props.match.params
    const [text, setText] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get(`http://localhost:5000/api/tabs/${category}/${title}`)
            if(res.data != undefined) {
                let text= res.data.text
                const innerhtml = marked(text)
                setText(innerhtml)
            }
            else setText("")
        }

        fetch()
    })


    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: text}}>
            </div>
        </div>
    )
}

export default Page