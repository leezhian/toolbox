# 🧰 工具箱

常用工具封装

## storage

localStorage & sessionStorage 封装

```javascript
// 使用
import { localStorage } from 'stroage'
const key = 'TOOLBOX_DEMO'
localStorage.setItem(key, { data: '测试' }, Date.now())
// 保存的结构是 { data: { data: '测试' }, expire: ... }

// true
const isExpire = localStorage.isExpire(key)
// true
const isExist = localStorage.isExistItem(key)
// { data: '测试' }
const value = localStorage.getItem(key)
// 移除
localStorage.removeItem(key)
```

## observer

发布订阅模式封装，**支持存在多个命名空间，命名空间事件互不影响**。

- `create(name)`：单例模式，返回传入命名空间 `Namespace`，没有则新建。

**Namespace**
- `listen(key, fn)`：订阅事件
- `trigger(key[, ...rest])`：发布事件
- `remove(key[, fn])`：移除事件订阅
- `one(key, fn)`：订阅一次该事件

```javascript
import observer from 'observer'

const store = observer.create('demo')
// 订阅
store.listen('sayHi', (name) => {
  // 'hi, kim'
  console.log('hi, ' + name)
})
// 移除该类型所有订阅函数
store.remove('sayHi')

// 发布
store.trigger('sayHi', 'kim')
```

## math

简约版精度计算，如果有很强的精度要求还是建议专业库。
*因为 js 采用的双精度计算，因此在某一下情况下，计算出来的值是有偏差的。如 `0.1 + 0.2 = 0.30000000000000004`*

- `add(arg1, arg2)`：加法
- `sub(arg1, arg2)`：减法
- `mul(arg1, arg2)`：乘法
- `div(arg1, arg2)`：除法

```javascript
import { add } from 'math'

const sum = add(0.1, 0.2) // 0.3
// 乘除减法同理
```

## utils

通用工具类

### getURLParameters(url)

返回url中的参数列表

- `url`：待解析的 url

```javascript
import { getURLParameters } from 'utils'
const url = 'https://xxx.com?a=1&b=true'

const params = getURLParameters(url)
// { a: 1, b: true }
```

### browser

返回 ua 信息对象

```javascript
import { browser } from 'utils'

console.log(browser.version)
```

### debounce(fn, immediate, interval)

防抖

- `fn`：执行函数
- `immediate`：是否首次立即执行
- `interval`：间隔

```javascript
// <button class="btn">测试</button>

import { debounce } from 'utils'

const demo = debounce(() => {
  console.log('debounce')
}, true, 2000)

document.querySelector('.btn').addEventLisenter('click', demo)
```

### throttle(fn, interval)

节流

- `fn`：执行函数
- `interval`：间隔

```javascript
// <button class="btn">测试</button>

import { throttle } from 'utils'

const demo = throttle(() => {
  console.log('throttle')
}, 2000)

document.querySelector('.btn').addEventLisenter('click', demo)
```

### copyText(text)

复制文本

- `text`：文本

```javascript
import { copyText } from 'utils'
copyText('复制文本到剪切板')
```