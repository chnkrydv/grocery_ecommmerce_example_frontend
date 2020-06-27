import React, { Component } from 'react'
import CategoryCard from './CategoryCard';
import { api } from '../api/config';

export class ProductCategories extends Component {
  loadCategory = (categoryName) => {
    const { appContentLoading, onCategorySelect } = this.props;

    appContentLoading();
    onCategorySelect(categoryName);
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <h2>Categories</h2>
        <div className="product_categories">
          {Object.keys(categories).map((item, i) => (
            <CategoryCard
              key={i}
              className={`${i % 2 === 1 ? 'grid_left' : 'grid_right'}`}
              name={categories[item]['name']}
              totalProducts={categories[item]['products']}
              imageSource={`${api}${categories[item]['imageSource']}`}
              onClick={() => this.loadCategory(categories[item]['name'])}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ProductCategories
