import React, { Component } from 'react'
import Modal from './Modal';
import { Header } from './Header';
import TabSwitch from './TabSwitch';

export class AuthPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginPageSelected: true,
    }
  }

  switchPage = (loginPageSelected) => {
    this.setState({ loginPageSelected: !!loginPageSelected });
  }

  render() {
    const { authPageOpen, onTapOutside, onClear, onAdd } = this.props;
    const { loginPageSelected } = this.state;

    return (
      <Modal open={authPageOpen} onTapOutside={onTapOutside}>
        <Header header="Authentication" large={false}>
          <div className="close_icon white_button" onClick={onTapOutside}>+</div>
        </Header>
        <div className="auth_page">
          <TabSwitch
            leftSelected={loginPageSelected}
            left="login"
            right="signup"
            onClickLeftTab={() => this.switchPage(true)}
            onClickRightTab={() => this.switchPage(false)}
          />
        </div>
      </Modal>
    )
  }
}

export default AuthPage
