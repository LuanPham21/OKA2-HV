import React,{Component, useState} from 'react';
import '../css/ManagerVoucher.css';
import dateFormat from 'dateformat'
import { EnvironmentOutlined } from '@ant-design/icons';
import Axios from "axios";
var CurrencyFormat = require('react-currency-format');

export default function Voucher(state){ 

    const[MaV,setMaV]=useState('')
    const onClick=()=>{    
    }

    return (
        <div>
           <div className="square_all" style={{width:'auto'}} >
            <a href={`/detailkh/${state.mamua}/${state.ma}`} className="square_link">
                <div className="square" style={{height:'170px'}}>
                    <div className="img">
                        <img src={state.hinh} className="square_img"/>
                    </div>
                    <div className="body">
                        <h3 className="square_title" id="ten">{state.title}</h3>
                        <p className="square_desc" style={{color:'red',marginBottom:'20px'}}>{dateFormat(state.sdate, 'dd/mm/yyyy')} - {dateFormat(state.edate, 'dd/mm/yyyy')}</p>
                        <p className="square_desc" style={{color:'#000'}}>Số Lượng: {state.sl}</p>
                    </div>
                    
                </div>
                
            </a>
        </div>
        </div>
    )
    
}
