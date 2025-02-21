import React, { Component, Fragment } from 'react'
import { abbreviator } from '../utils/stringUtils';
import IfElse from './IfElse';
import { signout } from '../api/endpoints';

export class ProfileButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  showMenu = (show, delay) => {
    const openState = this.state.menuOpen;
    if(openState === show) return;
    
    setTimeout(() => this.setState({menuOpen: show}), delay || 0)
  }
  
  logout = () => {
    signout();
    this.props.onLogout();
  }

  render() {
    const { name, className, openAuthPage } = this.props;
    const { menuOpen } = this.state;

    return (
      <Fragment>
        <div className={`profile ${className || ''}`}>
          <div
            className="profile_icon white_button"
            onClick={name ? this.toggleMenu : openAuthPage}
          >
            {name ? abbreviator(name).substring(0, 3) : 'Login'}
          </div>
        </div>
        <IfElse
          condition={menuOpen}
          ifComponent={
            <div
              className="profile_menu grid_right"
              onMouseEnter={() => this.showMenu(true)}
              onMouseLeave={() => this.showMenu(false)}
            >
              <h4 style={{height: '20px', marginTop: '0px'}}>{name || 'Logged Out'}</h4>
              <div className="profile_menu_option">My ProfileButton</div>
              <div className="profile_menu_option">My Orders</div>
              <div className="profile_menu_option">My Wishlist</div>
              <div className="profile_menu_option" onClick={this.logout}>Logout</div>
            </div>
          }
        />
      </Fragment>
    )
  }
}

export default ProfileButton
