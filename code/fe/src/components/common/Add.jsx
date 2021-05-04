import React ,{useState,useEffect}from 'react';
import '../css/ChiTiet.css'
import { Form, Input, Button,Select, DatePicker,Checkbox, InputNumber, Space} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import DiaDiem from './Checkbox';
import {getCurrentDate} from './utils'


export default function Add() {

    const [form] = Form.useForm();   
    const [dieukien,setDieukien]=useState([{check:false,input:''},{check:false,input:''}])
    
    

    form.setFieldsValue('dkien',[...dieukien,{check:false,input:''}])
    form.setFieldsValue('dkien',[...dieukien,{check:false,input:''}])
 
    const [text,setText]=useState(0);
    const onChangeGia = (e) =>{
        const value = Number(e.target.value.replace(/\ VNĐ\s?|(,*)/g, ''));
        setText(value);
        console.log(value)
        form.setFieldsValue({
            gia:value
        });
        
    };

    const [textTriGIa,setTextTriGia]=useState(0);
    const onChangeTriGia =(e)=>{
        const value = Number(e.target.value.replace(/\ %\s?|(,*)/g, ''));
        setTextTriGia(value);
        console.log(value)
        form.setFieldsValue({
            trigia:value
        });
    }



    
    const onFinish = (values) => {
        console.log('Success:', values[0]['dieukien']);
        console.log(dieukien[0]['check'])
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      

    
    const [image,setImage]=useState('/img/manager-1.jpg');
    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img))

        }
    }

    const onChange = (name,index,e)=>{
		let tempArray = [...dieukien];
		if(name==='check')
        {
			tempArray[index] = {...tempArray[index],check:!tempArray[index]['check']}
            // if(tempArray[index]['check']==false)
            // {
            //     tempArray[index] = {...tempArray[index],input:''}
            // }
    }
		else
			tempArray[index] = {...tempArray[index],input:e.target.value}
            console.log(dieukien[0]['check'])
		return setDieukien(tempArray)
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
                            onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="col-lg-8-detalis"
                        
            >
                <Form.Item
                    name="maVoucher"
                    label="Mã Voucher"
                    className="form__row"
                >
                <Input  placeholder="Nhập Mã Voucher ('MV...')..." defaultValue="AAAAAAAAA" className="form__input" disabled />
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
                    {/* <Select>
                                {DiaChi.map((val)=>{
                                    return<Select.Option key={val.So} value={val.MaDiaChi}>{val.So}</Select.Option> 
                                })}
                                
                            </Select> */}
                </Form.Item>
                {/* ( dieukien===''&&ttdieukien===true)||( dieukien===null&&ttdieukien===true)||( dieukien_1===''&&ttdieukien_1===true)||( dieukien_1===null&&ttdieukien_1===true) */}
                <Form.Item
                    
                    label="dieu kien"
                    rules={[
                        { required:true,message:"S"}, 
                        {
                            validator(_,value) {
                              if ((dieukien[0]['check']===true&&dieukien[0]['input']==='')||((dieukien[1]['check']===true&&dieukien[1]['input']==='')))
                              {
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              }
                                else
                              return Promise.resolve();
                            },
                        }
                                    
                    ]}
                    className="form__row"
                    // style={{width:'120px'}}
                >
                            <Form.Item name={['dkien',0]}
                                rules={[
                                    {
                                        validator(_,value) {
                                          if ((dieukien[0]['check']===true&&dieukien[0]['input']===''))
                                          {
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                          }
                                            else
                                          return Promise.resolve();
                                        },
                                    } 
                                ]}
                            >
                                <Space>
                                    <Form.Item name= {['dkien',0,'check']}>
                                        <Checkbox defaultValue={"AAAAA"} onClick={(e)=>onChange("check",0,e)}>AAAAAAAAAAAAAAAAAA</Checkbox>  
                                    </Form.Item>
                                    <Form.Item name={['dkien',0,'input']}>
                                        <Input style={{width:100},{justifySelf:'center'}} onChange={(e)=>onChange("input",0,e)} disabled={!dieukien[0]['check']} ></Input>  
                                    </Form.Item>
                                </Space>
                            </Form.Item>
                     
                        
                            <Form.Item name={['dkien',1]}
                                rules={[
                                    {
                                        validator(_,value) {
                                          if ((dieukien[1]['check']===true&&dieukien[1]['input']===''))
                                          {
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                          }
                                            else
                                          return Promise.resolve();
                                        },
                                    } 
                                ]}
                            >
                                <Space>
                                    <Form.Item name= {['dkien',1,'check']}>
                                        <Checkbox  value="A" onClick={(e)=>onChange("check",1,e)}>AAAAAAAAAAAAAAAAAA</Checkbox>  
                                    </Form.Item>
                                    <Form.Item name={['dkien',1,'input']}>
                                        <Input style={{width:100},{justifySelf:'center'}} onChange={(e)=>onChange("input",1,e)} disabled={!dieukien[1]['check']} ></Input>  
                                    </Form.Item>
                                </Space>

                            </Form.Item>
                        
                        
                               
                        {/* <Space>
                            <Checkbox id="dieukien_1" value="B" onClick={()=>setttDieukien_1(!ttdieukien_1)}>AAAAAAAAAAAAAAAAAA</Checkbox>  
                            <Input type="text" id="dk_2" disabled={!(ttdieukien_1)} defaultValue={dieukien_1} style={{width:100},{justifySelf:'center'}} onChange={onChange_1}></Input>

                        </Space>               */}
                    
                    
                    
                    
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
                        { validator(_,value){
                            if(value===0||value==null||value=='')
                            {
                            return Promise.reject(new Error('Không được bỏ trống Trị Giá'));
                            }
                            return Promise.resolve();
                            
                        }},
                        
                    ]}
                    label="Giá"
                    className="form__row"
             
                    
                >
                   <CurrencyInput id="id_input_1" className="form__input" suffix=" VNĐ"  onChange={onChangeGia}/><p style={{display:'none'}}>;</p>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    label="Phần Trăm Giá"
                    className="form__row"

                    
                    rules={[
                        { validator(_,value){
                            if(value===0||value==null||value=='')
                            {
                            return Promise.reject(new Error('Không được bỏ trống Giá'));
                            }
                            
                            if(value>=90||value<=10)
                            {
                                return Promise.reject(new Error('Vượt quá giới hạn cho phép'))
                            }
                            else
                                new Error('Không được bỏ trống Giá')
                        },required:true},
                        
                    ]}
                >
                    <CurrencyInput id="id_input" className="form__input" suffix=" %"  onChange={onChangeTriGia}/><p style={{display:'none'}}>;</p>
                </Form.Item>
                <Form.Item
                    name="ngaybd"
                    
                    rules={[
                        { required: true, message: 'Không được bỏ trống khoảng thời gian hiệu lực' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if(getFieldValue('ngaykt') != null)
                                {
                                    if (!value || getFieldValue('ngaykt') >= value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                }
                                return Promise.resolve();
                            },
                          }),
                    ]}
                    label="Ngày bắt đầu"
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if(getFieldValue('ngaybd') != null)
                                {
                                    if (!value || getFieldValue('ngaybd') <= value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                }
                                return Promise.resolve();
                            },
                          }),
                            
                         
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
