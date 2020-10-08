import axios from 'axios'

export default axios.create({
    //todo: create env variable for this
    baseURL: "http://localhost:5000/api",
    responseType: "json"
})