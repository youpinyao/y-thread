# y-thread

run a child thread with worker

## 说明

1. 如需浏览器兼容请 babel
2. 在对应域名根路径下，必须有 y-thread-worker.js 文件

## 使用

```js
  import {
    thread,
  } from 'y-thread';

  thread((a) => {
    return a;
  }, {
    a: 1,
  }).then((data) => {
    console.log(data);
  })
  // => {a: 1};
```