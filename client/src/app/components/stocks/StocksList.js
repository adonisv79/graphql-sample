import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class StocksList extends Component {
  render() {
    const {stocks} = this.props;
    return (
      <ul className="box">
        {stocks.map(this.renderStock.bind(this))}
      </ul>
    );
  }

  renderStock(stock) {
    const title = stock.title;
    return (
      <li className="media" key={stock.id}>
        <div className="media-content">
          <Link to={`/stocks/${stock.id}`}>{stock.title}</Link>
        </div>
      </li>
    );
  }
}
