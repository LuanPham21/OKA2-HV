import React, { useEffect, useState } from 'react'
import Search from '../common/Search';
import Slider from '../common/Slider';
import  ManagerVoucher from '../common/ManageVoucher';
import Detail from '../common/Detail';
import Axios from "axios";
import '../css/Search.css';
import { Input, AutoComplete } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { DatePicker,Button ,Select } from 'antd';
const { Option } = Select;
export default function ListVoucher() {
    const [listtt,setlistt]=useState([]);
    const [search, setSearch] =useState('')
    const [date, setDate] =useState('')
    // const[MaVoucher,SetMaVoucher]=useState('');
   
    useEffect(()=>{
        Axios.get("http://localhost:9000/customer/list").then((respone)=>{
            setlistt(respone.data)
        })
    },[])   
    
    const { RangePicker } = DatePicker;
    // form search
    const renderTitle = (title) => (
        <span>
          {title}
          <a
            style={{
              float: 'right',
            }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </span>
      );
      
      const renderItem = (title, hotel) => ({
        value: title,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {title}
            <span>
            <HomeOutlined /> {hotel}
            </span>
          </div>
        ),
      });
      
      const onClick=()=>{
        Axios.post("http://localhost:9000/customer/search",{tp:search,ngay:date}).then((respone)=>{
            setlistt(respone.data)
            console.log(listtt)
        })
      }
      const onChange=(value)=>{
            var date_temp = [...value]
            
            setDate(date_temp)
            console.log(date_temp)
      }
      
    return (
        <div>
            <Slider/>
            <div className="form-control">
            <div className="form-left">
                <ul className="select-items">
                    <li><a href="1">Voucher</a></li>
                   
                </ul>
            </div>
            <div className="form-right">
                <div className="form-item">
                    <div className="form-item-label"> 
                    <a href="1">Khách Sạn Xem Gần Đây</a></div>
                    <div className="form-item-input"></div>
                </div>
                <div className="form-item">
                    <div className="form-item-label">
                    <p>Thành Phố Địa, Điểm Hoặc Tên Khách Sạn:</p>
                    </div>
                    <div className="form-item-input">
                    <Select
                        // dropdownClassName="certain-category-search-dropdown"
                        // dropdownMatchSelectWidth={500}
                        style={{
                            width: '100%',
                        }}
                        
                        onChange={(value) => {
                            setSearch(value)
                            
                          }} 
                        // value={}
                    >
                        <Option value="Hồ Chí Minh">TP.Hồ Chí Minh</Option>
                        <Option value="Hà Nội">Hà Nội</Option>
                    </Select>
                    </div>
                </div>
                <div className="form-item">
                    <div className="form-item-label"><p>Hạn Sử Dụng:</p></div>
                    <div className="form-item-input"><RangePicker onChange={onChange}/></div>
                </div>
               
                <Button style={{backgroundColor:'#f96d01',color:'#fff',width:'218px',height:'38px',marginTop:'16px'}} onClick={onClick} className="search-btn">Tìm Voucher</Button>               
            </div>
        </div>                
             {listtt.map((val)=>{
                 return <ManagerVoucher key={val.MaVoucher} ma={val.MaVoucher}  hinh ={val.Hinh} title ={val.TenVoucher} sdate={val.NgayBatDau} edate={val.NgayKetThuc} price={val.GiaTien} ></ManagerVoucher>
             })} 
        </div>
    )
}
