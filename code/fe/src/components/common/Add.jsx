import React ,{useState,useEffect}from 'react';
import '../css/ChiTiet.css'
import { Form, Input, Button,Select, DatePicker,Checkbox, InputNumber, Space} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import DiaDiem from './Checkbox';
import {getCurrentDate} from './utils'
import Axios from 'axios'
import { Redirect } from 'react-router';

export default function Add() {

    const date = Date.now();
    let today= new Date(date);
    

    const [form] = Form.useForm();   
    const[maVoucher,setmaVoucher]=useState('')
    const[tenVoucher,settenVoucher]=useState('')
    const[loaiVoucher,setloaiVoucher]=useState('')
    const[soLuong,setsoLuong]=useState(0)
    const [dieukien,setDieukien]=useState([{check:false,input:''},{check:false,input:''}])
    const[diaDiem,setdiaDiem]=useState([])
    const[gia,setGia]=useState(0)
    const[ptram,setpTram]=useState(0)
    const[ngaybatdau,setngaybd]=useState('')
    const[ngayketthuc,setngayketthuc]=useState('')
    
   

    const[dsloaiVoucher,setdsloaiVoucher]=useState([])
    const[dsDieuKien,setdsDieuKien]=useState([])
    const[dsDiaChi,setdsDiaChi]=useState([])

    useEffect(()=>{
        Axios.get("http://localhost:9000/partner/list_loai").then((respone)=>{
            setdsloaiVoucher(respone.data) 
        })
        Axios.get("http://localhost:9000/partner/list_dk").then((respone)=>{
            setdsDieuKien(respone.data)
        })
        Axios.get("http://localhost:9000/partner/list_dc").then((respone)=>{
            setdsDiaChi(respone.data)
        })
        Axios.get("http://localhost:9000/partner/ma").then((respone)=>{
            setmaVoucher("MV"+respone.data[0].Dem)
            console.log(maVoucher)
        })
    },[])
    const onChangeDiaDiem=(checkedValues)=> {
        console.log('checked = ', checkedValues);
        setdiaDiem(checkedValues)
      }

    const onChangeGia = (e) =>{
        const value = Number(e.target.value);
        if(!isNaN(value))
        {
            setGia(value);
        }
        
        
    };
    

    const [textTriGIa,setTextTriGia]=useState(0);
    const onChangeTriGia =(e)=>{
        if(!isNaN(Number(e.target.value)))
          {
              setpTram(e.target.value)      
            }
        }



    const onChangeBd=(e)=>{
        
        setngaybd(e.target.value)

    }
    
    const onChangeKt=(e)=>{
        setngayketthuc(e.target.value)
    }
    
      const onFinishFailed = (errorInfo) => {
          
        console.log('Failed:', errorInfo);
      };
    
    const [image,setImage]=useState('/img/Voucher.png')
    const onImageChange=(e)=>{
        if(e.target.files && e.target.files[0]){    
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img))
            
        }
    }

    
    
    const onChangeLoai=(e)=>{
        console.log(e.target.value)
        setloaiVoucher(e.target.value)
    }
    const onChangeSL=(event)=>{
        
          if(!isNaN(Number(event.target.value)))
          {
              console.log(isNaN(Number(event.target.value)))
            setsoLuong((event.target.value))
          }
    }
    const onChangeDk = (name,index,e)=>{
		let tempArray = [...dieukien];
		if(name==='check')
        {
			tempArray[index] = {...tempArray[index],check:!tempArray[index]['check']}
        }
		else
        {
            tempArray[index] = {...tempArray[index],input:e.target.value}
        }
		return setDieukien(tempArray)
	}

    const onChangeTen=(e)=>{
        settenVoucher(e.target.value)
    }

    

    const {RangePicker} = DatePicker;
    const onFinish = (values) => {
        Axios.post("http://localhost:9000/partner/add",{ma:maVoucher,ten:tenVoucher,loai:values.select,sl:soLuong,dk:dieukien,dd:diaDiem,gia:gia,ptram:ptram,bd:values.ngaybd,kt:values.ngaykt,hinh:image
    })
        return <Redirect to="/manage" />
    
      };
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
                {/* <Form.Item
                    name="maVoucher"
                    label="Mã Voucher"
                    className="form__row"
                >
                <Input  placeholder="Nhập Mã Voucher ('MV...')..." defaultValue="AAAAAAAAA"  className="form__input" disabled /> */}
                {/* </Form.Item> */}
                <Form.Item
                    name="tenVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống tên voucher' },
                    ]}
                    label="Tên Voucher"
                    className="form__row"
                >
                    <Input  placeholder="Nhập Tên Voucher ..." onChange={onChangeTen} />
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
                        {dsloaiVoucher.map((val)=>{
                            
                            return<Select.Option  value={val.MaLoaiVoucher}>{val.TenLoai}</Select.Option> 
                        })}           
                   </Select>
                </Form.Item>
                {/* ( dieukien===''&&ttdieukien===true)||( dieukien===null&&ttdieukien===true)||( dieukien_1===''&&ttdieukien_1===true)||( dieukien_1===null&&ttdieukien_1===true) */}
                
                <Form.Item
                    name="soLuong"
                    rules={[
                        {  validator(value){
                            if(soLuong<=0||soLuong=="")
                            {
                                return Promise.reject(new Error('Không được để trống và phải đạt giá trị tối thiểu'));
                            }
                            else
                            
                                return Promise.resolve()
                            
                        }},
                    ]}  
                    label="Số lượng"
                    className="form__row"
                >
                    <Input type="number"  className="form__input" placeholder="Số Lượng...."  onChange={onChangeSL}/>

                </Form.Item>
                <Form.Item
                name="dieukien"
                    label="Điều Kiện:"
                    rules={[
                         
                        {
                            validator(_,value) {
                              if ((dieukien[0]['check']===true&&dieukien[0]['input']==='')||(dieukien[1]['check']===true&&dieukien[1]['input']===''))
                              {
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              }
                            //    else if()
                            //     {

                            //     }
                            else
                              return Promise.resolve();
                            },
                        }
                                    
                    ]}
                    className="form__row"
                    // style={{width:'120px'}}
                >
                            <Space direction="vertical">
                                <Space>
                                    
                                        <Checkbox value="A" onClick={(e)=>onChangeDk("check",0,e)}>Số đêm tối thiểu</Checkbox>  
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}}  onChange={(e)=>onChangeDk("input",0,e)} disabled={!dieukien[0]['check']} />
                                    
                                </Space>
                                <Space>
                                    
                                        <Checkbox  value="A" onClick={(e)=>onChangeDk("check",1,e)}>Giá trị đơn đặt tối thiểu</Checkbox>  
                                    
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}}  onChange={(e)=>onChangeDk("input",1,e)} disabled={!dieukien[1]['check']} />

                                        
                                   
                                </Space>
                            </Space>
                        
                        
                               
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
                    
                    <Checkbox.Group onChange={onChangeDiaDiem}>
                        <Space direction="vertical">
                            {dsDiaChi.map((val)=>{
                                return <Checkbox key={val.MaDiaChi}value={val.MaDiaChi}>Số {val.So}, Đường {val.TenDuong} Quận {val.TenQuan} Thành phố {val.TenTP}</Checkbox>
                            })}
                        </Space>
                    </Checkbox.Group>
                    
                </Form.Item>
                <Form.Item
                    name="gia"
                    rules={[
                        ({ getFieldValue })=>(
                            { validator(_,value=''){
                                if(value===0||value===null||value==='')
                                {
                                    return Promise.reject(new Error('Không được bỏ trống Trị Giá'));
                                }
                                else
                                    return Promise.resolve();
                                
                            }}
                        ),
                        
                        
                        
                    ]}
                    label="Giá (VNĐ)"
                    className="form__row"
             
                    
                >
                   <Input  type="number" className="form__input"   onChange={onChangeGia}/>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    label="Phần Trăm Giá (%)"
                    className="form__row"

                    
                    rules={[
                        
                        { validator(_,value){
                            if(ptram===0||ptram=='')
                            {
                                return Promise.reject(new Error('Không được bỏ trống giá trị %'))
                            }
                            else if(ptram<10)
                            {
                                return Promise.reject(new Error('Chưa đạt được mức tối thiểu'))
                            }
                            else if(ptram>90)
                            {
                                return Promise.reject(new Error('Vượt quá hạn mức có thể'))
                            }
                            else
                                return Promise.resolve();
                        }},
                        
                    ]}
                >
                    
                    <Input type="number" className="form__input"  onChange={onChangeTriGia}/>
                </Form.Item>
               
                <Form.Item
                    name="ngaybd"
                    
                    rules={[
                        { required: true, message: 'Không được bỏ trống khoảng thời gian hiệu lực' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if(getFieldValue('ngaykt') != null)
                                {
                                    if (!value || getFieldValue('ngaykt')<=value) {
                                        return Promise.reject(new Error('Ngày bắt đầu phải <= ngày kết thúc'));
                                      }
                                    
                                    else
                                        return Promise.resolve();

                    
                                }
                                if(value<=today) {
                                    return Promise.reject(new Error('Ngày bắt đầu có hiệu lực hiệu lực phải >= ngày hôm nay'));
                                }
                                else
                                return Promise.resolve();
                            },
                            
                          }),
                          
                          
                    ]
                    
                }
                    label="Ngày bắt đầu"
                    className="form__row"
                >
                    {/* <RangePicker /> */}
                    {/* <RangePicker renderExtraFooter={() => 'extra footer'} className='form__input'   /> */}
                    <DatePicker placeholder="Nhập Ngày Kết Thúc..." className="form__input" onClick={onChangeBd}/>
                </Form.Item>
                <Form.Item
                    name="ngaykt"
                    rules={[
                        { required: true, message: 'Không được bỏ trống ngày kết thúc' },    
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if(getFieldValue('ngaybd') != null)
                                {
                                    if (!value || getFieldValue('ngaybd') >=value) {
                                        return Promise.reject(new Error('Ngày kết thúc phải >= ngày bắt đầu'));
                                      }
                                    else if(value<=today) {
                                        return Promise.reject(new Error('Ngày kết thúc hiệu lực phải >= ngày hôm nay'));
                                    }
                                    else
                                        return Promise.resolve();
                                      
                                }
                                return Promise.resolve();
                            },
                          }),
                            
                         
                    ]}
                    label="Ngày Kết Thúc"
                    className="form__row"
                >
                   <DatePicker placeholder="Nhập Ngày Kết Thúc..." className="form__input" onClick={onChangeKt}/>
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
