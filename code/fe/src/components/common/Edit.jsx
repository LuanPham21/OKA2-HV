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
import moment from 'moment';

export default function Edit(props) {
    const date = Date.now();
    let today= new Date(date);
    const {id}=props.match.params;
    const dateFormat = 'YYYY-MM-DD';

    const [form] = Form.useForm(); 
    const[voucher,setVoucher]=useState([])  
    const[maVoucher,setmaVoucher]=useState('')
    const[tenVoucher,settenVoucher]=useState('')
    const[loaiVoucher,setloaiVoucher]=useState('')
    const[soLuong,setsoLuong]=useState(0)
    const [dieukien,setDieukien]=useState([{check:false,input:''},{check:false,input:''}])
    
    const[gia,setGia]=useState(0)
    const[ptram,setpTram]=useState(0)
    const[ngaybatdau,setngaybd]=useState('')
    const[ngayketthuc,setngayketthuc]=useState(new Date())
    const[diaDiem_1,setdiaDiem_1]=useState([])
    
    const[dsloaiVoucher,setdsloaiVoucher]=useState([])
    const[dsDieuKien,setdsDieuKien]=useState([])
    const[dsDiaChi,setdsDiaChi]=useState([])
    const [diaDiem,setdiaDiem]=useState([])
    var key=[]
    var bd,kt,pt, partner;
    var temp=[]
    useEffect(()=>{
        Axios.post("http://localhost:9000/partner/pre_edit",{id:id}).then((respone)=>{
            settenVoucher(respone.data[0].TenVoucher)
            setsoLuong(respone.data[0].SoLuong)
            setGia(respone.data[0].GiaTien)
            setpTram(respone.data[0].GiaTriSuDung)
        
            // console.log(moment(respone.data[0].NgayBatDau))
            setngaybd(respone.data[0].NgayBatDau)
            setngayketthuc(respone.data[0].NgayKetThuc)
        })  
        Axios.post("http://localhost:9000/partner/pre_editdc",{id:id}).then((respone)=>{
            respone.data.forEach(element => {
                key.push(element.MaDiaChi)
            });
            
            setdiaDiem(key)
        })  

        Axios.post("http://localhost:9000/partner/pre_editdk",{id:id}).then((respone)=>{
            
            
            temp=[...respone.data]
            setDieukien(respone.data)
            
            
            
        })  
        Axios.get("http://localhost:9000/partner/list_dk").then((respone)=>{
            setdsDieuKien(respone.data)
            
        })
        Axios.get("http://localhost:9000/partner/list_dc").then((respone)=>{
            setdsDiaChi(respone.data)
            
        })
        Axios.get("http://localhost:9000/partner/list_dc1").then((respone)=>{
            
            
        })            
        
        
        
    },[])
    
    const CheckboxGroup = Checkbox.Group
    
   
    


    const onChangeDiaDiem=(list)=> {
    
        setdiaDiem(list)
        console.log(diaDiem)
      }
      
    const onChangeGia = (e) =>{
        const value = Number(e.target.value);
        if(!isNaN(value))
        {
            console.log(gia)
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
        
          
        
            setsoLuong((event.target.value))
            console.log(soLuong)
          
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
        Axios.post("http://localhost:9000/partner/edit",{ma:id,ten:tenVoucher,loai:values.select,sl:soLuong,dk:dieukien,dd:diaDiem,gia:gia,ptram:ptram,bd:values.ngaybd,kt:values.ngaykt,hinh:image,partner:partner
    }).then((respone)=>{
        
    })
    
   history.push("/manage")
        
    
      };
    return (
        <div style={{marginTop:'30px'}}>
            <h1 style={{textAlign:'center',fontWeight:'bold',textTransform:'uppercase'}}>S???a Voucher</h1>
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
                        
                        {  validator(value){
                            if(tenVoucher=="")
                            {
                                return Promise.reject(new Error('Kh??ng ???????c ????? tr???ng'));
                            }
                            else
                            
                                return Promise.resolve()
                            
                        }},
                    ]}
                    label="T??n Voucher"
                    className="form__row"
                    valuePropName={0}
                >
                    <Input  placeholder="Nh???p T??n Voucher ..." value={tenVoucher} onChange={onChangeTen} />
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
                    valuePropName={0}
                >
                    <Input type="number" value={soLuong} className="form__input" placeholder="S??? L?????ng...."  onChange={onChangeSL}/>

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
                                    
                                        <Checkbox value="A" checked={dieukien[0].check} onClick={(e)=>onChangeDk("check",0,e)}>S??? ????m t???i thi???u</Checkbox>  
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}} value={dieukien[0].input}  onChange={(e)=>onChangeDk("input",0,e)} disabled={!dieukien[0]['check']} />
                                    
                                </Space>
                                <Space>
                                    
                                        <Checkbox  value="A" checked={dieukien[1].check} onClick={(e)=>onChangeDk("check",1,e)}>Gi?? tr??? ????n ?????t t???i thi???u</Checkbox>  
                                    
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}} value={dieukien[1].input} onChange={(e)=>onChangeDk("input",1,e)} disabled={!dieukien[1]['check']} />

                                        
                                   
                                </Space>
                            </Space>
                </Form.Item>


                <Form.Item
                    name="diadiem"
                    rules={[
                        { validator(){
                            if(diaDiem=='')
                            {
                                return Promise.reject(new Error('Vui l??ng ch???n ??t nh???t 1 ????n v??? ??p d???ng voucher'));
                            }
                            else
                            {
                                return Promise.resolve()
                            }
                        }}
                    ]}
                    label="?????a ??i???m:"
                    className="form__row"
                    valuePropName=""
                >
                    
                    
                    <CheckboxGroup onChange={onChangeDiaDiem}  value={diaDiem}>
                        <Space direction="vertical">
                            {dsDiaChi.map((val)=>{
                                return <Checkbox key={val.MaDiaChi} value={val.MaDiaChi} >S??? {val.So}, ???????ng {val.TenDuong} Qu???n {val.TenQuan} Th??nh ph??? {val.TenTP}</Checkbox>
                            })}
                        </Space>
                       
                    </CheckboxGroup>
                
                </Form.Item>
                
                

                <Form.Item
                    name="gia"
                    rules={[
                        ({ getFieldValue })=>(
                            { validator(_,value=''){
                                if(gia===0||gia===null||gia==='')
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
                    valuePropName={0}
                    
                >
                   <Input  type="number" className="form__input"   onChange={onChangeGia} value={gia}/>
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
                    valuePropName={0}
                >
                    
                    <Input type="number" className="form__input"  onChange={onChangeTriGia} value={ptram}/>
                </Form.Item>
               
                
                <Form.Item className="form-btn-login">
                <Button type="primary" htmlType="submit" className="btn--them text-right btn btn-primary" >
                S???a
                </Button>
                </Form.Item>
            </Form>
     
                    </div>
                </div>
            </div>
        </div>
    )
}
