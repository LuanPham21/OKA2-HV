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
                <a href="/detail" className="square_link" onClick={()=>{
                    setMaV(state.ma)
                    Axios.post("http://localhost:9000/predetailvoucher",{MaV:state.ma});
                }}>
                    <div className="square">
                        <div className="img">
                            <img src={state.hinh} className="square_img"/>
                        </div>
                        <div className="body">
                            <h3 className="square_title" id="ten">{state.title}</h3>
                            <p className="square_desc"><EnvironmentOutlined style={{verticalAlign:'baseline'}} /> {state.adress}</p>
                            <p className="square_price"><CurrencyFormat value={state.price} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                        </div>
                        
                    </div>
            </a>
            </div>
        </div>
    )
    
}
