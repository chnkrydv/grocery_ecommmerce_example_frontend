import React, { Component } from 'react';
import './App.css';
import { HomePage } from './components/HomePage';
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
      products: [],
      productsInCart: []
    }
  }

  componentDidMount(){
    getProductsList((products) => this.setState({
      products: products,
      loading: false,
    }));
  }

  toggleCartPanel = () => {
    console.log('something hppnd')
    const updatedOpenState = !this.state.cartOpen;
    this.setState({cartOpen: updatedOpenState});
  }

  render() {
    const { loading , products, productsInCart, cartOpen } = this.state;
    return (
      <div className="App">
        <Cart cartOpen={cartOpen} onTapOutside={this.toggleCartPanel}/>
        <Header header="Grocery Items">
          <CartButton count={productsInCart.length} openCart={this.toggleCartPanel}/>
        </Header>
        {loading ? <div>loading...</div> : <HomePage products={products} />}
      </div>
    );
  }
}

export default App;
