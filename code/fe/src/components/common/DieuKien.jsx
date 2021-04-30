import React, { useState } from 'react'
import '../css/Add.css';
import isEmpty from 'validator/lib/isEmpty';
import { DatePicker,Button,Space } from 'antd';
export default function DieuKien() {
    const [MaCTDK,setMaCTDK]=useState('');
    const [MaVoucher,setMaVoucher]=useState('')
    const [MaLoaiDieuKien,setMaLoaiDieuKien]=useState('');
    const [GiaTri,setGiaTri]=useState('');
    const [NoiDung,setNoiDung]=useState('');
    const [arr,setArr]=useState('');
    const [validation,setValidation]=useState('')

    // thêm
    const _handleAddSV = ()=>{
        
    }
   
    const oneChangeCTDK = (e)=>{
        const value = e.target.value;
        setMaCTDK(value);
    }
    const onChangeVoucher = (e)=>{
        const value = e.target.value;
        setMaVoucher(value);
    }
    const onChangeLoaiDK = (e)=>{
        const value = e.target.value;
        setMaLoaiDieuKien(value);
    }
    const onChangeGiaTri = (e)=>{
        const value = e.target.value;
        setGiaTri(value);
    }
    const onChangeNoiDung = (e)=>{
        const value = e.target.value;
        setNoiDung(value);
    }
    const validationAll = (e) =>{
        const msg = {};
        if(isEmpty(MaCTDK)){
            msg.MaCTDK = "Vui Lòng Nhập Mã Chi Tiết Điều Kiện "
        }
        if(isEmpty(MaVoucher)){
            msg.MaVoucher = "Vui Lòng Nhập Mã Voucher"
        }
        if(isEmpty(MaLoaiDieuKien)){
            msg.MaLoaiDieuKien = "Vui Lòng Nhập Mã Loại Điều Kiện"
        }
        if(isEmpty(GiaTri)){
            msg.GiaTri = "Vui Lòng Nhập Giá Trị Voucher"
        }
        if(isEmpty(NoiDung)){
            msg.NoiDung = "Vui Lòng Nhập Nội Dung Voucher"
        }
        setValidation(msg);
        console.log(msg.nameVoucher)
        if(Object.keys(msg).length>0) return false
        return true
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        const validate = validationAll()
        if (!validate)
        return;
        const _arr=[...arr] || [];
        _arr.push({
            mact:MaCTDK,
            mavoucher:MaVoucher,
            maloaidk:MaLoaiDieuKien,
            giatri:GiaTri,
            noidung:NoiDung
        })
        setMaCTDK('');
        setMaVoucher('');
        setMaLoaiDieuKien('')
        setGiaTri('');
        setNoiDung('');
        setArr(_arr);
        console.log("arr "+_arr)

    }

    // dieu kien
   
    return (
       <div className="container">
           <form className="all--form">
                
                <div className="mb-3 form__row">
                    <label className="form-label form__label">Mã Chi Tiết Điều Kiện</label>
                    <input type="text" className="form--control form__input form--name" placeholder="Nhập Mã Chi Tiết Diều Kiện ..." onChange={oneChangeCTDK}/>      
                    
                </div>
                <p style={{fontSize:'14px',color:'red'}} className="p--name">{validation.MaCTDK}</p>
                <div className="mb-3 form__row">
                    <label className="form-label form__label">Mã Voucher</label>
                    <input type="text" className="form--control form__input form--name" placeholder="Nhập Mã Voucher ..." onChange={onChangeVoucher}/>      
 
                </div>
                <p style={{fontSize:'14px',color:'red'}} className="p--name">{validation.MaVoucher}</p>

                <div className="mb-3 form__row">
                    <label className="form-label form__label">Mã Loại Điều Kiện</label>
                    <input type="text" className="form--control form__input form--name" placeholder="Nhập Mã Loại Diều Kiện ..." onChange={onChangeLoaiDK}/>      
                </div>
                <p style={{fontSize:'14px',color:'red'}} className="p--name">{validation.MaLoaiDieuKien}</p>
                <div className="mb-3 form-check form__row">
                    <label  className="form-label form__label">Giá Trị</label>
                    <input type="text" className="form__input" placeholder="Nhập Giá Trị..."  onChange={onChangeGiaTri} />  
                </div>
                <p style={{fontSize:'14px',color:'red'}} className="p--name">{validation.GiaTri}</p>          
                <div className="mb-3 form-check form__row">
                    <label  className="form-label form__label">Nội Dung</label>
                    <input type="text" className="form__input" placeholder="Nhập Nội Dung ..." onChange={onChangeNoiDung} />  
                </div>
                <p style={{fontSize:'14px',color:'red'}} className="p--name">{validation.NoiDung}</p>
                <button type="button" className="btn btn-primary text-right btn--them" onClick={onSubmit} >Thêm</button>
                {/* <button type="submit" className="btn btn-primary text-right" onClick={onSubmit}>Thêm</button> */}
                <div className="clear"></div>
            </form>
       </div>
    )
}

