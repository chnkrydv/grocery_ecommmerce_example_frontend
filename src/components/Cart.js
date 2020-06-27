import React, { Component } from 'react'
import Modal from './Modal';
import CartItemsList from './CartItemsList';
import OrderDetails from './OrderDetails';
import { Header } from './Header';

export class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
    }
  }

  scroll = (next) => {
    const updatedPage = next ? 1 : 0;
    this.setState({ page: updatedPage });
  }

  render() {
    const { cartOpen, onTapOutside, items, onClear, onAdd } = this.props;
    return (
      <Modal open={cartOpen} onTapOutside={onTapOutside}>
        <Header header="Review Cart Items" large={false}>
          <div className="close_icon white_button" onClick={onTapOutside}>+</div>
        </Header>
        <div className="cart">
          {
            this.state.page === 0
              ? <CartItemsList closeModal={onTapOutside} onClear={onTapOutside} onNext={() => this.scroll(true)} />
              : <OrderDetails closeModal={onTapOutside} onOrderConfirm={onTapOutside} onPrevious={() => this.scroll(false)} />
          }
        </div>
      </Modal>
    )
  }
}

export default Cart
