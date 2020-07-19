import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from '../Main/Home';
import ThankYou from '../Main/ThankYou';
import Activate from '../Main/Activate';
import Login from '../Main/Login';
import ChangeEmail from '../Main/ChangeEmail';
import Dashboard from '../Dashboard';
 
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/thank-you' component={ThankYou} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/activate/:code' component={Activate} />
        <Route path='/login' component={Login} />
        <Route path='/change-email' component={ChangeEmail} />
      </Switch>
    </Router>
  );
}
 
export default Routes;