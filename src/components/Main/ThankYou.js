import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const ThankYou = () => {
  return (
    <Title level={2}>
      You Have Successfully Sent Email.
      Please Check Your Email And Activate Link for Login
    </Title>
  )
}

export default ThankYou;
