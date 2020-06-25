import React, { Component } from 'react'

export class TabSwitch extends Component {
  render() {
    const { left, right, leftSelected, onClickLeftTab, onClickRightTab } = this.props;

    return (
      <div className={`tab_switch`}>
        <div
          className={`tab ${leftSelected ? 'tab_selected' : ''}`}
          onClick={onClickLeftTab}
        >
          {left}
        </div>
        <div
          className={`tab ${leftSelected ? '' : 'tab_selected'}`}
          onClick={onClickRightTab}
        >
          {right}
        </div>
      </div>
    )
  }
}

export default TabSwitch
