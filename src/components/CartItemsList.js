import React, { Component, Fragment } from 'react';
import ItemsPage from './ItemsPage';
import IfElse from './IfElse';

export class CartItemsList extends Component {
  render() {
    const { onClear, onNext, items, onItemsCountChange, loading } = this.props;
    return (
      <Fragment>
        <div className="cart_items_list">
          <IfElse
            condition={loading}
            ifComponent={<div>Loading...</div>}
            elseComponent={
              <ItemsPage
                productItems={items}
                onItemSelectChange={onItemsCountChange}
              />
            }
          />
        </div>
        <div className="buttons_bar">
          <button className="button" onClick={onClear}>Close</button>
          <button className="button" onClick={onNext}>Proceed To Order Details</button>
        </div>
      </Fragment>
    );
  }
}

export default CartItemsList
