import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {} from 'antd';
import { Form, Input, Button, notification } from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import Axios from 'axios'

export default function Login(props) {
    const[username,setUsername]=useState('')
    const [pass,setPass]=useState('')
    useEffect(()=>{
        
    },[])
    const history=useHistory();
    const[bool,setBool]=useState(false)
    const onClick=()=>{
        // Axios.post('',{username:username,pass:pass})
        // history.push("/")
        // e.preventDefault();
        // Axios.post('http://localhost:9000/login/login_kh',{ma:true,name:username,pass:pass}).then((respone)=>{
        //     if(respone.data!="")
        //     {
        //         props.setLogin(respone.data.MaKhachHang,'kh')
        //         history.push("/") 
        //     }
        // })
        // Axios.post('http://localhost:9000/login/login_partner',{ma:true,name:username,pass:pass}).then((respone)=>{
        //     if(respone.data!="")
        //     {
        //         props.setLogin(respone.data.MaPartner,'partner')
        //         history.push("/manage")
        //     }   
        // })  
        
        Axios.post('http://localhost:9000/login/login',{ma:true,name:username,pass:pass}).then((respone)=>{
            if(respone.data!=null)
            {
                props.setLogin(respone.data.makh,respone.data.type)
                if(respone.data.type=='kh')
                {
                    setBool(false)
                    history.push("/")
                    history.go(0)
                }
                else
                {
                    setBool(false)
                    history.push("/manage")
                    history.go(0)

                }
            }   
        }) 

        if(bool!=false)
        {
            notification['error']({
                message: '????ng nh???p th???t b???i',
                description:
                  'Vui l??ng nh???p l???i t??n ????ng nh???p, m???t kh???u',
              });
        }

        
    }
    const onChangeName=(e)=>{
        setUsername(e.target.value)
    }

    
    const onChangePass=(e)=>{
        setPass(e.target.value)
    }
    return (
        <div className="backgroud-all">
            <div className="form-body">
                <Form 
                name="normal_login"
                className="login-form form-center"
                // initialValues={{ remember: true }}
                // onFinish={onFinish}
                >
                    <h2 className="header_1">????ng Nh???p</h2>

                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Kh??ng ???????c ????? tr???ng t??i kho???n' },
                           
                            
                        ]}
                        style={{maxWidth:'10% !important'}}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={onChangeName} placeholder="T??i Kho???n"  />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng m???t kh???u' }]}
                    >
                        <Input.Password
                        onChange={onChangePass}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        // type="password"
                        placeholder="M???t Kh???u"
                        />
                    </Form.Item>
                    <div className="form-forget">
                        <a href="" >Qu??n m???t kh???u ?</a>
                    </div>
                    <Form.Item className="form-btn-login" style={{padding:'0',margin:'0'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={onClick}>
                    ????ng Nh???p
                    </Button>
                    </Form.Item>
                    <div className="form-register">
                        <Link to='/signin' style={{textAlign:'center'}}>????ng K?? T??i Kho???n ?</Link>
                    </div>
            </Form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setLogin: PropTypes.func.isRequired,
    setNoti: PropTypes.func.isRequired
  };