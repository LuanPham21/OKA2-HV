import React, {useState} from 'react'
import '../css/Login.css';
import { Form, Input, Button } from 'antd';
import {UserOutlined,LockOutlined,KeyOutlined} from '@ant-design/icons'
export default function SignIn() {
   return (
    <div className="form-body">
        <Form 
       name="normal_login"
       className="login-form form-center"
       // initialValues={{ remember: true }}
       // onFinish={onFinish}
       >
           <h1>Đăng Ký</h1>
           <Form.Item
               name="username"
               rules={[
                   { required: true, message: 'Không được bỏ trống tài khoản' },
                   {min:0,max:5,message:'không dược dài quá 5 kí tự'}
               ]}
              
           >
           <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tài khoản"  />
           </Form.Item>
           <Form.Item
           name="password"
           rules={[{ required: true, message: 'Không được để trống mật khẩu' }]}
            >
           <Input.Password
           prefix={<LockOutlined className="site-form-item-icon" />}
           // type="password"
           placeholder="Mật khẩu"
           />
           </Form.Item>
            <Form.Item
            name="confirm"
            // dependencies={['password']}
            hasFeedback
            rules={[
                {
                required: true,
                message: 'Không được để trống xác nhận mật khẩu',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu nhập vào không trùng khớp'));
                    },
                    }),
                
            ]}
            >
            <Input.Password placeholder="Xác Nhận Mật Khẩu" prefix={<KeyOutlined  className="site-form-item-icon"/>} />
            </Form.Item>
           <Form.Item className="form-btn-login">
           <Button type="primary" htmlType="submit" className="login-form-button">
           Đăng Ký
           </Button>
           </Form.Item>
           {/* test */}
        </Form>     
   </div>
    );
}
