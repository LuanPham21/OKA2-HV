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
import {useHistory} from 'react-router-dom'

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
    const[diaDiem_1,setdiaDiem_1]=useState([])
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
      
        })
    },[])
    var partner
    const onChangeDiaDiem=(checkedValues)=> {
      
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

    
    

    const onChangeSL=(event)=>{
        
          if(!isNaN(Number(event.target.value)))
          {
        
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

    const history=useHistory();


    const {RangePicker} = DatePicker;
    const onFinish = (values) => {
        Axios.post("http://localhost:9000/partner/add",{ma:maVoucher,ten:tenVoucher,loai:values.select,sl:soLuong,dk:dieukien,dd:diaDiem,gia:gia,ptram:ptram,bd:values.ngaybd,kt:values.ngaykt,hinh:image,partner:partner
        }).then((respone)=>{
            
        })
        history.push("/manage")
        
    
      };
    return (
        <div style={{marginTop:'30px'}}>
            <h1 style={{textAlign:'center',fontWeight:'bold',textTransform:'uppercase'}}>Th??m Voucher</h1>
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
                    name="tenVoucher"
                    rules={[
                        { required: true, message: 'Kh??ng ???????c b??? tr???ng t??n voucher' },
                    ]}
                    label="T??n Voucher"
                    className="form__row"
                >
                    <Input  placeholder="Nh???p T??n Voucher ..." onChange={onChangeTen} />
                </Form.Item>
                
                
                <Form.Item
                    name="soLuong"
                    rules={[
                        {  validator(value){
                            if(soLuong<=0||soLuong=="")
                            {
                                return Promise.reject(new Error('Kh??ng ???????c ????? tr???ng v?? ph???i ?????t gi?? tr??? t???i thi???u'));
                            }
                            else
                            
                                return Promise.resolve()
                            
                        }},
                    ]}  
                    label="S??? l?????ng"
                    className="form__row"
                >
                    <Input type="number"  className="form__input" placeholder="S??? L?????ng...."  onChange={onChangeSL}/>

                </Form.Item>
                <Form.Item
                name="dieukien"
                    label="??i???u Ki???n:"
                    rules={[
                         
                        {
                            validator(_,value) {
                              if ((dieukien[0]['check']===true&&dieukien[0]['input']==='')||(dieukien[1]['check']===true&&dieukien[1]['input']===''))
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
                            <Space direction="vertical">
                                <Space>
                                    
                                        <Checkbox value="A" onClick={(e)=>onChangeDk("check",0,e)}>S??? ????m t???i thi???u</Checkbox>  
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}}  onChange={(e)=>onChangeDk("input",0,e)} disabled={!dieukien[0]['check']} />
                                    
                                </Space>
                                <Space>
                                    
                                        <Checkbox  value="A" onClick={(e)=>onChangeDk("check",1,e)}>Gi?? tr??? ????n ?????t t???i thi???u</Checkbox>  
                                    
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}}  onChange={(e)=>onChangeDk("input",1,e)} disabled={!dieukien[1]['check']} />

                                        
                                   
                                </Space>
                            </Space>
                </Form.Item>


                <Form.Item
                    name="diadiem"
                        rules={[
                            { required: true, message: 'Ch???n ??t nh???t 1 ?????a ??i???m ??p d???ng' },
                        ]}
                    label="?????a ??i???m:"
                    className="form__row"
                    valuePropName={["DC00001   ","DC00002   "]}
                >
                    
                    <Checkbox.Group onChange={onChangeDiaDiem} >
                        <Space direction="vertical">
                            {dsDiaChi.map((val)=>{
                                // var checked= false;
                                // {dsDiaChi.map((a)=>{
                                //     if(a.MaDiaChi==val.MaDiaChi)
                                //     {
                                //        checked=true;
                                //     }
                                // })}
                                // console.log(checked)
                                
                                return <Checkbox key={val.MaDiaChi} value={val.MaDiaChi} >S??? {val.So}, ???????ng {val.TenDuong} Qu???n {val.TenQuan} Th??nh ph??? {val.TenTP}</Checkbox>
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
                                    return Promise.reject(new Error('Kh??ng ???????c b??? tr???ng Tr??? Gi??'));
                                }
                                else
                                    return Promise.resolve();
                                
                            }}
                        ),
                        
                        
                        
                    ]}
                    label="Gi?? (VN??)"
                    className="form__row"
             
                    
                >
                   <Input  type="number" className="form__input"   onChange={onChangeGia}/>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    label="Ph???n Tr??m Gi?? (%)"
                    className="form__row"

                    
                    rules={[
                        
                        { validator(_,value){
                            if(ptram===0||ptram=='')
                            {
                                return Promise.reject(new Error('Kh??ng ???????c b??? tr???ng gi?? tr??? %'))
                            }
                            else if(ptram<10)
                            {
                                return Promise.reject(new Error('Ch??a ?????t ???????c m???c t???i thi???u'))
                            }
                            else if(ptram>90)
                            {
                                return Promise.reject(new Error('V?????t qu?? h???n m???c c?? th???'))
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
                        { required: true, message: 'Kh??ng ???????c b??? tr???ng kho???ng th???i gian hi???u l???c' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if(getFieldValue('ngaykt') != null)
                                {
                                    if (!value || getFieldValue('ngaykt')<=value) {
                                        return Promise.reject(new Error('Ng??y b???t ?????u ph???i <= ng??y k???t th??c'));
                                      }
                                    
                                    else
                                        return Promise.resolve();

                    
                                }
                                if(value<=today) {
                                    return Promise.reject(new Error('Ng??y b???t ?????u c?? hi???u l???c hi???u l???c ph???i >= ng??y h??m nay'));
                                }
                                else
                                {
                                    getFieldValue('ngaybd')
                                    return Promise.resolve();
                                }
                            },
                            
                          }),
                          
                          
                    ]
                    
                }
                    label="Ng??y b???t ?????u"
                    className="form__row"
                >
                   
                    <DatePicker placeholder="Nh???p Ng??y K???t Th??c..." className="form__input" onClick={onChangeBd}/>
                </Form.Item>
                <Form.Item
                    name="ngaykt"
                    rules={[
                        { required: true, message: 'Kh??ng ???????c b??? tr???ng ng??y k???t th??c' },    
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                               
                                if(getFieldValue('ngaybd') != null)
                                {
                                    if (!value || getFieldValue('ngaybd') >=value) {
                                        return Promise.reject(new Error('Ng??y k???t th??c ph???i >= ng??y b???t ?????u'));
                                      }
                                    else if(value<=today) {
                                        return Promise.reject(new Error('Ng??y k???t th??c hi???u l???c ph???i >= ng??y h??m nay'));
                                    }
                                    else
                                    {
                                       
                                        return Promise.resolve();
                                    }
                                      
                                }
                                return Promise.resolve();
                            },
                          }),
                            
                         
                    ]}
                    label="Ng??y K???t Th??c"
                    className="form__row"
                >
                   <DatePicker placeholder="Nh???p Ng??y K???t Th??c..." className="form__input" onClick={onChangeKt}/>
                </Form.Item>
                
                <Form.Item className="form-btn-login">
                <Button type="primary" htmlType="submit" className="btn--them text-right btn btn-primary" >
                Th??m
                </Button>
                </Form.Item>
            </Form>
     
                    </div>
                </div>
            </div>
        </div>
    )
}
