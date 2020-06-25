import React, { Component } from 'react'
import Modal from './Modal';
import { Header } from './Header';
import TabSwitch from './TabSwitch';
import IfElse from './IfElse';
import { CustomButton } from './CustomButton';

export class AuthPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginPageSelected: true,
      name: '',
      username: '',
      password: '',
    }
  }

  switchPage = (loginPageSelected) => {
    this.setState({ loginPageSelected: !!loginPageSelected });
  }

  updateName = ({ target }) => this.setState({ name: target.value });

  updateUsername = ({ target }) => this.setState({ username: target.value });

  updatePasword = ({ target }) => this.setState({ password: target.value });

  render() {
    const { authPageOpen, onTapOutside, onClear, onAdd } = this.props;
    const { loginPageSelected, name, username, password } = this.state;

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
          <div className="auth_form">
            <IfElse
              condition={!loginPageSelected}
              ifComponent={
                <input
                  className="textbox"
                  type="text"
                  value={name}
                  onChange={this.updateName}
                  placeholder="Full name"
                />
              }
            />
            <input
              className="textbox"
              type="text"
              value={username}
              onChange={this.updateUsername}
              placeholder={`${loginPageSelected ? 'Username' : 'Unique username'}`}
            />
            <input
              className="textbox"
              type="password"
              value={password}
              onChange={this.updatePasword}
              placeholder="password"
            />
          </div>
          <div className="button_bar">
            <CustomButton
              text={`Cancel`}
            />
            <CustomButton
              text={`${loginPageSelected ? 'Login' : 'Signup'}`}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

export default AuthPage
