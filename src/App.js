import React, { Component } from 'react';
import './App.css';
import { ProductCategories } from './components/ProductCategories';
import { getProductsList } from './api/endpoints';
import { Header } from './components/Header';
import CartButton from './components/CartButton';
import Cart from './components/Cart';
import IfElse from './components/IfElse';
import Profile from './components/Profile';
import AuthPage from './components/AuthPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cartOpen: false,
      authPageOpen: false,
      profile: {},
      productCategories: {},
      productsInCart: []
    }
  }

  componentDidMount() {
    getProductsList((productCategories) => {
      console.log('this is catalog', productCategories);
      this.setState({
        productCategories: productCategories,
        loading: false,
      })
    });
  }

  toggleCartVisibility = () => {
    const updatedOpenState = !this.state.cartOpen;
    this.setState({ cartOpen: updatedOpenState });
  }

  toggleAuthPageVisibility = () => {
    const updatedOpenState = !this.state.authPageOpen;
    this.setState({ authPageOpen: updatedOpenState });
  }

  onLogin = (profile) => this.setState({
    profile: profile,
    authPageOpen: false,
  });

  onLogout = () => this.setState({
    profile: {},
    authPageOpen: false,
  });

  render() {
    const { loading, productCategories, productsInCart, cartOpen, authPageOpen, profile } = this.state;
    return (
      <div className="App">
        <Header header="Groceries Mart">
          <div className="header_children grid_right">
            <CartButton count={productsInCart.length} openCart={this.toggleCartVisibility} />
            <Profile
              className="grid_right"
              openAuthPage={this.toggleAuthPageVisibility}
              name={profile.name}
              onLogout={this.onLogout}
            />
          </div>
        </Header>
        <div className="app_container">
          <IfElse
            condition={loading}
            ifComponent={<div>loading...</div>}
            elseComponent={<ProductCategories categories={productCategories} />}
          />
        </div>
        <Cart
          cartOpen={cartOpen}
          onTapOutside={this.toggleCartVisibility}
        />
        <AuthPage
          authPageOpen={authPageOpen}
          onTapOutside={this.toggleAuthPageVisibility}
          onLogin={this.onLogin}
          onSignup={() => { }}
        />
      </div>
    );
  }
}

export default App;
