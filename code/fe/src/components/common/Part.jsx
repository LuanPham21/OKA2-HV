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
        <td>{props.ma}</td>
        <td style={{ wordBreak: "break-word" }}>{props.ten}</td>
        <td>{props.sl}</td>
        <td>{props.giatri}</td>
        <td>{props.gia} VNĐ</td>
        <td style={{ maxWidth: "60px" }}>
          <form>
            <button
              type="submit"
              className="btn btn-primary"
              hidden={bool}
              onClick={redirect}
              style={{ marginRight: "10px", textTransform: "uppercase" }}
            >
              Sửa
            </button>
            <button
              type="submit"
              className="btn btn-danger "
              hidden={bool}
              style={{ textTransform: "uppercase" }}
              onClick={() => {
                Axios.post("http://localhost:9000/partner/delete", {
                  ma: props.ma,
                });
              }}
            >
              Xóa
            </button>
          </form>
        </td>
      </tr>
        
    )
}