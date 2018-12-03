let yWorker = null
const supportWorker = !!window.Worker
const caches = {}

const uuid = () => {
  const s = [];
  const hexDigits = '0123456789abcdef';

  Array(36).fill(1).map((v, i) => {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  });

  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');
}

if (supportWorker) {
  yWorker = new window.Worker('y-thread-worker.js')

  yWorker.onmessage = (e) => {
    const {
      uid,
      success,
      data,
    } = e.data;
    const cache = caches[uid];

    if (cache) {
      if (success) {
        cache.resolve(data)
      } else {
        cache.reject(e.data.error)
      }
    }
    delete caches[uid]
  }
}

var yThread = {
  thread: fn => new Promise((resolve, reject) => {
    // 如果不支持
    if (!supportWorker) {
      resolve(fn());
      return;
    }

    const uid = uuid();
    caches[uid] = {
      resolve,
      reject,
      fn
    }
    yWorker.postMessage({
      uid,
      fn: '(' + fn.toString() + ')()',
    })
  }),
  worker: yWorker,
}

export const thread = yThread.thread;
export const worker = yThread.worker;

export default yThread;
