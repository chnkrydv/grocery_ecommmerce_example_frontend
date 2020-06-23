import React, { Component } from 'react'

export class Modal extends Component {
  render() {
    const { cartOpen, children, onTapOutside } = this.props;
    return (
      <div className={`modal ${cartOpen ? '' : 'hidden'}`} onClick={onTapOutside}>
        <div className="modal_container">{children}</div>
      </div>
    )
  }
}

export default Modal
