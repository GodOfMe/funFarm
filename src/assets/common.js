// 引入 lodash
// var _ = require('lodash');
//
// @what localstronge
//
import { Message } from "element-ui";
const localstronge = {
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    get(key) {
        return window.localStorage.getItem(key)
    },
    delete(key) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    },
};

//
// @what cookie
//
const cookie = {
    set(key, value, days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 3600 * 1000);
        document.cookie = key + "=" + escape(value) + ";path=/;expires=" + date.toGMTString();
    },
    get(key) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split(";");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == key)
                return arr[1];
        }
        return "";
    },
    delete(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(key);
        if (cval != null)
            document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
    }
};


//
// @what session
//

const session = {
    set(key, value) {
        sessionStorage.setItem(key, value);
    },
    delete(key) {
        sessionStorage.removeItem(key);
    },
    get(key, value) {
        sessionStorage.getItem(key, value);
    },
    // 清除全部
    clean() {
        sessionStorage.clear();
    }

};

//
// @what time 时间轴转换
//
const exchangeTime = {
    //
    // @what 时间戳转换成所需时间格式
    // @fmt 展示所需类型 ex：yyyy-MM-dd;   yyyy-MM-dd hh:mm:ss
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    //
    format(longtime, fmt) {
        let time = new Date((longtime.toString().length == 13) ? longtime : longtime * 1000);

        function padLeftZero(str) {
            return ('00' + str).substr(str.length);
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let date = {
            "M+": time.getMonth() + 1,
            "d+": time.getDate(),
            "h+": time.getHours(),
            "m+": time.getMinutes(),
            "s+": time.getSeconds(),
            // "q+": Math.floor((time.getMonth() + 3) / 3),
            // "S+": time.getMilliseconds()
        };
        for (let k in date) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = date[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    },
    //
    // @what 时间转换成时间戳  精确到毫秒 13位
    //
    timestamp(timestr) {
        let date = new Date(timestr)
        return date.getTime();
    },
    // /**
    //  * [formatDate 将日期格式化]
    //  * @param  {[type]} fmt  [格式化的形式] "yyyy-MM-dd hh:mm:ss"
    //  * @param  {[type]} date [日期]  Date对象
    //  * return  "2015-03-19 12::00:00"
    //  */
    formatDate(fmt, date) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    //
    // 时间字符串转时间对象
    // @param ex:"2018-05-15 08:00:00"
    // return 13位时间戳
    //
    timeStrToDate(timeStr) {
        return Date.parse(new Date(timeStr));
    },
    extendFn: (function () {
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                S: this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (this.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1 ?
                        o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length)
                    );
                }
            }
            return fmt;
        };
    })()
};

//
// @what obj 对象方法
//
export const objFunction = {
    // 判断对象是否有该属性
    hasKey(obj, key) {
        return !object.hasOwnProperty(name) && (name in object);
    }
};

//
// @what arr 数组方法
//

const arrFunction = {
    // 数组去重 && 合并数组 不支持 IE 和 Android
    mergeArr() {
        let newSet = new Set();
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i].length; j++) {
                newSet.add(arguments[i][j])
            }
        }
        let newArr = Array.from(newSet)
        return newArr;
    },
    // 数组求最大值 默认保留两位 支持多组数组
    maxArr() {
        let arr = [];
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i].length; j++) {
                arr.push(parseInt(arguments[i][j]))
            }
        }
        return Math.max(...arr)
    },
    // 数组求最大值 默认保留两位 支持多组数组
    minArr() {
        let arr = [];
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i].length; j++) {
                arr.push(parseInt(arguments[i][j]))
            }
        }
        return Math.min(...arr)
    },


};

//
// @what arr 字符串方法
//
export const strFunction = {
    // 字符串转换成一维数组
    singleToArr(str) {
        return [...str]
    },
    //获得Unicode字符的长度
    UnicodeLength(str) {
        return [...str].length
    }

};

//
// @what 柯里化
//
export const curry = function (func) {
    var length = func.length,
        args = Array.prototype.slice.call(arguments, 1) || [];
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this, func, ...newArgs);
        } else {
            return func.apply(this, newArgs);
        }
    }
}



const res = function (res) {
  if (res.success) {
    Message({
      showClose: true,
      message: '操作成功',
      type: "success"
    });
    return res.success
  } else {
    if (res.mesg) {
      res.msg = res.mesg
    }
    Message({
      showClose: true,
      message: res.msg,
      type: "warning"
    })
    return false
  }
}


export default {
  localstronge,
  cookie,
  session,
  exchangeTime,
  arrFunction,
  res
}
