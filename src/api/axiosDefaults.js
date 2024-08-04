import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-cs-8ddd0772a0f2.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();
