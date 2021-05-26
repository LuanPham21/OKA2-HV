import React from 'react'
import Payment from '../common/Payment';
import '../css/Payment.css'
export default function listPayMent(props) {
    return (
        <div className="form-include" >
            <Payment/>
            <div className="form-total">
                <h3 className="total-price">Tổng tiền: 100000</h3>
                <button type="button" className="btn-buy">Thanh Toán</button>
            </div>
        </div>
    )
}
