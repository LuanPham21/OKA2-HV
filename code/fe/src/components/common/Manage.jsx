import React,{useEffect,useState} from 'react';
import '../css/Manage.css';
import Axios from 'axios'
import Part from "../common/Part"
// import dateFormat from 'dateformat';
import {SearchOutlined,PlusOutlined   } from '@ant-design/icons'

export default function Manage() {

    const [list,setlist]=useState([]);
    

    useEffect(()=>{
        Axios.get("http://localhost:9000/manage").then((respone)=>{
            setlist(respone.data)
        })
    })
    console.log(list)


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
            <table className="table  table-manage " style={{border:'0px'}}>
                <thead className="table-primary">
                    <tr>
                    <th className="text-center" scope="col">Id</th>
                    <th  className="text-center" scope="col">Hình</th>
                    <th className="text-center" scope="col">Loại Voucher</th>
                    <th className="text-center" scope="col">Tên Voucher</th>
                    <th className="text-center" scope="col">Giá Trị</th>
                    <th className="text-center" scope="col">Giá Cuối</th>
                   
                    </tr>
                </thead>
                <tbody>
                    {/* {list.map((val)=>{
                        return <Part ></Part>
                    })} */}
                    <Part/>
                  
                </tbody>
            </table>
            </div>
        </div>
    )
}
