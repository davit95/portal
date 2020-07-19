import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import http from '../../http';
import { client } from '../../Client';

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

class Home extends Component {

  componentDidMount() {
    console.log(client.isLoggedIn())
  }

  formRef = React.createRef();

  onFinish = async (values) => {
    if (client.isLoggedIn()) {
      this.logout();
    }
    const { email } = values;
    const isAuth = client.isLoggedIn();
    try {
      const response = await http.post('send-code', { email, isAuth });
      if (response.data.status === 'success') {
        message.success(response.data.message);
        this.redirect('/thank-you');
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
        message.success(response.data.message);
        this.redirect('/login');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      this.redirect('/');
    }
  }

  render() {
    return (
      <Form
        style={{ margin: '50px' }}
        {...layout}
        ref={this.formRef}
        onFinish={this.onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
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
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            htmlType="submit"
            type="primary"
            loading={this.props.loading}
          >
            Send Email
          </Button>
        </Form.Item>
      </Form>
      // <Form
      //     {...layout}
      //     name="normal_login"
      //     className="login-form"
      //     initialValues={{ remember: true }}
      //     onFinish={this.onFinish}
      //   >
      //     <Form.Item
      //       name="email"
      //       label="E-mail"
      //       rules={[
      //         {
      //           type: 'email',
      //           message: 'The input is not valid E-mail!',
      //         },
      //         {
      //           required: true,
      //           message: 'Please input your E-mail!',
      //         },
      //       ]}
      //     >
      //       <Input  placeholder="Email" />
      //     </Form.Item>
      //     <Form.Item
      //       label="Password"
      //       name="password"
      //       rules={[{ required: true, message: 'Please input your Password!' }]}
      //     >
      //       <Input
              
      //         type="password"
      //         placeholder="Password"
      //       />
      //     </Form.Item>
          
      //     <Form.Item {...tailLayout}>
      //       <Button type="primary" htmlType="submit" className="login-form-button">
      //         Log in
      //       </Button>
      //     </Form.Item>
      //   </Form> 
    )
  }
}

export default withRouter(Home);
