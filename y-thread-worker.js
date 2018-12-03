onmessage = function (e) {
  var uid = e.data.uid;
  var fn = e.data.fn;
  var data = e.data.data;

  try {
    postMessage({
      success: true,
      uid: uid,
      data: eval(fn)(data),
    });
  } catch (error) {
    postMessage({
      success: false,
      uid: uid,
      error: error.message,
    });
  }
}
