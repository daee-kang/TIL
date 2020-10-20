import axios from 'axios'

export default axios.create({
    //todo: create env variable for this
    baseURL: "https://svzz83ygq6.execute-api.us-east-1.amazonaws.com/dev/api",
    responseType: "json"
})