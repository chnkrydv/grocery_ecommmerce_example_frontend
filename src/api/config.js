const api = 'http://localhost:9999';
const signupUrl = `${api}/account/signup`;
const loginUrl = `${api}/account/login`;
const profileUrl = `${api}/account/profile`;
const profileAddressUrl = `${api}/account/profile/address`;
const ordersUrl = `${api}/account/orders`;
const createOrderUrl = `${api}/account/order`;
const productsCatalogUrl = `${api}/products/catalog`;
const specificProductsUrl = `${api}/products/ids`;

const categoryItemsUrl = categoryName => `${productsCatalogUrl}/${categoryName}`;

export {
    api,
    signupUrl,
    loginUrl,
    profileUrl,
    profileAddressUrl,
    ordersUrl,
    createOrderUrl,
    productsCatalogUrl,
    specificProductsUrl,
    categoryItemsUrl,
};