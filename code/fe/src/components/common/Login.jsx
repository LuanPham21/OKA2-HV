import React from 'react'
import {} from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons'
export default function Login() {
    return (
        <div className="backgroud-all">
            <div className="form-body">
                <Form 
                name="normal_login"
                className="login-form form-center"
                // initialValues={{ remember: true }}
                // onFinish={onFinish}
                >
                    <h1>Đăng Nhập</h1>

                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Không được để trống tài khoản' },
                            {min:0,max:5,message:'không dược dài quá 5 kí tự'}
                        ]}
                        style={{maxWidth:'10% !important'}}
                    >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tài Khoản"  />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Không được để trống mật khẩu' }]}
                    >
                    <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    // type="password"
                    placeholder="Mật Khẩu"
                    />
                    </Form.Item>
                    <div className="form-forget">
                        <a href="" >Quên mật khẩu ?</a>
                    </div>
                    <Form.Item className="form-btn-login">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng Nhập
                    </Button>
                    </Form.Item>
            </Form>
            </div>
        </div>
    )
}
