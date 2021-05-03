import React,{Component, useState} from 'react';
import '../css/ManagerVoucher.css';
import { EnvironmentOutlined } from '@ant-design/icons';
import Axios from "axios";
var CurrencyFormat = require('react-currency-format');
export default function ManagerVoucher(state){ 

    const[MaV,setMaV]=useState('')
    const onClick=()=>{    
    }

    return (
        <div>
            <div className="square_all" >
                <a href={`/detail/${state.ma}`} className="square_link">
                    <div className="square">
                        <div className="img">
                            <img src={state.hinh} className="square_img"/>
                        </div>
                        <div className="body">
                            <h3 className="square_title" id="ten">{state.title}</h3>
                            <p className="square_desc"> {state.sdate} - {state.edate}</p>
                            <p className="square_price"><CurrencyFormat value={state.price} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                        </div>
                        
                    </div>
            </a>
            </div>
        </div>
    )
    
}
