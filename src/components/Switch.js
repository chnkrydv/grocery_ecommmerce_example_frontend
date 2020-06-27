import React, { Component, Fragment } from 'react'

export class Switch extends Component {
  render() {
    const { componentIndex, children } = this.props;
    return (
      <Fragment>
        {React.Children.toArray(children)[componentIndex]}
      </Fragment>
    )
  }
}

export default Switch
