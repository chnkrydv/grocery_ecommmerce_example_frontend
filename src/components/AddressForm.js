import React, { Component } from 'react';
import { CustomButton } from './CustomButton';

export class AddressForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      line1: '',
      line2: '',
      line3: ''
    }
  }

  updateAddress = (line, value) => {
    const newAddr = { ...this.state };
    newAddr[line] = value;

    this.setState({ ...newAddr });
  }

  saveAddress = () => {
    const { line1, line2, line3 } = this.state;
    this.props.onSaveAddress({line1, line2, line3});
  }

  render() {
    const { line1, line2, line3 } = this.state;
    return (
      <div className="address_page">
        <div className="address_form">
          <h2>Add new address</h2>
          <input
            className="textbox address_box"
            type="text"
            value={line1}
            onChange={({ target }) => this.updateAddress('line1', target.value)}
            placeholder="Address Line 1"
          />
          <input
            className="textbox address_box"
            type="text"
            value={line2}
            onChange={({ target }) => this.updateAddress('line2', target.value)}
            placeholder="Address Line 2"
          />
          <input
            className="textbox address_box"
            type="text"
            value={line3}
            onChange={({ target }) => this.updateAddress('line3', target.value)}
            placeholder="Address Line 3"
          />
        </div>
        <CustomButton
          text={`Save Address`}
          onClick={this.saveAddress}
        />
      </div>
    )
  }
}

export default AddressForm
