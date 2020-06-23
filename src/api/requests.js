import {allProductsUrl} from './config';

function getProductsList(callback, err){
  fetch(allProductsUrl).then(list => callback([1,2,3,4,5,6])).catch(err)
}

export { getProductsList };