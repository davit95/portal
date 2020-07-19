import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { message, Button, Divider } from 'antd';
import http from '../../http';
import { client } from '../../Client';


class index extends Component {
  state = {
    user: {},
    loaded : false
  }
  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    try {
      Object.assign(http.defaults,
        {
          headers:
          {
            'Authorization': `Bearer ${localStorage.token}`
          }
        }
      )
      this.setState({ loading : true });
      const response = await http.get('me');
      if (response.data.status === 'success') {
        const { user } = response.data;
        this.setState({ user: user });
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
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
        const user = {};
        this.setState({ user: user });
        client.logout();
        message.success(response.data.message);
        this.redirect('/login');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  redirect = (url) => {
    this.props.history.push(url);
  }

  render() {
    return (
      <div>
        You Logged In As : { this.state.user.email}
        <Divider />
        <Button onClick={this.logout}>Logout</Button>
        <Divider />
        <Link to={'/change-email'}><Button>Change Email</Button></Link>
      </div>
    )
  }
}

export default withRouter(index);