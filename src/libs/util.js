import md5 from 'md5';
import { Message } from 'element-ui';
let util = {};
util.title = function (title) {
    title = title ? title + ' - 素焉商城' : '素焉商城';
    window.document.title = title;
};

util.mobile = function (msg, trg) {
    let obj = {
        pattern: /^1\d{10}$/,
        message: '手机号码格式错误',
        trigger: 'blur'
    }
    return result(obj, msg, trg)
};

// md5加密
util.md5Encrypt = function (value) {
    return md5(value)
};

// token设值、读取
util.setToken = function (value) {
    localStorage.setItem('suyanUserToken', value);
};
util.getToken = function () {
    return localStorage.getItem('suyanUserToken');
};
util.removeToken = function () {
    return localStorage.removeItem('suyanUserToken');
};

// 用户信息设值、读取
util.setUserInfo = function (value) {
    localStorage.setItem('suyanUserInfo', JSON.stringify(value));
};
util.getUserInfo = function () {
    return JSON.parse(localStorage.getItem('suyanUserInfo'));
};
util.removeUserInfo = function () {
    return localStorage.removeItem('suyanUserInfo');
};

/**--------------日期转化--------------**/
util.dateFormatter = function(value, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!value) {
        return ''
    }
    let date = new Date(Number(value));
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


util.messageSuccess = function (text) {
    Message({
        message: text,
        type: 'success',
        duration: 1500
    });
};

util.messageError = function (text) {
    Message({
        message: text,
        type: 'error',
        duration: 1500
    });
};

export default util;
