

function apiCall(url, reqOptions, callback, errCallback){
  fetch(url, reqOptions)
    .then(res => {
      console.log(res.status);
      return res.json({someData: 3});
    })
    .then(json => {
      console.log('json: ', json);
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

  apiCall(url, reqOptions, callback, errCallback);
}

export {
  getReq,
  postReq,
};