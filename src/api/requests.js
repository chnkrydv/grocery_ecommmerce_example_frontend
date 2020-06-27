

function apiCall(url, reqOptions, callback, errCallback){
  fetch(url, reqOptions)
    .then(res => {
      // console.log(res.status);
      return res.json();
    })
    .then(json => {
      // console.log('success', json);
      callback && callback(json);
    })
    .catch(err => {
      console.log(err);
      errCallback && errCallback(err);
    });
}

function getReq(url, token='', headers={}, callback, errCallback) {
  const optionalTokenHeader = token ? {'x-access-token': token} : {};
  const reqOptions = {
    method: 'GET',
    headers: {
      ...optionalTokenHeader,
      ...headers
    }
  };
  // console.log(url);
  // console.log(reqOptions);

  apiCall(url, reqOptions, callback, errCallback);
}

function postReq(url, token='', headers={}, body={}, callback, errCallback) {
  const optionalTokenHeader = token ? {'x-access-token': token} : {};
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...optionalTokenHeader,
    ...headers
  };
  const reqOptions = {
    method: 'POST',
    headers: finalHeaders,
    body: JSON.stringify(body),
  };
  // console.log(reqOptions);
  // console.log(finalHeaders);

  apiCall(url, reqOptions, callback, errCallback);
}

export {
  getReq,
  postReq,
};