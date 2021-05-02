import React ,{useState}from 'react';
import '../css/ChiTiet.css'
import { Form, Input, Button,Select, DatePicker,Checkbox, InputNumber} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import DiaDiem from './Checkbox';
export default function Add() {
    const [text,setText]=useState('');
    const onChangeGia = (e) =>{
        const value = e.target.value;
        setText(value)
    }
    const [image,setImage]=useState('/img/manager-1.jpg');
    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img))
            
        }
    }

    
    return (
        <div style={{marginTop:'30px'}}>
            <h1 style={{textAlign:'center',fontWeight:'bold',textTransform:'uppercase'}}>Thêm Voucher</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div class="col--detail--1">
                        <img src={image}  />
                        {/* <h1>Select Image</h1> */}
                        <input type="file" name="myImage" onChange={onImageChange} style={{marginTop:'10px',cursor: 'pointer'}} />
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
                    name="maVoucher"
                    label="Mã Voucher"
                    className="form__row"
                >
                <Input  placeholder="Nhập Mã Voucher ('MV...')..."  className="form__input" disabled />
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
                {/* <Form.Item label="Điều kiện" name="dieukien"  className="form__row">
                    <Checkbox.Group>
                        <div>
                            <Checkbox  name="option_1" value="A" style={{ lineHeight: '32px' } } >
                            <Form.Item label="Điều kiện" name="dieukien">
                                <Input label="Loại" name="input_1" ></Input>
                            </Form.Item>
                                
                            </Checkbox> 
                        </div>
                        <div>
                            <Checkbox name="option" value="B" style={{ lineHeight: '32px' }}>B</Checkbox>
                        </div>
                        <div>
                            <Checkbox name="option" value="C" style={{ lineHeight: '32px' }}>C</Checkbox>
                        </div>
                        <div>
                            <Checkbox name="option" value="D" style={{ lineHeight: '32px' }}>D</Checkbox>
                        </div>
                        <div>
                            <Checkbox name="option" value="E" style={{ lineHeight: '32px' }}>E</Checkbox>
                        </div>
                        <div>
                            <Checkbox name="option" value="F" style={{ lineHeight: '32px' }}>F</Checkbox>
                        </div>
                    </Checkbox.Group>
                </Form.Item> */}
                <Form.Item
                    name="diadiem"
                    rules={[
                        { required: true, message: 'Chọn ít nhất 1 địa điểm áp dụng' },
                    ]}
                    label="Địa Điểm:"
                    className="form__row"
                >
                    
                    <Checkbox.Group>
                        
                    </Checkbox.Group>
                    
                </Form.Item>
                <Form.Item
                    name="gia"
                   
                    label="Giá"
                    className="form__row"
                >
                
                   <InputNumber
                        defaultValue={1000000}
                        min={1}
                        style={{color:'rgba(0, 0, 0, 0.85)',padding:'0 11px',outline:'none',width:'488px'}}
                        formatter={value => ` ${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        
                    /> 
                </Form.Item>
                <Form.Item
                    name="trigia"
                
        
                                
                        

                   
                    label="Phần Trăm Giá"
                    className="form__row"
                >
                    <InputNumber

                        style={{color:'rgba(0, 0, 0, 0.85)',padding:'0 11px',outline:'none',width:'488px'}}

                        defaultValue={100}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        x
                    />
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
     
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
