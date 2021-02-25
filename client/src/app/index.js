import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedIn, logout } from './../services/auth';
import IndustryDetail from './components/industries/IndustryDetail';
import LoginForm from './components/authentication/LoginForm';
import StocksHome from './components/stocks/StocksHome';
import StockDetail from './components/stocks/StockDetail';
import StockForm from './components/stocks/StockForm';
import NavBar from './components/NavBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: isLoggedIn()};
  }

  handleLogin() {
    this.setState({loggedIn: true});
    this.router.history.push('/');
  }

  handleLogout() {
    logout();
    this.setState({loggedIn: false});
    this.router.history.push('/');
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <Router ref={(router) => this.router = router}>
        <div>
          <NavBar loggedIn={loggedIn} onLogout={this.handleLogout.bind(this)} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={StocksHome} />
                <Route path="/industries/:industryId" component={IndustryDetail} />
                <Route exact path="/stocks/new" component={StockForm} />
                <Route path="/stocks/:stockId" component={StockDetail} />
                <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLogin.bind(this)} />} />
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}
