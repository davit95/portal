import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import http from '../../http';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


class Login extends Component {

  onFinish = async values => {
    try {
      const { email } = values;
      const response = await http.post('login', { email });
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
        const { user } = response.data;
        this.setState({ user: user });
        message.success(response.data.message)
        this.redirect('/dashboard');
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
    if (localStorage.getItem('token')) {
      this.redirect('/dashboard');
    }
    return (
      <Form
        style={{ margin: '20px' }}
        {...layout}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(Login);
