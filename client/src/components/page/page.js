import React, { useState, useEffect } from 'react'
import api from '../../utils/api'

const Page = (props) =>{
    const { title, category } = props.match.params
    const [text, setText] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get(`http://localhost:5000/api/tabs/${category}/${title}`)
            if(res.data != undefined)
                setText(res.data.text)
            else setText("")
        }

        fetch()
    })


    return (
        <div>
            <div>
                { text }
            </div>
        </div>
    )
}

export default Page