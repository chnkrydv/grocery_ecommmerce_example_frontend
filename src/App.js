import React, { Component, Fragment } from 'react';
import './App.css';
import { getProductCategories, getProfile, getCategoryItems, getSpecificItems } from './api/endpoints';
import ProductCategories from './components/ProductCategories';
import Header from './components/Header';
import CartButton from './components/CartButton';
import Cart from './components/Cart';
import IfElse from './components/IfElse';
import ProfileButton from './components/ProfileButton';
import AuthPage from './components/AuthPage';
import CategoryItems from './components/CategoryItems';
import Switch from './components/Switch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cartOpen: false,
      authPageOpen: false,
      profile: {},
      productsInCart: {},
      productCategories: {},
      categoryItems: [],
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
      categoryItems: [],
    });
    console.log(this.state.categoryItems);
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

  toggleCartVisibility = () => {
    const updatedOpenState = !this.state.cartOpen;
    this.setState({ cartOpen: updatedOpenState });
  }

  toggleAuthPageVisibility = () => {
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

  loadCategoryItems = (categoryName) => {
    const {productsInCart} = this.state;
    getCategoryItems(categoryName, (categoryItems) => {
      const itemsWithCount = categoryItems.map(item => {
        let itemWithCount = {...item};
        itemWithCount.totalInCart = 0;
        Object.keys(productsInCart).forEach(key => {
          if(key === item.productId){
            console.log('reached here');
            itemWithCount.totalInCart = productsInCart[key];
            console.log(itemWithCount);
          }
        });
        return itemWithCount;
      });
      
      console.log('productsInCart: ', productsInCart);
      console.log('itemsWithCount: ', itemsWithCount);
      this.setState({
        categoryItems: itemsWithCount,
        routeIndex: 1,
      });
    });
  }

  loadCartItems = (ids) => {
    getSpecificItems(ids, (response) => {
      console.log(response);
      // this.setState({productsInCart: response.requestedItems});
    });
  }

  cartItemsChange = (productId, count) => {
    const { productsInCart, categoryItems } = this.state;
    const newCart = {...productsInCart};
    newCart[productId] = count;
    const newCategoryItems = categoryItems.map(item => {
      if(item.productId === productId) item.totalInCart = count;
      return item;
    });
    
    console.log(newCart)
    console.log(newCategoryItems);
    this.loadCartItems(Object.keys(newCart));

    this.setState({productsInCart: newCart, categoryItems: newCategoryItems});
  }

  getCartItemsCount = () => {
    const {productsInCart} = this.state;
    let count = 0;
    Object.keys(productsInCart).forEach(key => count += productsInCart[key]);

    return count
  }

  render() {
    const {
      loading,
      productCategories,
      categoryItems,
      productsInCart,
      cartOpen,
      authPageOpen,
      profile,
      routeIndex,
    } = this.state;

    return (
      <div className="App">
        <Header header="Groceries Mart" onHeaderClick={this.reloadApp}>
          <div className="header_children grid_right">
            <CartButton count={this.getCartItemsCount()} openCart={this.toggleCartVisibility} />
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
                  onCategorySelect={this.loadCategoryItems}
                />
                <CategoryItems
                  categoryItems={categoryItems}
                  onItemSelectChange={this.cartItemsChange}
                />
              </Switch>
            }
          />
        </div>
        <Cart
          cartOpen={cartOpen}
          onTapOutside={this.toggleCartVisibility}
          items={productsInCart}
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
