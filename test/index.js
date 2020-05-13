import {
  thread
} from '../index';

const startTime = +new Date();

let startAt = +new Date();

const timer = setInterval(() => {
  console.log(+new Date() - startAt);
  startAt = +new Date()
}, 100);

const cal = function (data) {
  return Array(30000000).fill(2).reduce((a, b) => a + b) + data.a;
};

// cal({ a: 666 });
// clearInterval(timer);
// console.log(thread, startTime);

thread(cal, {
  a: 666,
}).then(data => {
  console.log(data, `${+new Date() - startTime}ms`);
  clearInterval(timer);
}).catch(err => console.error(err));
