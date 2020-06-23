import React, { Component } from 'react';
import './App.css';
import { HomePage } from './components/HomePage';
import { getGroceriesList } from './api/requests';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      groceries: [],
    }
  }

  componentDidMount(){
    getGroceriesList((groceries) => this.setState({
      groceries,
      loading: false,
    }));
  }

  render() {
    const { loading , groceries } = this.state;
    return (
      <div className="App">
        {loading ? <div>loading...</div> : <HomePage groceries={groceries} />}
      </div>
    );
  }
}

export default App;
