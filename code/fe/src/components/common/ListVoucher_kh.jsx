import '../css/Detail.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Voucher from './Voucher';
import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import DiaDiem from './Checkbox';
import dateFormat from 'dateformat'
import {useHistory} from 'react-router-dom'
var CurrencyFormat = require('react-currency-format');
export default function ListV(props) {

    const [Detail,setDetail]=useState([]);
    
    const ma = sessionStorage.getItem('maUser');
    useEffect(()=>{
        Axios.post("http://localhost:9000/customer/list_kh",{ma:ma}).then((respone)=>{
            setDetail(respone.data) 
            console.log(Detail)
        })
    },[])    
    const history=useHistory();
    const redirect = () => {
        history.push(`/payment/${ma}`)
      }
    console.log(DieuKien)

    return (
        
        <div>
            
             {Detail.map((val)=>{
                 return <Voucher key={val.MaVoucher} ma={val.MaVoucher} mamua={val.MaMua}  hinh ={val.Hinh} title ={val.TenVoucher} sdate={val.NgayBatDau} edate={val.NgayKetThuc} price={val.GiaTien} ></Voucher>
             })} 
        </div>
    )
}