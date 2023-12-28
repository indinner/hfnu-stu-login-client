import axios from "axios";
import {devUrl} from "@/config/base.config";

let request = axios.create({
    timeout: 700000,
})


//判断是否是生产环境
if (process.env.NODE_ENV === 'development') {
    request.defaults.baseURL = devUrl // 本地环境
} else if (process.env.NODE_ENV === 'production') {
    request.defaults.baseURL = proUrl // 正式环境
}

request.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

//请求拦截器
request.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if(token!==null){
        config.headers['token']=token
    }
    return config
},error => {
    return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use(response => {
    if(response.headers.token){
        localStorage.setItem("token",response.headers.token)
    }
    return response
},error => {

})
export default request;


/* 封装 get、post、put、delete 方法，返回 Promise 对象 */
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        request.get(url, {params})
            .then((res) => resolve(res))
            .catch((err) => reject(err))
    })
}

export const post = (url, params, config = {
    headers: {"Content-Type": "application/json"}
}) => {
    return new Promise((resolve, reject) => {
        request.post(url, params, config)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
    })
}

export const put = (url, params, config = {
    headers: {"Content-Type": "application/json"}
}) => {
    return new Promise((resolve, reject) => {
        request.put(url, params, config)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
    })
}

export const delete_ = (url, params) => {
    return new Promise((resolve, reject) => {
        request.delete(url, {params})
            .then((res) => resolve(res))
            .catch((err) => reject(err))
    })
}
