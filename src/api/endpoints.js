import { getToken, setToken, eraseToken } from './token';
import { getReq, postReq } from './requests';
import { allProductsUrl, loginUrl, signupUrl, ordersUrl } from './config';

function signup(name, username, password, callback, errCallback) {
  postReq(signupUrl, '', {}, { name, username, password }, callback, errCallback);
}

function signin(username, password, callback, errCallback) {
  const success = (res) => {
    setToken(res.token);
    callback && callback(res.user);
  }
  postReq(loginUrl, '', {}, { username, password }, success, errCallback);
}

function signout() {
  eraseToken();
}

function getOrders(callback, errCallback) {
  const token = getToken();
  getReq(ordersUrl, token, {}, callback, errCallback);
}

function getProductsList(callback, errCallback) {
  getReq(allProductsUrl, '', {}, callback, errCallback);
}

export {
  signup,
  signin,
  signout,
  getProductsList,
  getOrders,
};