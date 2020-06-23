import React, { Component } from 'react'
import Modal from './Modal';
import CartItemsList from './CartItemsList';
import OrderDetails from './OrderDetails';

export class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      page: 0,
    }
  }
  
  scroll = (next) => {
    const updatedPage = next ? 1 : 0;
    this.setState({page: updatedPage});
  }

  render() {
    const { cartOpen, onTapOutside, onClear, onAdd } = this.props;
    return (
      <Modal cartOpen={cartOpen} onTapOutside={onTapOutside}>
        {
          this.state.page === 0
          ? <CartItemsList closeModal={onTapOutside} onClear={onTapOutside} onNext={() => this.scroll(true)}/>
          : <OrderDetails closeModal={onTapOutside} onOrderConfirm={onTapOutside} onPrevious={() => this.scroll(false)}/>
        }
      </Modal>
    )
  }
}

export default Cart
