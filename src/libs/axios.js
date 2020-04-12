import axios from 'axios';
import Util from './util.js';
axios.defaults.timeout = 15000
axios.defaults.withCredentials = true
axios.defaults.responseType = 'json'
axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.get['If-Modified-Since'] = '0'
axios.defaults.cache = false
// http response 拦截器
axios.interceptors.response.use(
    response => {
        // 接口拦截，用户未登陆
        console.log(response.data)
        const code = response.data.code;
        if(code === 200) {
            return response.data;
        } else{
            if(code === 600 || code === 601) {
                Util.messageError(response.data.message || '系统异常');
                // localStorage.removeItem('aegeanUserInfo')
                top.location.href = '/#/login'
            } else {
                Util.messageError(response.data.message || '系统异常');
                return Promise.reject(response.data)
            }
        }
    },
    error => {
        Util.messageError('当前网络不稳定，请稍后重试');
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    })
/*
loading为true 调用这个api会打开loading，结束关闭
loading为false  调用只会关闭loading ,主要用于首次打开tab页面，关闭loading
loading为''或者不传  什么都不操作
 */
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (Util.getToken()) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = Util.getToken();
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
export default class Http {
    static send(config, loading) {
        const currentUrl = encodeURIComponent(window.location.href)
        const configs = Object.assign({
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'currentUrl': currentUrl,
                'L-A-Platform': 'erp-web' //后端日志埋点渠道
            },
            timeout: 15000
        }, config)
        if (loading) {
            loadingShowOrHide(true)
        }
        return axios(configs).then((res) => {
            if (loading === '' || typeof loading == 'object' || loading === undefined) {
                // 什么都不操作
            } else {
                loadingShowOrHide()
            }
            return res
        }).catch((error) => {
            if (loading === '' || typeof loading == 'object' || loading === undefined) {
                // 什么都不操作
            } else {
                loadingShowOrHide()
            }
            throw error
        })
    }
    static post(url, params = {}, loading) {
        const config = {
            method: 'post',
            url,
            data: params
        }
        return Http.send(config, loading)
    }
    static get(url, params = {}, loading) {
        let urlParams = []
        Object.keys(params).forEach((key) => {
            urlParams.push(`${key}=${encodeURIComponent(params[key])}`)
        })
        if (urlParams.length) {
            urlParams = `${url}?${urlParams.join('&')}`
        } else {
            urlParams = url
        }
        const config = {
            url: urlParams,
            params: {
                randomTime: new Date().getTime() // 防止缓存
            }
        }
        return Http.send(config, loading)
    }
}