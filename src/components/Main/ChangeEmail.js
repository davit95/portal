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


class ChangeEmail extends Component {

  onFinish = async values => {
    try {
      const { email, new_email } = values;
      Object.assign(http.defaults,
        {
          headers:
          {
            'Authorization': `Bearer ${localStorage.token}`
          }
        }
      )
      const response = await http.post('change-email', { email, new_email });
      if (response.data.status === 'success') {
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
          label="Old E-mail"
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Old Email" />
        </Form.Item>
        <Form.Item
          name="new_email"
          label="New E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your New E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="New Email" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Change
            </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(ChangeEmail);
