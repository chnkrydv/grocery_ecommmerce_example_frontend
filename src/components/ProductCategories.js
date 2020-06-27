import React from 'react'
import CategoryCard from './CategoryCard';
import { api } from '../api/config';

export const ProductCategories = ({ categories }) => (
  <div>
    <h2>Categories</h2>
    <div className="product_categories">
      {Object.keys(categories).map((item, i) => (
        <CategoryCard
          className={`${i % 2 === 1 ? 'grid_left' : 'grid_right'}`}
          name={categories[item]['name']}
          totalProducts={categories[item]['products']}
          imageSource={`${api}${categories[item]['imageSource']}`}
        />
      ))}
    </div>
  </div>
);