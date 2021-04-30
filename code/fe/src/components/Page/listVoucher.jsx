import React, { useEffect, useState } from 'react'
import Search from '../common/Search';
import Slider from '../common/Slider';
import  ManagerVoucher from '../common/ManageVoucher';
import Axios from "axios";

export default function ListVoucher() {
    const [listtt,setlistt]=useState([]);
    // const[MaVoucher,SetMaVoucher]=useState('');

    useEffect(()=>{
        Axios.get("http://localhost:9000/listvoucher").then((respone)=>{
            setlistt(respone.data)
        })
    },[])
    return (
        <div>
            <Slider/>
             <Search/>
             {listtt.map((val)=>{
                 return <ManagerVoucher key={val.MaVoucher} ma={val.MaVoucher} hinh ={val.Hinh} title ={val.TenVoucher} adress={val.DiaDiem} price={val.GiaTri}></ManagerVoucher>
             })}           
        </div>
    )
}
