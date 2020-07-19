import React from 'react';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import AppRouter from '../src/components/App/AppRouter';
import { message, Modal } from 'antd';
import { client } from './Client';
import http from './http';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      logginStatus: true
    };
    this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    if (client.isLoggedIn()) {
      for (var i in this.events) {
        window.addEventListener(this.events[i], this.resetTimeout);
      }
      this.setTimeout();
    }
   
  }

  info = () => {
    Modal.info({
      title: 'Login Status',
      content: (
        <p>You will be logged out automatically in 1 minute.</p>
      ),
      onOk() {},
    });
  }

  clearTimeout = () => {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout = () => {
    this.warnTimeout = setTimeout(this.warn, 16 * 1000);

    this.logoutTimeout = setTimeout(this.logout, 30 * 1000);
  }

  resetTimeout = () => {
    this.clearTimeout();
    this.setTimeout();
  }

  warn = () => {
    this.info();
  }

  redirect = () => {
    return <Redirect to={'/logiin'} />
  }

  logout = async () => {
    try {
      Object.assign(http.defaults,
        {
          headers:
          {
            'Authorization': `Bearer ${localStorage.token}`
          }
        }
      )
      const response = await http.post('logout');
      if (response.data.status === 'success') {
        client.logout();
        this.redirect();
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      window.location.reload(true);
    } catch (error) {
      message.error(error.message);
      window.location.href = '/';
    }
  }

  destroy = () => {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }

  render () {
    console.log(this.props);
    return <AppRouter />
  }
}


export default App;
