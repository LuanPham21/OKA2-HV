import React, { useState } from 'react'
import '../css/Add.css';
import { Form, Input, Button,Select} from 'antd';

export default function DieuKien() {
  
    // dieu kien
   
    return (
       <div className="container">
           
           <Form 
            name="normal_login"
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            className="all--form"
            >
                <Form.Item
                    name="maVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống mã điều kiện' },
                    ]}
                    label="Mã Điều Kiện"
                    className="form__row"
                    style={{paddingTop:'35px'}}
                >
                <Input  placeholder="Nhập Mã Điền Kiện ('MV...')..."  className="form__input" />
                </Form.Item>
                <Form.Item
                    name="tenVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống tên diều kiện' },
                    ]}
                    label="Tên Diều Kiện"
                    className="form__row"
                >
                <Input  placeholder="Nhập Tên Điều Kiện ..."  />
                </Form.Item>
                <Form.Item 
                label="Mã Voucher" 
                name="select"
                rules={[
                    { required: true, message: 'Không được bỏ trống Mã Voucher' }
                ]}
                className="form__row"
                >
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="123">123</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="diadiem"
                    rules={[
                        { required: true, message: 'Không được bỏ trống Loại Điều Kiện' },
                    ]}
                    label="Loại Điều Kiện"
                    className="form__row"
                >
                <Input  placeholder="Nhập Loại Điều Kiện ..."  />
                </Form.Item>
                <Form.Item
                    name="diadiem"
                    rules={[
                        { required: true, message: 'Không được bỏ trống Giá Trị' },
                    ]}
                    label="Giá Trị"
                    className="form__row"
                >
                <Input  placeholder="Nhập Giá Trị..."  />
                </Form.Item>
                <Form.Item className="form-btn-login">
                <Button type="primary" htmlType="submit" className="btn--them text-right btn btn-primary" >
                Thêm
                </Button>
                </Form.Item>
            </Form>     
               
       </div>
    )
}

