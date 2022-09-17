# 工具箱

常用工具封装

## storage

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

## utils

### getURLParameters(url)

- `url`：待解析的 url

返回url中的参数列表

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

- `fn`：执行函数
- `immediate`：是否首次立即执行
- `interval`：间隔

防抖

```javascript
// <button class="btn">测试</button>

import { debounce } from 'utils'

const demo = debounce(() => {
  console.log('debounce')
}, true, 2000)

document.querySelector('.btn').addEventLisenter('click', demo)
```

### throttle(fn, interval)

- `fn`：执行函数
- `interval`：间隔

节流

```javascript
// <button class="btn">测试</button>

import { throttle } from 'utils'

const demo = throttle(() => {
  console.log('throttle')
}, 2000)

document.querySelector('.btn').addEventLisenter('click', demo)
```

### copyText(text)

- `text`：文本

复制文本

```javascript
import { copyText } from 'utils'
copyText('复制文本到剪切板')
```