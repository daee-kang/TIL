import React, { useState, useEffect, useContext } from 'react'
import api from '../../utils/api'
import { Context } from '../../Provider'
import './editor.scss'

const Editor = (props) => {
    const { title, category, back } = props
    const [text, setText] = useState("")
    const { updateSubItems, updateAllSubItems } = useContext(Context)

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
    }

    const save = async (e) => {
        console.log(`sending ${text}`)
        const res = await api.put(`${category}/${title}`, { text })
        await updateSubItems(category, title)
        await updateAllSubItems()
        console.log(res)
        back()
    }

    const handleTab = (e) => {
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;
        
            // set textarea value to: text before caret + tab + text after caret
            e.target.value = e.target.value.substring(0, start) +
              "\t" + e.target.value.substring(end);
        
            // put caret at right position again
            e.target.selectionStart =
              e.target.selectionEnd = start + 1;

            setText(e.target.value)
          }
    }

    return (
        <div>
            <textarea name="body"
                onChange={handleTextChange}
                value={text}
                onKeyDown={handleTab}
            />
            <button className="btn primary-btn" onClick={save}>save</button>
            <button className="btn" onClick={() => back()}>cancel</button>
        </div>

    )

}

export default Editor