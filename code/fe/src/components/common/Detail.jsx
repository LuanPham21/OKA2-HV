import React, { useEffect, useState } from 'react'
import '../css/Detail.css'
import { EnvironmentOutlined } from '@ant-design/icons';
import Axios from 'axios';
var CurrencyFormat = require('react-currency-format');

export default function Detail() {
    const [listV,setV]=useState([])
    const [listdk,setdk]=useState([])

    
    useEffect(()=>{
        Axios.get("http://localhost:9000/detailvoucher").then((respone)=>{
        console.log(respone.data);
        setV(respone.data);
    })
        Axios.get("http://localhost:9000/detailvoucher_dk").then((respone)=>{
        console.log(respone.data);
        setdk(respone.data);
        
    })
    },[])
    const demo = listV[0];
    console.log(demo)
    // console.log(Object.values(demo));

    
    return (
        <div className="square_all_1">
             <div className="square_header">
 
                {listV.map((val)=>{
                    return <h3 className="title">{val.TenVoucher}</h3>                            
                })}
                {listV.map((val)=>{
                    return <p className="desc">{val.MaLoaiVoucher}</p>                       
                })}
                {listV.map((val)=>{
                    return <p className="location"><EnvironmentOutlined/>{val.DiaDiem} </p>               
                })}
                 <hr/>
             </div>
          
             <div className="square_body" >
                    <div className="body_hinh" >
                         {listV.map((val)=>{
                        return <p className="location"><img src={val.Hinh} alt="hinh"/></p>               
                         })}
                    </div>
                    <div className="body_dieukien" style={{display:'flex',flexDirection:'column',width:'100%'}}>
                        <h5 style={{margin:'10px'}} >Điều kiện</h5>
                        <ul className="dieukien" style={{alignSelf:'flex-start',minHeight:'55%'}}>
                            {listdk.map((val)=>{
                                return <li >{val.TenDieuKien}</li>               
                            })}
                        </ul>
                        <div className="body_price" style={{alignSelf:'flex-end',marginRight:'10px',minHeight:'20%',marginBottom:'0px'}}>
                             {listV.map((val)=>{
                                return <p className="price"><CurrencyFormat value={val.DonGia} displayType={'text'} thousandSeparator={true} /> VNĐ </p>               
                            })}
                        <form action="/payment">
                            <button type="submit" className="btn-mua">Mua</button>
                        </form>
                        </div>  
                    </div>
                          
             </div>
               
          </div>
    )
}  