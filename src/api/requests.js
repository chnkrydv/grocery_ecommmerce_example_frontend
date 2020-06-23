import {allProductsUrl} from './config';

function getProductsList(callback, err){
  console.log(allProductsUrl);
  fetch(allProductsUrl)
  .then(res => res.json())
  .then(catalog => {
    console.log(catalog);
    callback(catalog);
  })
  .catch(err)
}

export { getProductsList };