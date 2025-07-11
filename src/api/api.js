import axios from "axios";
const local = 'http://localhost:5000'
const production = 'https://zobixy-online-backend-v1-2.onrender.com'

let api_url = ''
let mode = 'prod'

if (mode === 'prod') {
    api_url = production
} else {
    api_url = local
}
const api = axios.create({
    baseURL : `${api_url}/api`,
    withCredentials: true
})

export default api