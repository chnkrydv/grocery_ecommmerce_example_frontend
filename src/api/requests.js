

function getReq(url, token='', headers={}, callback, errCallback) {
  const optionalTokenHeader = token ? {'x-access-token': token} : {};
  fetch(url, {
    method: 'GET',
    headers: {
      ...optionalTokenHeader,
      ...headers
    },
  })
    .then(res => res.json())
    .then(json => callback && callback(json))
    .catch(err => errCallback && errCallback(err));
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
  console.log(reqOptions);
  console.log(finalHeaders);

  fetch(url, reqOptions)
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(json => {
      console.log('success', json);
      callback && callback(json);
    })
    .catch(err => {
      console.log(err);
      errCallback && errCallback(err);
    });
}

export {
  getReq,
  postReq,
};