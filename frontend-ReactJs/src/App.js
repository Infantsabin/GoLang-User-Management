// import logo from './logo.svg';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './Component/login'
import SignUp from './Component/signup'
import Dashboard from './Component/dashboard'
import HooksFrom from './Component/hooksForm'

function App() {
   const token = localStorage.getItem('user')
    return ( 
        <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>GoLearn</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {token ? 
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/hook"}>Hook</Link>
              </li>   
              <li className="nav-item">
                <Link className="nav-link" to={"/logout"}>Logout</Link>
              </li>   
            </ul> 
            :
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li> </ul> }
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/hook" component={HooksFrom} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/logout" render={() => {
              // <Redirect to='/dashboard'  />
              localStorage.clear();
              window.location='/'

            }} />
          </Switch>
        </div>
      </div>
    </div></Router>
    );
}
export default App;