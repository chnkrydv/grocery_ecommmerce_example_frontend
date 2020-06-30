import React, { Component } from 'react'
import Modal from './Modal';
import CartItemsList from './CartItemsList';
import OrderVenue from './OrderVenue';
import { Header } from './Header';
import { CustomButton } from './CustomButton';

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

  getTotalAmount = (items) => {
    return items.reduce((total, item) => total + (item.totalInCart * item.price), 0);
  }

  closeModal = () => {
    this.setState({page: 0});
    this.props.onTapOutside();
  }

  placeOrder = () => {
    this.props.placeOrder();
    this.closeModal()
  }

  render() {
    const {
      cartOpen,
      onTapOutside,
      items,
      loading,
      onItemsCountChange,
      onClear,
      profile,
      onActivateLogin,
      onAddressUpdate,
    } = this.props;

    return (
      <Modal open={cartOpen} onTapOutside={this.closeModal}>
        <Header header="Review Cart Items" large={false}>
          <div className="close_icon white_button" onClick={this.closeModal}>+</div>
        </Header>
        <div className="cart">
          <div className="cart_info">
            <div className="cart_total grid_left">Total: ₹{this.getTotalAmount(items)}</div>
            <CustomButton
              text="Clear Cart"
              onClick={onClear}
            />
          </div>
          {
            this.state.page === 0
              ? <CartItemsList
                closeModal={this.closeModal}
                onClear={this.closeModal}
                onNext={() => this.scroll(true)}
                items={items}
                loading={loading}
                onItemsCountChange={onItemsCountChange}
              />
              : <OrderVenue
                closeModal={this.closeModal}
                onOrderConfirm={this.placeOrder}
                onPrevious={() => this.scroll(false)}
                profile={profile}
                onActivateLogin={onActivateLogin}
                onAddressUpdate={onAddressUpdate}
              />
          }
        </div>
      </Modal>
    )
  }
}

export default Cart
