import React, { useState, useEffect } from 'react'
import '../css/Add.css';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
// import Select from 'react-select'
// import Select from 'react-select';
import Axios from 'axios'
import { Form, Input, Button,Select,DatePicker } from 'antd';


export default function Add() {
    const [openPopup,setOpenPopup]=useState(false);
    return (
       <div className="container">
           <Form 
            name="normal_login"
            className=" all--form"
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            >
                <h1 style={{textAlign:'center'}}>Thêm Voucher</h1>
                <Form.Item
                    name="maVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống mã voucher' },
                    ]}
                    label="Mã Voucher"
                    className="form__row"
                >
                <Input  placeholder="Nhập Mã Voucher ('MV...')..."  className="form__input" />
                </Form.Item>
                <Form.Item
                    name="tenVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống tên voucher' },
                    ]}
                    label="Tên Voucher"
                    className="form__row"
                >
                <Input  placeholder="Nhập Tên Voucher ..."  />
                </Form.Item>
                <Form.Item 
                label="Loại Voucher" 
                name="select"
                rules={[
                    { required: true, message: 'Không được bỏ trống loại voucher' },
                ]}
                className="form__row"
                >
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Điều kiện" name="dieukien"  className="form__row"  onClick={() => setOpenPopup(true)}>
                <Button  >
                    ...
                </Button>
                </Form.Item>
                <Form.Item
                    name="diadiem"
                    rules={[
                        { required: true, message: 'Không được bỏ trống địa điểm' },
                    ]}
                    label="Địa Điểm"
                    className="form__row"
                >
                <Input  placeholder="Nhập Địa Điểm ..."  />
                </Form.Item>
                <Form.Item
                    name="gia"
                    rules={[
                        { required: true, message: 'Không được bỏ trống giá voucher' },
                    ]}
                    label="Giá"
                    className="form__row"
                >
                   <CurrencyInput id="input-example"className="form__input" placeholder="Nhập Giá ..." style={{color:'rgba(0, 0, 0, 0.85)',padding:'0 11px',outline:'none'}}  suffix="VNĐ"/><p style={{display:'none'}}>;</p>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    rules={[
                        { required: true, message: 'Không được bỏ trống phần trăm giá' },
                    ]}
                    label="Phần Trăm Giá"
                    className="form__row"
                >
                   <CurrencyInput id="input-example" className="form__input" placeholder="Nhập Phần Trăm Giá ..." style={{color:'rgba(0, 0, 0, 0.85)',padding:'0 11px',outline:'none'}}  suffix="%"/><p style={{display:'none'}}>;</p>
                </Form.Item>
                <Form.Item
                    name="hinh"
                    rules={[
                        { required: true, message: 'Không được bỏ trống hình' },
                    ]}
                    label="Hình"
                    className="form__row"
                >
                   <Input placeholder="Nhập Hình..."/>
                </Form.Item>
                <Form.Item
                    name="ngaybd"
                    rules={[
                        { required: true, message: 'Không được bỏ trống ngày bắt đầu' },
                    ]}
                    label="Ngày Bắt Đầu"
                    className="form__row"
                >
                   <DatePicker placeholder="Nhập Ngày Bắt Đầu..." className="form__input"/>
                </Form.Item>
                <Form.Item
                    name="ngaykt"
                    rules={[
                        { required: true, message: 'Không được bỏ trống ngày bắt đầu' },
                    ]}
                    label="Ngày Kết Thúc"
                    className="form__row"
                >
                   <DatePicker placeholder="Nhập Ngày Kết Thúc..." className="form__input"/>
                </Form.Item>
                <Form.Item className="form-btn-login">
                <Button type="primary" htmlType="submit" className="btn--them text-right btn btn-primary" >
                Thêm
                </Button>
                </Form.Item>
            </Form>
             <Popup 
              openPopup={openPopup} 
              setOpenPopup={setOpenPopup}
              title = 'Điều Kiện'
            >
                <DieuKien/>
            </Popup>
        </div>
    )
}
