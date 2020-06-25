import React, { Component, Fragment } from 'react';

export class OrderDetails extends Component {
  render() {
    const { onOrderConfirm, onPrevious } = this.props;
    return (
      <Fragment>
        <div>Address & delivery time</div>
        <div className="buttons_bar">
          <button className="button" onClick={onPrevious}>Go back</button>
          <button className="button" onClick={onOrderConfirm}>Confirm address and delivery</button>
        </div>
      </Fragment>
    );
  }
}

export default OrderDetails
