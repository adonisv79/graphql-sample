import React, { Component } from 'react';
import { loadIndustry } from '../../../graphql/request'
import StocksList from './../stocks/StocksList'

export default class IndustryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {industry: null };
  }

  async componentDidMount() {
    const {industryId} = this.props.match.params;
    const industry = await loadIndustry(industryId);
    this.setState({industry})
  }

  render() {
    const {industry} = this.state;
    if (!industry) {
      return null
    }
    return (
      <div>
        <h1 className="title">{industry.title}</h1>
        <h5 className="title is-5">Stocks under {industry.title}</h5>
        <StocksList stocks={industry.stocks} />
      </div>
    );
  }
}
