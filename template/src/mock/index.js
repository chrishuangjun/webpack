import Mock from 'mockjs';

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false;
    }
    this.proxy_send(...arguments);
};
function importAll (r) {
    r.keys().forEach(key => {
        if (key === './index.js') return;
        let obj = r(key).default;
        // 加载api配置对象
        let originApiConf = require(`../util/api/${key.slice(2)}`).default;

        for (let [key, value] of Object.entries(obj)) {
            // url and method 来自API配置对象，mock响应函数来自mock配置对象
            if (!originApiConf[key].mock) continue;
            Mock.mock(
                RegExp(originApiConf[key].url),
                originApiConf[key].method,
                value.mockRes
            );
        }
    });
}
importAll(require.context('./', true, /\.js$/));

export default Mock;
