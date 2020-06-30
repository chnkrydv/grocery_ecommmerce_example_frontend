import React, { Component, Fragment } from 'react';
import { CustomButton } from './CustomButton';
import AddressForm from './AddressForm';
import IfElse from './IfElse';

export class OrderVenue extends Component {
  render() {
    const {
      onOrderConfirm,
      onPrevious,
      profile,
      onActivateLogin,
      onAddressUpdate,
    } = this.props;

    return (
      <Fragment>
        <div className="order_venue">
          <IfElse
            condition={!profile.name}
            ifComponent={<CustomButton text="Login" onClick={onActivateLogin} />}
            elseComponent={
              <IfElse
                condition={!profile.address || !Object.keys(profile.address).length}
                ifComponent={
                  <AddressForm
                    onSaveAddress={onAddressUpdate}
                  />
                }
                elseComponent={
                  <div>
                    <div>
                      Delivery By: {console.log(profile) && profile.name}
                    </div>
                    <div>
                      <div>{profile && profile.address && profile.address.line1}</div>
                      <div>{profile && profile.address && profile.address.line2}</div>
                      <div>{profile && profile.address && profile.address.line3}</div>
                    </div>
                  </div>
                }
              />
            }
          />
        </div>
        <div className="buttons_bar">
          <button className="button" onClick={onPrevious}>Go back</button>
          <button className="button" onClick={onOrderConfirm}>Confirm & Place Order</button>
        </div>
      </Fragment>
    );
  }
}

export default OrderVenue
