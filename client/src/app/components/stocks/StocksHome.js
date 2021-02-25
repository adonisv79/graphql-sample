import React, { Component } from 'react';
import StocksList from './StocksList';
import { loadStocks } from '../../../graphql/request';

export default class StocksHome extends Component {
  constructor(props) {
    super(props);
    this.state = { stocks: [] };
  }

  async componentDidMount() {
    const stocks = await loadStocks();
    this.setState({stocks});
  }

  render() {
    const {stocks} = this.state;
    return (
      <div>
        <h1 className="title">Stocks List</h1>
        <StocksList stocks={stocks} />
      </div>
    );
  }
}
