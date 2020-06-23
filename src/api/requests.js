import {allProductsUrl} from './config';

function getGroceriesList(callback, err){
  fetch(allProductsUrl).then(list => callback([1,2,3,4,5,6])).catch(err)
}

export { getGroceriesList };