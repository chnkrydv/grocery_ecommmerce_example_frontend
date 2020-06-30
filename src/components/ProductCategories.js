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
          {Object.keys(categories).map((product, i) => (
            <CategoryCard
              key={i}
              className={`${i % 2 === 1 ? 'grid_left' : 'grid_right'}`}
              name={categories[product]['type']}
              totalProducts={categories[product]['items']}
              imageSource={`${api}${categories[product]['imageSource']}`}
              onClick={() => this.loadCategory(categories[product]['type'])}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ProductCategories
