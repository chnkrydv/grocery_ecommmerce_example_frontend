import React from 'react'
import CategoryCard from './CategoryCard';
import { api } from '../api/config';

export const ProductCategories = ({ productsCatalog }) => (
  <div className="product_categories">
    {Object.keys(productsCatalog).map((item, i) => (
      <CategoryCard
        className={`${i%2 === 1 ? 'grid_left' : 'grid_right'}`}
        name={item}
        imgSrc={`${api}${productsCatalog[item]['imageSrc']}`}
      />
    ))}
  </div>
);