onmessage = function (e) {
  var uid = e.data.uid;
  var fn = e.data.fn;

  try {
    postMessage({
      success: true,
      uid: uid,
      data: eval(fn),
    });
  } catch (error) {
    postMessage({
      success: false,
      uid: uid,
      error: error.message,
    });
  }
}
