import React, { Component, Fragment } from 'react';
import './App.css';
import {
  getProductCategories,
  getProfile,
  getCategoryItems,
  getSpecificItems,
  updateAddress
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
    }
  }

  componentDidMount() {
    this.loadProfile();
    this.loadProductCategories();
  }

  contentLoading = (loading) => this.setState({ loading });

  reloadApp = () => {
    this.setState({
      routeIndex: 0,
      categoryPageItems: [],
    });
    console.log(this.state.categoryPageItems);
  }

  loadProfile = () => {
    getProfile((profile) => {
      this.setState({ profile });
    });
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
    });
  }

  toggleCartVisibility = () => {
    const { cartOpen, cartItemsIdAndCountMap } = this.state;
    const updatedOpenState = !cartOpen;
    this.setState({ cartOpen: updatedOpenState, cartItemsLoading: true });

    this.loadCartItems(Object.keys(cartItemsIdAndCountMap).filter(key => cartItemsIdAndCountMap[key] > 0));
  }

  toggleAuthPageVisibility = () => {
    console.log('fired')
    const updatedOpenState = !this.state.authPageOpen;
    this.setState({ authPageOpen: updatedOpenState });
  }

  loadProductCategories = () => {
    getProductCategories((productCategories) => {
      this.setState({
        productCategories: productCategories,
        loading: false,
      })
    });
  }

  getItemsWithCount = (items) => {
    const {cartItemsIdAndCountMap} = this.state;

    return items.map(item => {
      let itemWithCount = {...item};
      itemWithCount.totalInCart = 0;
      Object.keys(cartItemsIdAndCountMap).forEach(key => {
        if(key === item.productId){
          console.log('reached here');
          itemWithCount.totalInCart = cartItemsIdAndCountMap[key];
          console.log(itemWithCount);
        }
      });
      return itemWithCount;
    });
  }

  loadCategoryPageItems = (categoryName) => {
    getCategoryItems(categoryName, (productItems) => {
      const itemsWithCount = this.getItemsWithCount(productItems);
      
      this.setState({
        categoryPageItems: itemsWithCount,
        routeIndex: 1,
      });
    });
  }

  loadCartItems = (ids) => {
    console.log(ids);
    getSpecificItems(ids, (requestedItems) => {
      console.log(requestedItems);
      this.setState({
        cartItems: this.getItemsWithCount(requestedItems),
        cartItemsLoading: false,
      });
    });
  }

  cartItemsChange = (productId, count) => {
    console.log('changes')
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
