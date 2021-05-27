import React,{Component, useState} from 'react';
import '../css/ManagerVoucher.css';
import dateFormat from 'dateformat'
import { EnvironmentOutlined } from '@ant-design/icons';
import Axios from "axios";
import {useHistory} from 'react-router-dom'
var CurrencyFormat = require('react-currency-format');

export default function ManagerVoucher(state){ 
    const history=useHistory()
    const[MaV,setMaV]=useState('')
    const onClick=()=>{ 
      
            history.push(`/detail/${state.ma}`)
         
    }

    return (
        <div>
            <div className="square_all" >
                <a  onClick={onClick} className="square_link">
                    <div className="square">
                        <div className="img">
                            <img src={state.hinh} className="square_img"/>
                        </div>
                        <div className="body">
                            <h3 className="square_title" id="ten">{state.title}</h3>
                            <p className="square_desc">{dateFormat(state.sdate, 'dd/mm/yyyy')} - {dateFormat(state.edate, 'dd/mm/yyyy')}</p>
                            <p className="square_price"><CurrencyFormat value={state.price} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                        </div>
                        
                    </div>
            </a>
            </div>
        </div>
    )
    
}
