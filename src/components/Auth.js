import React, { Component } from 'react'
import Modal from './Modal'

export class Auth extends Component {
  render() {
    const { authPageOpen, onLogin, onSignUp }
    return (
      <Modal
         open={authPageOpen}
      >
        <div className="auth">login here</div>
      </Modal>
    )
  }
}

export default Auth;
