import React ,{useState}from 'react';
import '../css/ChiTiet.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import DieuKien from './DieuKien';
import Popup from './Popup';
import DiaDiem from './Checkbox';
export default function ChiTiet() {
    const [image,setImage]=useState('/img/manager-1.jpg');
    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img))
            
        }
    }
    const [openPopup,setOpenPopup]=useState(false);
    const [option,setOption]=useState([
        {
            id:1,
            title:'vũng tàu',
        },
        {
            id:2,
            title:'đà lạt',
        },

    ])
    const [text,setText]=useState('');
    const onChangeText = (e)=>{
        setText(e.target.value);
    }
    const addOption = (e) =>{
        const newOption = 
            [
                ...option,
                {
                    id:4,
                    title:text,
                }

            ]
            setOption(newOption);
            setText('');
    }
    
    const { RangePicker } = DatePicker;
    return (
        <div style={{marginTop:'30px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div class="col--detail--1">
                        <img src={image}  />
                        {/* <h1>Select Image</h1> */}
                        <input type="file" name="myImage" onChange={onImageChange} style={{marginTop:'10px',cursor: 'pointer'}} />
                        </div>
                    </div>
                    <div className="col-lg-8 ">
                    <Form 
            name="normal_login"
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            className="col-lg-8-detalis"
            >
                <Form.Item
                    name="maVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống mã voucher' },
                    ]}
                    label="Mã Voucher"
                    className="form__row"
                >
                <Input  placeholder="Nhập Mã Voucher ('MV...')..."  className="form__input" />
                </Form.Item>
                <Form.Item
                    name="tenVoucher"
                    rules={[
                        { required: true, message: 'Không được bỏ trống tên voucher' },
                    ]}
                    label="Tên Voucher"
                    className="form__row"
                >
                <Input  placeholder="Nhập Tên Voucher ..."  />
                </Form.Item>
                <Form.Item 
                label="Loại Voucher" 
                name="select"
                rules={[
                    { required: true, message: 'Không được bỏ trống loại voucher' },
                ]}
                className="form__row"
                >
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Điều kiện" name="dieukien"  className="form__row">
                    <div>
                        <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>

                    </div>
                    <div>
                        <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>
                    </div>
                    <div>
                        <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>
                    </div>
                    <div>
                        <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>
                    </div>
                    <div>
                        <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>
                    </div>
                    <div>
                        <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>
                    </div>
                    

                </Form.Item>
                <Form.Item
                    name="diadiem"
                    rules={[
                        // { required: true, message: 'Không được bỏ trống địa điểm' },
                    ]}
                    label="Địa Điểm"
                    className="form__row"
                >
                    <DiaDiem/>
                    
                </Form.Item>
                <Form.Item
                    name="gia"
                    rules={[
                        { required: true, message: 'Không được bỏ trống giá voucher' },
                    ]}
                    label="Giá"
                    className="form__row"
                >
                   <CurrencyInput id="input-example"className="form__input" placeholder="Nhập Giá ..." style={{color:'rgba(0, 0, 0, 0.85)',padding:'0 11px',outline:'none'}}  suffix="VNĐ"/><p style={{display:'none'}}>;</p>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    rules={[
                        { required: true, message: 'Không được bỏ trống phần trăm giá' },
                    ]}
                    label="Phần Trăm Giá"
                    className="form__row"
                >
                   <CurrencyInput id="input-example" className="form__input" placeholder="Nhập Phần Trăm Giá ..." style={{color:'rgba(0, 0, 0, 0.85)',padding:'0 11px',outline:'none'}}  suffix="%"/><p style={{display:'none'}}>;</p>
                </Form.Item>
                <Form.Item
                    name="ngaybd"
                    rules={[
                        { required: true, message: 'Không được bỏ trống ngày bắt đầu' },
                    ]}
                    label="Ngày Bắt Đầu"
                    className="form__row"
                >
                    {/* <RangePicker /> */}
                   <DatePicker placeholder="Nhập Ngày Bắt Đầu..." className="form__input"/>
                </Form.Item>
                <Form.Item
                    name="ngaykt"
                    rules={[
                        { required: true, message: 'Không được bỏ trống ngày bắt đầu' },
                    ]}
                    label="Ngày Kết Thúc"
                    className="form__row"
                >
                   <DatePicker placeholder="Nhập Ngày Kết Thúc..." className="form__input"/>
                </Form.Item>
                <Form.Item className="form-btn-login">
                <Button type="primary" htmlType="submit" className="btn--them text-right btn btn-primary" >
                Thêm
                </Button>
                </Form.Item>
            </Form>
             <Popup 
              openPopup={openPopup} 
              setOpenPopup={setOpenPopup}
              title = 'Điều Kiện'
            >
                <DieuKien/>
            </Popup>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
