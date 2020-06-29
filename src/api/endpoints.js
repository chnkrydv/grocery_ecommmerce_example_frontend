import { getToken, setToken, eraseToken } from './token';
import { getReq, postReq } from './requests';
import {
  productCategoriesUrl,
  loginUrl,
  signupUrl,
  profileUrl,
  ordersUrl,
  specificProductsUrl,
  categoryItemsUrl,
  profileAddressUrl
} from './config';

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

function getProfile(callback, errCallback){
  const token = getToken();
  // console.log(token);
  if(!token) {
    callback({});
    return;
  }
  
  getReq(profileUrl, token, {}, callback, errCallback);
}

function getOrders(callback, errCallback) {
  const token = getToken();
  getReq(ordersUrl, token, {}, callback, errCallback);
}

function getProductCategories(callback, errCallback) {
  getReq(productCategoriesUrl, '', {}, callback, errCallback);
}

function getCategoryItems(categoryName, callback, errCallback){
  getReq(categoryItemsUrl(categoryName), '', {}, callback, errCallback);
}

function getSpecificItems(productIds, callback, errCallback){
  postReq(specificProductsUrl, '', {}, {
    productIdList: productIds
  }, callback, errCallback);
}

function updateAddress(address, callback, errCallback){
  const token = getToken();
  postReq(profileAddressUrl, token, {}, {address}, callback, errCallback);
}

export {
  signup,
  signin,
  signout,
  getProfile,
  getOrders,
  getProductCategories,
  getCategoryItems,
  getSpecificItems,
  updateAddress,
};