import React,{useEffect,useState} from 'react';
import '../css/Manage.css';
import Axios from 'axios'
import dateFormat from 'dateformat';
import {DeleteOutlined } from '@ant-design/icons'
import {useHistory} from 'react-router-dom'

export default function Part(props){

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
    var bool
    if(props.tt=='A')
    {
        bool=true
    }
    else
    {
       bool=false
    }
    const history=useHistory();
    const redirect = () => {
        history.push(`/edit/${props.ma}`)
      }
    return(
        <tr>
            
            <td className="text-center">
                <img src={props.hinh} style={{width:'121px',height:'100px'}}></img>
            </td>
            <td className="text-center">{props.ten}</td>
            <td className="text-center">{props.giatri}</td>
            <td className="text-center">{props.gia}</td>
            <td style={{maxWidth: '60px',borderTop:'none'}}>
                        <form> 
                            <button type="submit" className="btn btn-warning" hidden={bool} onClick={redirect} style={{marginRight:'10px'}}>Sửa</button>
                             <button type="submit" className="btn btn-danger " hidden={bool} onClick={()=>{
                                 Axios.post("http://localhost:9000/partner/delete",{ma:props.ma}); }}
                                 >Xóa</button>
                        </form>
                        
                       
                    </td>

      
        </tr>
        
    )
}