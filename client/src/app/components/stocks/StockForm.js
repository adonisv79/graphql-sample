import React, { Component } from 'react';
import { createStock } from '../../../graphql/request'

export default class StockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: ''};
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleClick(event) {
    event.preventDefault();
    const {title, symbol, industryId} = this.state
    createStock({title, symbol, industryId}).then((stock) => {
      this.props.history.push(`/stocks/${stock.id}`)
    })
  }

  render() {
    const {title, symbol} = this.state;
    this.state.industryId = 'PPT' //hardcode for now
    return (
      <div>
        <h1 className="title">New Stock</h1>
        <div className="box">
          <form>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input className="input" type="text" name="title" value={title}
                  onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Symbol</label>
              <div className="control">
                <input className="input" type="text" name="symbol" value={symbol}
                  onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link" onClick={this.handleClick.bind(this)}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
