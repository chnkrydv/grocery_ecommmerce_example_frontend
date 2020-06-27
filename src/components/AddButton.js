import React, { Component, Fragment } from 'react'

export class AddButton extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const {count, onDecrement, onIncrement} = this.props;
    return (
      <div className="add_button">
        {
          count ?
            <Fragment>
              <div className="add_button_decrement" onClick={onDecrement}>-</div>
              <div className="add_button_count">{count}</div>
              <div className="add_button_increment" onClick={onIncrement}>+</div>
            </Fragment>
            : <div className="add_button_add" onClick={onIncrement}>Add to cart</div>
        }
      </div>
    )
  }
}

export default AddButton;