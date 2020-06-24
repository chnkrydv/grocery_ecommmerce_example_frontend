import React, { Component } from 'react';
import './App.css';
import { ProductCategories } from './components/ProductCategories';
import { getProductsList } from './api/requests';
import { Header } from './components/Header';
import CartButton from './components/CartButton';
import Cart from './components/Cart';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cartOpen: false,
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

  toggleCartPanel = () => {
    console.log('something hppnd')
    const updatedOpenState = !this.state.cartOpen;
    this.setState({ cartOpen: updatedOpenState });
  }

  render() {
    const { loading, productCategories, productsInCart, cartOpen } = this.state;
    return (
      <div className="App">
        <Header header="Groceries Mart">
          <CartButton count={productsInCart.length + 12} openCart={this.toggleCartPanel} />
        </Header>
        <div className="app_container">
          {loading
            ? <div>loading...</div>
            : <ProductCategories categories={productCategories} />}
        </div>
        <Cart cartOpen={cartOpen} onTapOutside={this.toggleCartPanel} />
      </div>
    );
  }
}

export default App;
