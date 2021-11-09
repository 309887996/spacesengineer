import './user.less';
import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';

interface User {
  username: string;
  password: string;
}

export default function User(props: any) {
  let inFifteenMinutes: number = new Date(
    new Date().getTime() + 720 * 60 * 1000,
  ).getTime();
  const TokenKey = 'x-access-token';

  const handleSubmit = useCallback((Obj) => {
    axios.get('http://localhost:3000/user').then((res: any) => {
      res.data.forEach((item: User) => {
        if (Obj.username === item.username) {
          if (Obj.password === item.password) {
            Cookies.set(TokenKey, '1111', { expires: inFifteenMinutes });
            console.log(props);
            props.history.push('/');
          } else {
            console.log('密码错误');
          }
        }
      });
    });
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="outside">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
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

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
