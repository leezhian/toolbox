/*
 * @Author: kim
 * @Date: 2022-08-18 10:58:35
 * @Description: 工具类
 */
/**
 * @description: 解析url参数
 * @param {string} url
 * @return {object}
 */
 export const getURLParameters = (url: string) => {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((res: IObject, value) => {
    res[value.slice(0, value.indexOf('='))] = value.slice(value.indexOf('=') + 1)
    return res
  }, {})
}

/**
 * @description: 浏览器信息
 * @return {object}
 */
export const browser = {
  versions: (function () {
    const u = navigator.userAgent
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1, //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      mac: !!u.toLowerCase().match(/macintosh|mac os x/),
    }
  })(),
}

/**
 * @description: 防抖
 * @param {function} fn 执行函数
 * @param {boolean} immediate 是否首次立即执行
 * @param {number} interval 间隔
 * @return {function}
 */
export function debounce(fn: Function, immediate = false, interval = 1000) {
  let timer: any = null

  return function (this: any) {
    if (immediate && !timer) {
      fn && fn.apply(this, arguments)
      timer = setTimeout(() => {
        timer = null
      }, interval)
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn && fn.apply(this, arguments)
    }, interval)
  }
}

/**
 * @description: 节流
 * @param {Function} fn 执行函数
 * @param {Number} interval 间隔
 * @return {Function}
 */
export function throttle(fn: Function, interval = 0) {
  let timer: any = null
  return function (this: any) {
    if (timer) return
    if (interval) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, interval)
    } else {
      timer = true
    }
    fn && fn.apply(this, arguments)
    if (!interval) timer = false
  }
}

/**
 * @description: 复制文本
 * @param {string} text 文本
 * @return {void}
 */
export function copyText(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    textarea.value = text;
    textarea.select();
    document.execCommand('copy', true);
    document.body.removeChild(textarea);
  }
}
