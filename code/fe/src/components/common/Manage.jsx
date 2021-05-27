import React,{useEffect,useState} from 'react';
import '../css/Manage.css';
import Axios from 'axios'
import Part from "../common/Part"
// import dateFormat from 'dateformat';
import {SearchOutlined,PlusOutlined   } from '@ant-design/icons'

export default function Manage() {

    const [list,setlist]=useState([]);
    

    useEffect(()=>{
        Axios.get("http://localhost:9000/partner/list").then((respone)=>{
            setlist(respone.data)
        })
    },[])


    return (
        <div>
            <div className="input-group" style={{marginTop:'20px'}}>
                <input type="text" placeholder="Nhập từ khóa ..." className="input--search"/>
                <button type='button' className="btn btn-primary btn--search"><SearchOutlined style={{fontSize:'20px'}}/></button>
                {/* <button type='button' className="btn btn-primary btn--arrange">Sắp Xếp</button> */}
                <form action="/add">
                    <button type='submit' className="btn btn-primary btn--add"  ><PlusOutlined style={{fontSize:'20px'}} /></button>
                </form>
                
            </div>
            <div style={{margin:'0 50px '}}>
            <table className="table  table-manage " style={{border:'0px',width:'80%',left:'50%',display:'inline-block',transform:'translateX(16%)'}}>
                <thead className="table-primary">
                    <tr>
                    <th  scope="col" style={{width:'10%'}}>Mã Voucher</th>
                    <th  scope="col"style={{width:'35%'}}>Tên Voucher</th>
                    <th  scope="col"style={{width:'10%'}}>Số Lượng</th>

                    <th  scope="col"style={{width:'8%'}}>Giá Trị</th>
                    <th  scope="col"style={{width:'15%'}}>Giá bán</th>
                    <th  scope="col"style={{width:'15%'}}></th>

                    </tr>
                </thead>
                <tbody>
                    {list.map((val)=>{
                        return <Part key={val.MaVoucher} ma={val.MaVoucher} hinh={val.Hinh} ten={val.TenVoucher}  giatri={val.GiaTriSuDung} gia={val.GiaTien} tt={val.TrangThai} ></Part>
                    })}
                    
                  
                </tbody>
            </table>
            </div>
        </div>
    )
}
