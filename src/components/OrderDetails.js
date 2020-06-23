import React, { Component } from 'react';
import { Header } from './Header';

export class OrderDetails extends Component {
  render() {
    const { closeModal, onOrderConfirm, onPrevious } = this.props;
    return (
      <div>
        <Header header="Confirm Address and Delivery Time">
          <div onClick={closeModal}>X</div>
        </Header>
        <div>items</div>
        <div className="action_bar">
          <button className="button" onClick={onPrevious}>Go back</button>
          <button className="button" onClick={onOrderConfirm}>Confirm address and delivery time</button>
        </div>
      </div>
    );
  }
}

export default OrderDetails
