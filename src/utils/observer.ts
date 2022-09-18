/*
 * @Author: kim
 * @Date: 2022-05-30 23:42:02
 * @Description: 发布订阅， 注意不要滥用
 */
import { cloneDeep as _cloneDeep } from 'lodash'

class NameSpace {
  namespace: string
  cache: { [key: string]: Array<Function> }

  constructor(namespace: string) {
    this.namespace = namespace
    this.cache = {}
  }

  /**
   * @description: 订阅事件
   * @param {String} key 事件名
   * @param {Function} fn 回调函数
   * @return {void}
   */
  listen(key: string, fn: Function) {
    if (!this.cache[key]) {
      this.cache[key] = []
    }

    this.cache[key].push(fn)
  }

  /**
   * @description: 发布事件
   * @param {String} key 事件名
   * @param {Array} rest 回调参数
   * @return {void}
   */
  trigger(key: string, ...rest: Array<any>) {
    const stack = _cloneDeep(this.cache[key])

    if (!stack || !stack.length) return
    for (let i = 0, len = stack.length; i < len; i++) {
      stack[i].apply(stack[i], rest)
    }
  }

  /**
   * @description: 只订阅一次
   * @param {String} key 事件名
   * @param {Function} fn 回调函数
   * @return {void}
   */
  one(key: string, fn: Function) {
    const onceFn = () => {
      fn()
      this.remove(key)
    }

    this.listen(key, onceFn)
  }

  /**
   * @description: 移除订阅
   * @param {String} key
   * @param {Function} fn
   * @return {void}
   */
  remove(key: string, fn?: Function) {
    if (this.cache[key]) {
      if (fn) {
        for (let i = this.cache[key].length; i >= 0; i--) {
          if (this.cache[key][i] === fn) {
            this.cache[key].splice(i, 1);
          }
        }
      } else {
        this.cache[key] = []
      }
    }
  }
}

class Observer {
  private _defaultNameSpace: string
  namespaceCache: { [key: string]: NameSpace }

  constructor() {
    this._defaultNameSpace = 'default'
    this.namespaceCache = {}
  }

  /**
   * @description: 新建命名空间
   * @param {string} namespace 空间名字
   * @return {NameSpace}
   */
  create(namespace?: string) {
    const name = namespace || this._defaultNameSpace

    if (!this.namespaceCache[name]) {
      this.namespaceCache[name] = new NameSpace(name)
    }

    return this.namespaceCache[name]
  }
}

export default new Observer() 
