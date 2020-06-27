import React, { Component } from 'react'
import AddButton from './AddButton';
import { capitalizeInitials } from '../utils/stringUtils';
import { api } from '../api/config';

export class ProductTile extends Component {
  getStyle = (imageSource) => {
    const style = {
      backgroundImage: `url(${api}${imageSource})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
    return style;
  }

  addOneToCart = () => {
    const { product, totalInCart, onSelectChange } = this.props;
    onSelectChange(product.productId, totalInCart + 1);
  }

  subtractOneFromCart = () => {
    const { product, totalInCart, onSelectChange } = this.props;
    const newTotal = totalInCart > 0 ? totalInCart - 1 : 0;
    onSelectChange(product.productId, newTotal);
  }

  render() {
    const { product, totalInCart } = this.props;
    const { name, brand, unit, price } = product;
    const header = (brand === 'generic' ? '' : brand + ' ') + name; 

    return (
      <div className="product_tile">
        <div className="product_image" style={this.getStyle(product.imageSource)} />
        <div className="product_details">
          <div className="product_title">{capitalizeInitials(header)}</div>
          <div className="product_unit">{unit}</div>
          <div className="product_price">₹ {price}</div>
        </div>
        <AddButton
          count={totalInCart}
          onIncrement={this.addOneToCart}
          onDecrement={this.subtractOneFromCart}
        />
      </div>
    )
  }
}

export default ProductTile
