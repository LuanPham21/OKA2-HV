import React ,{useState,useEffect}from 'react';
import '../css/ChiTiet.css'
import { Form, Input, Button,Select, DatePicker,Checkbox, InputNumber, Space} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import DiaDiem from './Checkbox';
import {getCurrentDate} from './utils'


export default function Add() {

    const [ttdieukien,setttDieukien]=useState(false)
    const [dieukien,setDieukien]=useState('')

    const [ttdieukien_1,setttDieukien_1]=useState(false)
    const [dieukien_1,setDieukien_1]=useState('')

    const [form] = Form.useForm();

    const [text,setText]=useState('');
    const onChangeGia = (e) =>{
        const value = e.target.value;
        setText(value);
        console.log(value)
        form.setFieldsValue({
            gia:value
        });
        
    };



    

    
      

    
    const [image,setImage]=useState('/img/manager-1.jpg');
    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img))
            kjhgkj
        }
    }

    const onChange =(e)=>{
        setDieukien(e.target.value)
        console.log(dieukien)
    }
    const onChange_1 =(e)=>{
        setDieukien_1(e.target.value)
        console.log(dieukien_1)
    }

    const {RangePicker} = DatePicker;
    
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
                        form={form}
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
                
                <Form.Item
                    name="dieu kien"
                    label="dieu kien"
                    rules={[
                        { }, 
                        {
                            validator(_,value) {
                              if (( dieukien===''&&ttdieukien===true)||( dieukien===null&&ttdieukien===true)||( dieukien_1===''&&ttdieukien_1===true)||( dieukien_1===null&&ttdieukien_1===true)) {
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              }
                              return Promise.resolve();
                            },
                        }
                                    
                    ]}
                    className="form__row"
                    // style={{width:'120px'}}
                >
                    <Space direction="vertical">
                        <Space>
                            <Checkbox id="dieukien" value="A" onClick={()=>setttDieukien(!ttdieukien)}>AAAAAAAAAAAAAAAAAA</Checkbox>  
                            <Input type="text" id="dk_1" disabled={!(ttdieukien)} defaultValue={dieukien} style={{width:100},{justifySelf:'center'}} onChange={onChange}></Input>  
                        </Space>       
                        <Space>
                            <Checkbox id="dieukien_1" value="B" onClick={()=>setttDieukien_1(!ttdieukien_1)}>AAAAAAAAAAAAAAAAAA</Checkbox>  
                            <Input type="text" id="dk_2" disabled={!(ttdieukien_1)} defaultValue={dieukien_1} style={{width:100},{justifySelf:'center'}} onChange={onChange_1}></Input>

                        </Space>              
                    </Space>
                    
                    
                    
                </Form.Item>


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
                    rules={[
                        {required:true,message:"a"},
                        
                    ]}
                    label="Giá"
                    className="form__row"
                    initialValue={text}
                    
                >
                
                   <CurrencyInput id="id_input_1" className="form__input" onChange={onChangeGia}/><p>;</p>
                </Form.Item>
                <Form.Item
                    name="trigia"
                
        
                                
                        

                   
                    label="Phần Trăm Giá"
                    className="form__row"
                >
                    <InputNumber

                        style={{color:'rgba(0, 0, 0, 0.85)',padding:'0 11px',outline:'none',width:'488px'}}

                        defaultValue={10}
                        min={10}
                        max={90}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        
                    />
                </Form.Item>
                <Form.Item
                    name="khoangtg"
                    
                    rules={[
                        { required: true, message: 'Không được bỏ trống khoảng thời gian hiệu lực' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('ngaykt') >= value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                          }),
                    ]}
                    label="Thời gian hữu hi"
                    className="form__row"
                >
                    {/* <RangePicker /> */}
                    {/* <RangePicker renderExtraFooter={() => 'extra footer'} className='form__input'   /> */}
                    <DatePicker placeholder="Nhập Ngày Kết Thúc..." className="form__input"/>
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
