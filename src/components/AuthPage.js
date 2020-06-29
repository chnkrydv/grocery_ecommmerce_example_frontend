import React, { Component } from 'react'
import Modal from './Modal';
import { Header } from './Header';
import TabSwitch from './TabSwitch';
import IfElse from './IfElse';
import { CustomButton } from './CustomButton';
import { signup, signin } from '../api/endpoints';
import { validUsername } from '../utils/validations';

export class AuthPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginPageSelected: true,
      name: '',
      username: '',
      password: '',
      error: '',
      success: '',
    }
  }

  switchPage = (loginPageSelected) => {
    this.setState({ loginPageSelected: !!loginPageSelected });
  }

  updateName = ({ target }) => this.setState({ name: target.value });

  updateUsername = ({ target }) => this.setState({ username: target.value.trim() });

  updatePasword = ({ target }) => this.setState({ password: target.value.trim() });

  login = () => {
    const { username, password } = this.state;
    if(!validUsername(username)) {
      this.setState({error: 'choose a valid username'});
      return;
    }
    
    signin(username, password, (user) => {
      this.props.onLogin(user);
      this.setState({
        name: '',
        username: '',
        password: '',
        error: '',
        success: '',
      })
    }, err => {
      this.setState({
        error: err,
      })
    })
  }

  render() {
    const { authPageOpen, onTapOutside } = this.props;
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
          </div>
          <CustomButton
            text={`${loginPageSelected ? 'Login' : 'Signup'}`}
            onClick={loginPageSelected ? this.login : this.signup}
          />
        </div>
      </Modal>
    )
  }
}

export default AuthPage
