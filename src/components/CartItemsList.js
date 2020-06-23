import React, { Component } from 'react';
import { Header } from './Header';

export class CartItemsList extends Component {
  render() {
    const { closeModal, onClear, onNext } = this.props;
    return (
      <div>
        <Header header="Review Cart Items">
          <div onClick={closeModal}>X</div>
        </Header>
        <div>items</div>
        <div className="action_bar">
          <button className="button" onClick={onClear}>Clear Cart</button>
          <button className="button" onClick={onNext}>Proceed To Order Details</button>
        </div>
      </div>
    );
  }
}

export default CartItemsList
