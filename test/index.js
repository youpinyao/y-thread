import {
  thread
} from '../index';

thread(function () {
  return 1
}).then(data => console.log(data))

thread(function () {
  return 2
}).then(data => console.log(data))

thread(function () {
  return 3
}).then(data => console.log(data))
