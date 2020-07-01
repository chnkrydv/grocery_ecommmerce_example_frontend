import React, { Component } from 'react'

export class Orders extends Component {
  render() {
    const { orders } = this.props;
    return (
      <div className="orders">
        {orders.map(order => (
          <div className="order_tile">
            {order.itemsList.length}
          </div>
        ))}
      </div>
    )
  }
}

export default Orders
