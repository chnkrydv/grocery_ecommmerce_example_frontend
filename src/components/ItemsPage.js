import React, { Component } from 'react'
import ProductTile from './ProductTile';

export class ItemsPage extends Component {
  render() {
    const { productItems, onItemSelectChange } = this.props;

    return (
      <div className="category_items">
        {productItems.length && productItems.map(item =>
          <ProductTile
            key={item.productId}
            product={item}
            totalInCart={(item && item.totalInCart) || 0}
            onSelectChange={onItemSelectChange}
          />
        )}
      </div>
    )
  }
}

export default ItemsPage
