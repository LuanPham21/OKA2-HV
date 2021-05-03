import React, { useEffect, useState } from 'react'
import Search from '../common/Search';
import Slider from '../common/Slider';
import  ManagerVoucher from '../common/ManageVoucher';
import Detail from '../common/Detail';
import Axios from "axios";

export default function ListVoucher() {
    const [listtt,setlistt]=useState([]);
    // const[MaVoucher,SetMaVoucher]=useState('');
   
    useEffect(()=>{
        Axios.get("http://localhost:9000/customer/list").then((respone)=>{
            setlistt(respone.data)
        })
    },[])   
    var data=Array.from(listtt);
    console.log(listtt)
    return (
        <div>
            <Slider/>
             <Search/>
                       
             {data.map((val)=>{
                 return <ManagerVoucher key={val.MaVoucher} ma={val.MaVoucher}  hinh ={val.Hinh} title ={val.TenVoucher} sdate={val.NgayBatDau} edate={val.NgayKetThuc} price={val.GiaTien} ></ManagerVoucher>
             })} 
        </div>
    )
}
