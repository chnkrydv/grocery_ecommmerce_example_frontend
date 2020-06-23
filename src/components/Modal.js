import React, { Component } from 'react'

export class Modal extends Component {
  preventClose = (e) => e.stopPropagation();

  render() {
    const { open, children, onTapOutside } = this.props;
    return (
      <div className={`modal ${open ? '' : 'hidden'}`} onClick={onTapOutside}>
        <div className="modal_container" onClick={this.preventClose}>{children}</div>
      </div>
    )
  }
}

export default Modal
