import React from 'react'
import '../css/GioHang.css'
export default function GioHang() {
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
    return (
        
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-9">
                        <table className="table ">
                            <thead className="table-primary">
                                <tr>
                                <th scope="col" colspan="2">Sản Phẩm</th>
                                <th scope="col">Loại Voucher</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="2">
                                        <img src="/img/manager-1.jpg" style={{width:'50px',height:'50px',float:'left'}}></img>
                                        <p style={{float:'left'}}>day la voucer khac san</p>
                                    </td>
                                <td>Khách sạn</td>
                                <td>
                                <button type="button" className="form-price-btn-tru" onClick={onClickMinus}>-</button>
                                <input type="text" className="form-price-input" id="so" value={1}/>
                                <button className="form-price-btn-cong"  onClick={onClickPlus}>+</button>
                                </td>
                                <td>100vnd</td>
                                <td>
                                <button type="submit" className="btn btn-warning" style={{textAlign:'center'}}>Xóa</button>

                        
                                </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="col-lg-3 giohang-phai">
                        <ul>
                            <li>
                                <p className="giohang-sp">Sản Phẩm: <span>3</span></p>
                            </li>
                            <li>
                                <p className="giohang-total">Tổng Tiền: <span>300</span></p>
                            </li>
                            <li>
                                <button type="button" className="btn-muahang">Mua Hàng</button>
                            </li>
                        </ul>        
                    </div>
                </div>
            </div>
    )
}
