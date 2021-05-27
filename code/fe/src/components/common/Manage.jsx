import React,{useEffect,useState} from 'react';
import '../css/Manage.css';
import Axios from 'axios'
import Part from "../common/Part"
// import dateFormat from 'dateformat';
import {SearchOutlined,PlusOutlined   } from '@ant-design/icons'

export default function Manage() {

    const [list,setlist]=useState([]);
    const [search, setSearch]=useState('');

    useEffect(()=>{
        Axios.get("http://localhost:9000/partner/list").then((respone)=>{
            setlist(respone.data)
        })
    },[])
    const onChange=(e)=>{
        setSearch(e.target.value)
    }

    const onClick=(e)=>{
        Axios.post("http://localhost:9000/partner/search",{ma:search}).then((respone)=>{
            console.log(search)
            setlist(respone.data)
        })
    }

    return (
        <div>
            <div className="input-group" style={{marginTop:'20px'}}>
                <input type="text" placeholder="Nhập từ khóa ..." className="input--search" value={search} onChange={onChange}/>
                <button type='button' className="btn btn-primary btn--search" onClick={onClick}><SearchOutlined style={{fontSize:'20px'}}/></button>
                {/* <button type='button' className="btn btn-primary btn--arrange">Sắp Xếp</button> */}
                <form action="/add">
                    <button type='submit' className="btn btn-primary btn--add"  ><PlusOutlined style={{fontSize:'20px'}} /></button>
                </form>
                
            </div>
            <div style={{margin:'0 50px '}}>
            <table className="table  table-manage " style={{border:'0px'}}>
                <thead className="table-primary">
                    <tr>
                    <th className="text-center" scope="col">Hình</th>
                    <th className="text-center" scope="col">Tên Voucher</th>
                    <th className="text-center" scope="col">Giá Trị</th>
                    <th className="text-center" scope="col">Giá bán</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((val)=>{
                        return <Part key={val.MaVoucher} ma={val.MaVoucher} hinh={val.Hinh} ten={val.TenVoucher}  giatri={val.GiaTriSuDung} gia={val.GiaTien} tt={val.TrangThai}></Part>
                    })}
                    
                  
                </tbody>
            </table>
            </div>
        </div>
    )
}
