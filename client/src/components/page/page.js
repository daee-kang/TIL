import React, { useEffect } from 'react'

const Page = (props) =>{

    const { title, category } = props.match.params
    return (
        <div>
            { title }
            <div>
                { category }
            </div>
        </div>
    )
}

export default Page