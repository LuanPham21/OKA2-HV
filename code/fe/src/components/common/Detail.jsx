import React from 'react';
import '../css/Detail.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import DiaDiem from './Checkbox';
export default function Detail() {
    
    return (
        <div style={{marginTop:'30px'}}>
            <div className="container">
                <div className="row detail-all">
                    <div className="col-lg-3 detail-img">
                        <div class="col--detail--1">
                        <img src="/img/manager-1.jpg" />    
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <p className="detail-ten">Tên Voucher</p>
                        <p className="detail-loai">Loại Voucher</p>
                        <p className="detail-gia">Giá Voucher</p>
                        <p className="detail-dieukien">DieuKien Voucher</p>
                        <p className="detail-apdung">apDung Voucher</p>
                        <button type="button" className="detail-btn-mua">Mua Ngay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
