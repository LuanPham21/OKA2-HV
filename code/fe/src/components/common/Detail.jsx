import React from 'react';
import '../css/ChiTiet.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import DiaDiem from './Checkbox';
export default function Detail() {
    
    return (
        <div style={{marginTop:'30px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div class="col--detail--1">
                        <img src="/img/manager-1.jpg" />    
                        </div>
                    </div>
                    <div className="col-lg-8 ">
                    <Form 
            name="normal_login"
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            className="col-lg-8-detalis"
            >
                
                <Form.Item
                    name="tenVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống tên voucher' },
                    ]}
                    label="Tên Voucher"
                    className="form__row"
                >
                <p>Tên Voucher</p>
                </Form.Item>
                <Form.Item 
                label="Loại Voucher" 
                name="select"
                rules={[
                    { required: true, message: 'Không được bỏ trống loại voucher' },
                ]}
                className="form__row"
                >
                  <p>Loại Voucher</p>
                </Form.Item>
                <Form.Item label="Điều kiện" name="dieukien"  className="form__row">
                    <p>Điều Kiện</p>
                </Form.Item>
                <Form.Item
                    name="diadiem"
                    rules={[
                        // { required: true, message: 'Không được bỏ trống địa điểm' },
                    ]}
                    label="Địa Điểm"
                    className="form__row"
                >
                   <p>Địa Điểm</p>
                    
                </Form.Item>
                <Form.Item
                    name="gia"
                    rules={[
                        { required: true, message: 'Không được bỏ trống giá voucher' },
                    ]}
                    label="Giá"
                    className="form__row"
                >
                   <p>Giá</p>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    rules={[
                        { required: true, message: 'Không được bỏ trống phần trăm giá' },
                    ]}
                    label="Phần Trăm Giá"
                    className="form__row"
                >
                   <p>Giá Trị</p>
                </Form.Item>
                <Form.Item
                    name="ngaybd"
                    rules={[
                        { required: true, message: 'Không được bỏ trống ngày bắt đầu' },
                    ]}
                    label="Ngày Bắt Đầu"
                    className="form__row"
                >
                    {/* <RangePicker /> */}
                   <p>Ngày bắt đầu</p>
                </Form.Item>
                <Form.Item
                    name="ngaykt"
                    rules={[
                        { required: true, message: 'Không được bỏ trống ngày bắt đầu' },
                    ]}
                    label="Ngày Kết Thúc"
                    className="form__row"
                >
                   <p>Ngày kết thúc</p>
                   
                </Form.Item>
            </Form>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
