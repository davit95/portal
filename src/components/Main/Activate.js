import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import http from '../../http';

class Activate extends Component {
  componentDidMount() {
    const { code } = this.props.match.params;
    this.register(code);
  }

  register = async (code) => {
    try {
      const response = await http.post('register', { code });
      if (response.data.status === 'success') {
        const token = response.data.access_token;
        localStorage.token = token;
        Object.assign(http.defaults,
          {
            headers:
            {
              'Authorization': `Bearer ${localStorage.token}`
            }
          }
        )
        message.success(response.data.message)
        this.redirect('/dashboard')
      } else {
        message.error(response.data.message)
        this.redirect('/')
      }
    } catch (error) {
      message.error(error.message)
      this.redirect('/');
    }
  }

  redirect = (url) => {
    this.props.history.push(url);
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default withRouter(Activate);
