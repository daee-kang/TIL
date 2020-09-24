import React, { useState, useEffect } from 'react'

const TabBar = (props) => {

    return (
        <div>
            {props.data.map(x => <div> {x.name} </div>)}
        </div>
    )
}

export default TabBar