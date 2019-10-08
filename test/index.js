import {
  thread
} from '../index';

console.log('---------------', +new Date());

thread(function () {
  return Array(30000000).fill(2).reduce((a, b) => a + b);
}).then(data => console.log(data))

console.log('---------------', +new Date());

thread(function () {
  return +new Date();
}).then(data => console.log(data))

console.log('---------------', +new Date());

thread(function () {
  return +new Date();
}).then(data => console.log(data))

console.log('---------------', +new Date());
