import React, { Component } from 'react'
import ProductTile from './ProductTile';

export class CategoryItems extends Component {
  render() {
    const { categoryItems, onItemSelectChange } = this.props;
    
    return (
      <div className="category_items">
        {categoryItems.length && categoryItems.map(item => 
          <ProductTile
            product={item}
            totalInCart={(item && item.totalInCart) || 0}
            onSelectChange={onItemSelectChange}
          />
        )}
      </div>
    )
  }
}

export default CategoryItems
