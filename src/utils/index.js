
export default{
  // UUID就是Universal Unique IDentifier的缩写，它是一个128位，16字节的值，并确保在时间和空间上唯一。
  // 它是把硬件地址、时间以及随机数结合在一起，它保证对在同一时空中的所有机器都是唯一的。
  // 这个可以指定长度和基数
  uuid (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []
    var i
    radix = radix || chars.length
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      // rfc4122, version 4 form
      var r
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  },
  arr2str (arr, divider) {
    let r = ''
    divider = divider || ','
    for (let i = 0; i < arr.length; i++) {
      r += arr[i] + divider
    }
    r = (r.substring(r.length - 1) === divider)  ? r.substring(0, r.length - 1) : r
    return r
  },
  findElem (arrayToSearch, attr, val) { /* 按照属性值，查找对象 */
    for (var i=0; i<arrayToSearch.length; i++) {
      if (arguments.length >=3) {
        if (arrayToSearch[i][attr] == val) {
          return i;
        }
      } else {
        if (arrayToSearch[i] == arguments[1]) {
          return i;
        }
      }
    }
    return -1;
  },
  removeObjWithArr (_arr, _obj) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
      if (_arr[i] == _obj) {
        if (i == 0) {
          _arr.shift(); // 删除并返回数组的第一个元素
          return;
        } else if (i == length-1) {
          _arr.pop();  // 删除并返回数组的最后一个元素
          return;
        } else {
          _arr.splice(i, 1); // 删除下标为i的元素
          return;
        }
      }
    }
  },
  isEmptyObj (obj) {
    return JSON.stringify(obj) == "{}"
  },
  transformDateStr (date) {
    return new Date(date).getTime()
  },
  substring (str, start, end) {
    return str.substring(start, end)
  },
  URLencode (str) {
    return escape(str).replace(/\+/g, '%2B').replace(/"/g, '%22').replace(/'/g, '%27').replace(/\//g, '%2F');
  },
  dateFormat (date, fmt) {
    function dateFtt (date, fmt) {
      var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
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
    }
    return dateFtt(date, fmt);
  },
  formatSeconds (value) {
    let secondTime = parseInt(value);// 秒
    let minuteTime = 0;// 分
    let hourTime = 0;// 小时
    if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      // 如果分钟大于60，将分钟转换成小时
      if (minuteTime > 60) {
        // 获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        // 获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    let result = "" + parseInt(secondTime) + "秒";

    if (minuteTime > 0) {
      result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
      result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
  },
  deepCopy (obj, copy) {
    for (var i in obj) {
      if (typeof obj[i] == 'object') { // 判断是否为对象
        this.deepCopy(obj[i], copy[i]); // 回调深拷贝函数
      } else {
        copy[i] = obj[i]; // 不是对象直接复制
      }
    }
    return copy;
  },
  iteration (data, callback) {
    for (var j = 0; j < data.length; j++) {
      if (callback) {
        callback(data[j])
      }
      if (data[j].children != undefined && data[j].children.length > 0) {
        this.iteration(data[j].children, callback)
      }
    }
  },
  flattern (data) {
    return data.reduce((iter, val) => {
      iter.push(val);
      return val.children ? [...iter, ...this.flattern(val.children)] : iter;
    }, []);
  },
  grabVal (arr, key) {
    var r = []
    for (let i = 0; i < arr.length; i++) {
      r.push(arr[i][key])
    }
    return r
  },
  setVal (arr, key, val) {
    var r = []
    for (let i = 0; i < arr.length; i++) {
      arr[i][key] = val
    }
    return r
  },
  /* 显示隐藏 */
  fadeIn (show) {
    $(show).fadeIn()
  },
  fadeOut (hide) {
    $(hide).fadeOut()
  },
  bracketText (str) {
    var matchStr=str;
    var resultArray=[];
    var bracket = /\((.*?)\)/;// 要计算的字符*!/
    var regex = new RegExp(bracket, 'igm'); // 使用g表示整个字符串都要匹配
    var result = matchStr.match(regex);
    var count = !result ? 0 : result.length;
    for (let i=0; i<count; i++) {
      result[i]=result[i].replace("(", "");
      result[i]=result[i].replace(")", "");
      result[i]=result[i].replace(/(^\s*)|(\s*$)/g, "");
      resultArray.push(result[i]);
    }
    return resultArray;
  },
  bracketReplace (str, replaceInput) {
    var bracketNum;
    var matchStr=str;
    var bracket = /\((.+?)\)/;// 要计算的字符*!/
    var regex = new RegExp(bracket, 'igm'); // 使用g表示整个字符串都要匹配
    var result = matchStr.match(regex);
    bracketNum = !result ? 0 : result.length;
    var wtStr=matchStr.replace(regex, replaceInput);
    return wtStr;
  },
  /* 字符串转dom对象 */
  parseDom (arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE;
  },
  debounce (fn, delay) { // 将会包装事件的 debounce 函数
    let timer = null;
    return function () {
      // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  },
  getQueryString (name) { // 获取地址栏url
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.href.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else if (q != null) {
      return decodeURIComponent(q[2]);
    } else {
      return null;
    }
  },
  judgementOri (orgType) {
    if (orgType == '1') { // 职称教育
      return 'continueEdu'
    } else if (orgType == '2') { // 安全教育
      return 'byl'
    } else if (orgType == '3') { // 企业内训
      return 'entrain'
    } else if (orgType == '4') { // 党建教育
      return 'byl'
    } else {
      return 'byl'
    }
  }
}
