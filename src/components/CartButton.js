import React, { Component } from 'react'

export class CartButton extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {count, openCart} = this.props;
    return (
      <div
        className="cart_button white_button"
        onClick={count > 0 ? openCart : ()=>{}}
      >
        CART: {count === 0 ? 'empty' : `${count.toString()} items`}
      </div>
    )
  }
}

export default CartButton
