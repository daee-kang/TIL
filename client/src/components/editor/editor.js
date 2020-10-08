import React, { useState, useEffect, useContext } from 'react'
import api from '../../utils/api'
import { Context } from '../../Provider'

const Editor = (props) => {
    const { title, category, back } = props
    const [text, setText] = useState("")
    const { updateSubItems } = useContext(Context)

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get(`${category}/${title}`)
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
        const res = await api.put(`${category}/${title}`, { text })
        await updateSubItems(category, title)
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