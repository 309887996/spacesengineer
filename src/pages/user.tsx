import "./user.less"
import React from "react"
import { Form, Input, Button, Checkbox } from 'antd';
import Cookies from 'js-cookie'

export default function User() {
  let inFifteenMinutes: number = new Date(new Date().getTime() + 720 * 60 * 1000).getTime();
  const TokenKey = 'x-access-token'
  const onFinish = (values: any) => {
    console.log('Success:', values);
    Cookies.set(TokenKey, 1111, { expires: inFifteenMinutes })
    window.location.href = "http://localhost:8000/"
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (<div className="outside">
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        className="form"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
    </Button>
      </Form.Item>
    </Form>
  </div>)
}
