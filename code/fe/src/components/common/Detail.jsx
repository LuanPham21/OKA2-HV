import '../css/Detail.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import DiaDiem from './Checkbox';
import dateFormat from 'dateformat'
import {useHistory} from 'react-router-dom'
var CurrencyFormat = require('react-currency-format');
export default function Detail(props) {
    const {id}=props.match.params;
    const [Detail,setDetail]=useState('');
    const [DiaChi,setDiaChi]=useState([]);
    const [DieuKien,setDieuKien]=useState([])
    useEffect(()=>{
        Axios.post("http://localhost:9000/customer/details",{ma:id}).then((respone)=>{
            setDetail(respone.data) 
        })
        Axios.post("http://localhost:9000/customer/details_dc",{ma:id}).then((respone)=>{
            setDiaChi(respone.data) 
        })  
        Axios.post("http://localhost:9000/customer/details_dk",{ma:id}).then((respone)=>{
                
                if(!respone.data.length)
                {
                    setDieuKien([...DieuKien,"Không có điều kiện cho Voucher này "])
                }
                else
                {
                    setDieuKien(respone.data)
                }
            })
    },[])    
    const history=useHistory();
    const redirect = () => {
        history.push(`/payment/${id}`)
      }
    console.log(DieuKien)

    return (
        
        <div style={{marginTop:'30px'}}>
            <div className="container"style={{width:'1000px'}}> 
                <div className="row detail-all">
                    <div className="col-lg-3 detail-img">
                        <div class="col--detail--1">
                        <img src={Detail.Hinh} width="255px" height="105px"/>    
                        </div>
                    </div>
                    <div className="col-lg-9">
                        
                        <p className="detail-ten">{Detail.TenVoucher} giảm {Detail.GiaTriSuDung}%</p>
                        <p className="detail-tloai">{Detail.MaLoaiVoucher}</p>
                        <p className="detail-dieukien">Hạn sử dụng:        {dateFormat(Detail.NgayBatDau, 'dd/mm/yyyy')} - {dateFormat(Detail.NgayKetThuc, 'dd/mm/yyyy')}</p>
                        <p className="detail-gia">Giá: <CurrencyFormat value={Detail.GiaTien} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                        <Form.Item
                            className="form__row"
                            label="Điều kiện:"
                        >
                            {DieuKien.map((val)=>{
                                if(DieuKien[0]=="Không có điều kiện cho Voucher này ")
                                {
                                    return <p>Không tồn tại điều kiện cho vouhcer này</p>
                                    
                                }
                                else
                                {
                                    if(val.LoaiDieuKien=='A ')
                                    {
                                        return <p  style={{font:'14px'},{marginTop:'5px'}} >Giá tối thiểu cần đạt khi đặt phòng: <CurrencyFormat value={val.GiaTri} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                                    }
                                    else
                                    {
                                        return <p  style={{font:'14px'},{marginTop:'5px'}} >Số đêm tối thiểu cần đặt: {val.GiaTri} đêm </p>
                                    }
                                }
                                
                                    
                               
                                
                            })}
                        </Form.Item>
                        <Form.Item
                            className="form__row"
                            label="Địa điểm áp dụng:"
                        >
                            {DiaChi.map((val)=>{
                                return <p  style={{font:'14px'},{marginTop:'5px'}} >Số {val.So}, Đường {val.TenDuong} Quận {val.TenQuan} Thành phố {val.TenTP}</p>
                            })}
                        </Form.Item>
                        <button type="button" className="detail-btn-mua" onClick={redirect}>Mua Ngay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
