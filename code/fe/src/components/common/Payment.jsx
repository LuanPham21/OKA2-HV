import React, { useState} from 'react'
import '../css/Payment.css'
export default function Payment(){
        const onClickPlus=()=> {
            var int=parseInt(document.getElementById('so').value,10);
            int = isNaN(int) ? 0 : int;
            int++;
            document.getElementById('so').value=int;
        }
    
        const onClickMinus=()=> {
            var int=parseInt(document.getElementById('so').value,10);
            int = isNaN(int) ? 0 : int;
            if(int>0)
            {
                int--;
                document.getElementById('so').value=int;
            }
        }
        const [listvoucher,setlistVoucher]=useState()
        return(
            <div className="form-include" >
            <div className="form ">
                <div className="form-img">
                    <img src="img/manager-1.jpg" alt=""/>
                </div>
                <div className="form-desc">
                    <h3 className="form-desc-heading">A</h3>
                    <p className="form-desc-type">Loại voucher</p>
                    <p className="form-desc-time">Thời hạn sử dụng</p>
                    <p className="form-price-text" id="price"  >{}</p>
                    <p className="form-price-quality">Số lượng:</p>
                    <button type="button" className="form-price-btn-tru" onClick={onClickMinus}>-</button>
                    <input type="text" className="form-price-input" id="so" value={1}/>
                    <button className="form-price-btn-cong"  onClick={onClickPlus}>+</button>
                </div>
                
            </div>
        </div>
        )
    }


