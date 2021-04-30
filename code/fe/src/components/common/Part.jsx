import React,{useEffect,useState} from 'react';
import '../css/Manage.css';
import Axios from 'axios'
import dateFormat from 'dateformat';
import {DeleteOutlined } from '@ant-design/icons'

export default function Part(state){

    // const [maVoucher,setMaV]=useState('');
    // const a= ()=>{
    //     return;
    // }
    const styleDelete={
        borderRadius:'50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '48px',
        height: '38px',
        marginLeft:'10px'
    }
    return(
        <tr>
            <th className="text-center" scope="row" >1</th>
            <td className="text-center">loai vocher</td>
            <td className="text-center">ten voucher</td>
            <td className="text-center">giá</td>
            <td className="text-center">giá cuối</td>
            <td className="text-center">Trạng thái</td>
            <td style={{maxWidth: '60px'}}>
                        <form action="/repair"> 
                            <button type="submit" className="btn btn-warning" onClick={()=>{
                                    Axios.post("http://localhost:9000/manage/preedit",{MaV:state.ma});

                            }} style={{marginRight:'10px'}}>Sửa</button>
                             <button type="submit" className="btn btn-danger " onClick={()=>{
                                 Axios.post("http://localhost:9000/manage/delete",{ma:state.ma});
                                 
                        }} >Xóa</button>
                        </form>
                        
                       
                    </td>

      
        </tr>
        
    )
}