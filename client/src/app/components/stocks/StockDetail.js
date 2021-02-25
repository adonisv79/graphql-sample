import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadStock } from '../../../graphql/request'

export default class StockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {stock: null };
  }

  async componentDidMount() {
    const {stockId} = this.props.match.params;
    const stock = await loadStock(stockId)
    this.setState({stock})
  }

  render() {
    const {stock} = this.state;
    if (!stock) {
      return null;
    }
    return (
      <div>
        <h1 className="title">{stock.title} [{stock.symbol}]</h1>
        <h2 className="subtitle">
          <Link to={`/industries/${stock.industry.id}`}>{stock.industry.title}</Link>
        </h2>
      </div>
    );
  }
}
