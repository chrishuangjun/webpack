/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../../router/index';
import { Spin, Message } from 'mui';
import qs from 'qs';
axios.defaults.timeout = 120000; // 超时时间，单位ms，这里设置为2分钟
class Http {
    constructor() {
        this.counter = 0;
        this.instance = axios.create();
        this.initAxios();
    }
    showLoading() {
        if (this.counter === 0) {
            Spin.show();
        }
    }
    hideLoading() {
        if (this.counter === 0) {
            Spin.hide();
        } else {
            this.counter--;
        }
    }
    /**
    * 提示函数
    * 禁止点击蒙层、显示一秒后关闭
    */
    tip(msg) {
        Message.info({
            content: msg,
            duration: 2,
            closable: true
        });
    };
    /**
    * 跳转登录页
    * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
    */
    toLogin() {
        router.replace({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        });
    };

    /**
    * 请求失败后的错误统一处理
    * @param {Number} status 请求失败的状态码
    */
    errorHandle(status, other) {
        // 状态码判断
        switch (status) {
            // 401: 未登录状态，跳转登录页
            case 401:
                this.toLogin();
                break;
            // 403 token过期
            // 清除token并跳转登录页
            case 403:
                this.tip('登录过期，请重新登录');
                setTimeout(() => {
                    this.toLogin();
                }, 1000);
                break;
            // 404请求不存在
            case 404:
                this.tip('请求的资源不存在');
                break;
            default:
                console.log(other);
        }
    };
    initAxios() {
        this.instance.defaults.baseURL = process.env.NODE_ENV.indexOf('local') !== -1 ? '/local' : window.location.origin + '/api';
        // 设置post请求头
        this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        /**
         * 请求拦截器
         * 每次请求前，如果存在token则在请求头中携带token
         */
        this.instance.interceptors.request.use(
            config => {
                let paramsObj = qs.parse(config.data);
                if (paramsObj.isShowLoading) {
                    this.showLoading();
                    delete config.isShowLoading;
                }
                return config;
            },
            error => Promise.error(error)
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            // 请求成功
            res => {
                res.status === 200 ? Promise.resolve(res) : Promise.reject(res);
                this.hideLoading();
            },
            // 请求失败
            error => {
                const { response } = error;
                this.hideLoading();
                if (response) {
                    // 请求已发出，但是不在2xx的范围
                    this.errorHandle(response.status, response.data.message);
                    return Promise.reject(response);
                } else {
                    // 处理断网的情况
                    // eg:请求超时或断网时，更新state的network状态
                    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
                    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
                    this.tip('请求超时或断网');
                }
            }
        );
    }
}
export default new Http().instance;
