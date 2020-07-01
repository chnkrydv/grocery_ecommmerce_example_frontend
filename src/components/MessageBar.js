import React, { Component } from 'react'
import CloseButton from './CloseButton';

export class MessageBar extends Component {
  render() {
    const { visible, message, isWarning = true, onClose } = this.props;
    return (
      <div className="message_bar_container">
        <div
          className={`
          message_bar
          ${isWarning ? 'warning_bg' : 'success_bg'}
          ${visible ? '' : 'hidden'}
        `}
        >
          <div className="message_content">{message}</div>
          <CloseButton onClick={onClose} />
        </div>
      </div>
    )
  }
}

export default MessageBar
