

function apiCall(url, reqOptions, callback, errCallback){
  fetch(url, reqOptions)
    .then(res => {
      if(res.status === 200) return res.json();
      else throw res.json();
    })
    .then(json => {
      console.log('json: ', json);
      callback && callback(json);
    })
    .catch(err => {
      err.then(error => {
        console.log(error);
        errCallback && errCallback(error.message);
      });
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