import React, { useState } from 'react';
import '../css/Header.css';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'

export default function Header_partner() {
    // header
    const history=useHistory()
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const onClick=()=>{
        sessionStorage.clear();
        history.go(0)
        
    }
    return (
        <div className="header">
            <div className="header-logo">
                <MenuOutlined  type="primary" onClick={showDrawer} style={{marginRight:'16px',fontSize:'20px',color:'#0770cd',verticalAlign:'baseline'}}>
                </MenuOutlined>
                <a href="/manage" style={{lineHeight:'48px'}}>
                    traveloka
                  <img src="https://phuquoctrip.com/images/iconTravelloka.png" alt="bird" className="header-logo-img"/>
                </a>
            </div>
            <div className="header-right">
                <a href="/promotion">Khuyến Mãi</a>
                <a href="/cooperate">Hợp Tác Với Chúng Tôi</a>
                <a href="/save">Đã Lưu</a>
                <a href="/book">Đặt Chỗ Của Tôi</a>
                <button className="login" onClick={onClick}> Đăng xuất</button>
            </div>
        </div>
    )
}