import React, { Component, Fragment } from 'react';
import './App.css';
import {
  getProductsCatalog,
  getProfile,
  getCategoryItems,
  getSpecificItems,
  updateAddress,
  placeOrder
} from './api/endpoints';
import ProductCategories from './components/ProductCategories';
import Header from './components/Header';
import CartButton from './components/CartButton';
import Cart from './components/Cart';
import IfElse from './components/IfElse';
import ProfileButton from './components/ProfileButton';
import AuthPage from './components/AuthPage';
import ItemsPage from './components/ItemsPage';
import Switch from './components/Switch';
import MessageBar from './components/MessageBar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cartOpen: false,
      cartItemsLoading: false,
      authPageOpen: false,
      profile: {},
      productCategories: {},
      categoryPageItems: [],
      cartItems: [],
      cartItemsIdAndCountMap: {},
      routeIndex: 0,
      alert: {
        visible: false,
        message: '',
        isWarning: true
      }
    }
  }

  componentDidMount() {
    this.loadProfile();
    this.loadProductCategories();
  }

  onAlert = (message, isWarning=true) => {
    this.setState({alert: {message, isWarning, visible: true}});
    setTimeout(this.closeAlert, 4000)
  }
  
  closeAlert = () => this.setState({alert: {visible: false}})

  contentLoading = (loading) => this.setState({ loading });

  reloadApp = () => {
    this.setState({
      routeIndex: 0,
      categoryPageItems: [],
    });
  }

  loadProfile = () => {
    getProfile((profile) => {
      this.setState({ profile });
    }, this.onAlert);
  }

  onLogin = (profile) => this.setState({
    profile: profile,
    authPageOpen: false,
  });

  onLogout = () => this.setState({
    profile: {},
    authPageOpen: false,
  });

  onAddressUpdate = (address) => {
    updateAddress(address, () => {
      this.loadProfile();
    }, this.onAlert);
  }

  toggleCartVisibility = () => {
    const { cartOpen, cartItemsIdAndCountMap } = this.state;
    const updatedOpenState = !cartOpen;
    this.setState({ cartOpen: updatedOpenState, cartItemsLoading: true });

    this.loadCartItems(Object.keys(cartItemsIdAndCountMap).filter(key => cartItemsIdAndCountMap[key] > 0));
  }

  toggleAuthPageVisibility = () => {
    const updatedOpenState = !this.state.authPageOpen;
    this.setState({ authPageOpen: updatedOpenState });
  }

  loadProductCategories = () => {
    getProductsCatalog((productCategories) => {
      this.setState({
        productCategories: productCategories,
        loading: false,
      })
    }, this.onAlert);
  }

  getItemsWithCount = (categoryItems) => {
    const {cartItemsIdAndCountMap} = this.state;

    return categoryItems.map(item => {
      let itemWithCount = {...item};
      itemWithCount.totalInCart = 0;
      Object.keys(cartItemsIdAndCountMap).forEach(key => {
        if(key === item.productId){
          itemWithCount.totalInCart = cartItemsIdAndCountMap[key];
        }
      });
      return itemWithCount;
    });
  }

  loadCategoryPageItems = (categoryName) => {
    getCategoryItems(categoryName, (categoryWithItems) => {
      const itemsWithCount = this.getItemsWithCount(categoryWithItems.items);
      
      this.setState({
        categoryPageItems: itemsWithCount,
        routeIndex: 1,
      });
    }, this.onAlert);
  }

  loadCartItems = (ids) => {
    getSpecificItems(ids, (requestedItems) => {
      this.setState({
        cartItems: this.getItemsWithCount(requestedItems),
        cartItemsLoading: false,
      });
    }, this.onAlert);
  }

  cartItemsChange = (productId, count) => {
    const { cartItemsIdAndCountMap, categoryPageItems, cartItems } = this.state;
    const newCategoryPageItems = categoryPageItems.map(item => {
      if(item.productId === productId) item.totalInCart = count;
      return item;
    });
    const newCartItems = cartItems.map(item => {
      if(item.productId === productId) item.totalInCart = count;
      return item;
    });
    const newCartMap = {...cartItemsIdAndCountMap};
    newCartMap[productId] = count;

    this.setState({
      categoryPageItems: newCategoryPageItems,
      cartItems: [...newCartItems],
      cartItemsIdAndCountMap: newCartMap,
    });
  }

  getCartItemsCount = () => {
    const {cartItemsIdAndCountMap} = this.state;
    let count = 0;
    Object.keys(cartItemsIdAndCountMap).forEach(key => count += cartItemsIdAndCountMap[key]);

    return count
  }

  placeOrder = () => {
    const { cartItems } = this.state;
    const requestItems = cartItems.map(({productId, totalInCart}) => ({productId, requested: totalInCart}));
    console.log(requestItems);
    placeOrder(requestItems, (response) => {
      console.log(response);
      this.clearCart();
    }, this.onAlert);
  }

  clearCart = () => this.setState({
    routeIndex: 0,
    cartItems: [],
    categoryPageItems: [],
    cartItemsIdAndCountMap: {},
    cartOpen: false,
  });

  render() {
    const {
      loading,
      productCategories,
      categoryPageItems,
      cartItems,
      cartItemsLoading,
      cartOpen,
      authPageOpen,
      profile,
      routeIndex,
      alert,
    } = this.state;

    return (
      <div className="App">
        <Header header="Groceries Mart" onHeaderClick={this.reloadApp}>
          <div className="header_children grid_right">
            <CartButton
              count={this.getCartItemsCount()}
              openCart={this.toggleCartVisibility}
            />
            <ProfileButton
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
            elseComponent={
              <Switch componentIndex={routeIndex}>
                <ProductCategories
                  categories={productCategories}
                  appContentLoading={this.contentLoading}
                  onCategorySelect={this.loadCategoryPageItems}
                />
                <ItemsPage
                  productItems={categoryPageItems}
                  onItemSelectChange={this.cartItemsChange}
                />
              </Switch>
            }
          />
        </div>
        <Cart
          cartOpen={cartOpen}
          onTapOutside={this.toggleCartVisibility}
          items={cartItems}
          loading={cartItemsLoading}
          onItemsCountChange={this.cartItemsChange}
          onClear={this.clearCart}
          profile={profile}
          onActivateLogin={this.toggleAuthPageVisibility}
          onAddressUpdate={this.onAddressUpdate}
          placeOrder={this.placeOrder}
          onAlert={this.onAlert}
        />
        <AuthPage
          authPageOpen={authPageOpen}
          onTapOutside={this.toggleAuthPageVisibility}
          onLogin={this.onLogin}
          onSignup={() => { }}
          onAlert={this.onAlert}
        />
        <MessageBar
          visible={alert.visible}
          message={alert.message || 'some message'}
          isWarning={alert.isWarning}
          onClose={this.closeAlert}
        />
      </div>
    );
  }
}

export default App;
