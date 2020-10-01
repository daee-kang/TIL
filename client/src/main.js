import React from 'react'
import App from './App'
import { Provider } from './Provider'

const Main = () => {
    //just using this as a context wrapper
    
    return (
        <Provider>
            <App/>
        </Provider>
    )
}

export default Main