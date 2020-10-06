import React, { useState, useEffect } from 'react'
import api from '../../utils/api'

const Editor = (props) => {
    const { title, category, back } = props
    const [text, setText] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get(`http://localhost:5000/api/${category}/${title}`)
            if(res.data != undefined) {
                let text = res.data.text
                setText(text)
            }
            else setText("")
        }

        fetch()
    }, [])

    const handleTextChange = (e) => {
        setText(e.target.value)
        console.log(e.target.value)
    }

    const save = async (e) => {
        console.log(`sending ${text}`)
        const res = await api.put(`http://localhost:5000/api/${category}/${title}`, { text })
        console.log(res)
        back()
    }

    return (
        <div>
            <button onClick={save}>save</button>
            <textarea name="body"
                onChange={handleTextChange}
                value={text}
            />
        </div>

    )

}

export default Editor