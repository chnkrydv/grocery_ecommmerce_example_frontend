import React, { Component, Fragment } from 'react';

export class CartItemsList extends Component {
  render() {
    const { onClear, onNext } = this.props;
    return (
      <Fragment>
        <div>items</div>
        <div className="buttons_bar">
          <button className="button" onClick={onClear}>Close</button>
          <button className="button" onClick={onNext}>Proceed To Order Details</button>
        </div>
      </Fragment>
    );
  }
}

export default CartItemsList
