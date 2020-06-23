import React from 'react'

import React, { Component } from 'react'

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
            <div>
              <div onClick={onDecrement}>-</div>
              <div>{count}</div>
              <div onClick={onIncrement}>+</div>
            </div>
            : <button>Add to cart</button>
        }
      </div>
    )
  }
}

export default AddButton;