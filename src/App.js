import React, { Component } from 'react';
import './App.css';
import { HomePage } from './components/HomePage';
import { getGroceriesList } from './api/requests';
import { Header } from './components/Header';
import CartButton from './components/CartButton';
import Modal from './components/Modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cartOpen: false,
      groceries: [],
    }
  }

  componentDidMount(){
    getGroceriesList((groceries) => this.setState({
      groceries,
      loading: false,
    }));
  }

  toggleCartPanel = () => {
    console.log('something hppnd')
    const updatedOpenState = !this.state.cartOpen;
    this.setState({cartOpen: updatedOpenState});
  }

  render() {
    const { loading , groceries, cartOpen } = this.state;
    return (
      <div className="App">
        <Modal cartOpen={cartOpen} onTapOutside={this.toggleCartPanel}>some child</Modal>
        <Header header="Grocery Items">
          <CartButton count={cartOpen} openCart={this.toggleCartPanel}/>
        </Header>
        {loading ? <div>loading...</div> : <HomePage groceries={groceries} />}
      </div>
    );
  }
}

export default App;
