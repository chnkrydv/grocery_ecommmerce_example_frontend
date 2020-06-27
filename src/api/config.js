const api = 'http://localhost:9999';
const signupUrl = `${api}/account/signup`;
const loginUrl = `${api}/account/login`;
const profileUrl = `${api}/account/profile`;
const ordersUrl = `${api}/account/orders`;
const productCategoriesUrl = `${api}/products`;
const specificProductsUrl = `${api}/products/requested`;

const categoryItemsUrl = categoryName => `${productCategoriesUrl}/${categoryName}`;

export {
    api,
    signupUrl,
    loginUrl,
    profileUrl,
    ordersUrl,
    productCategoriesUrl,
    specificProductsUrl,
    categoryItemsUrl,
};