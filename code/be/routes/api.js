var sql = require('mssql');
var express = require('express');
var app=express();
var dateFormat = require("dateformat");
var config= require("./config")

const cors = require("cors");
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/l_voucher",(req,res)=>{
    var a= "Voucher1"
    sql.connect(config,(err,result)=>{
        var update ="Update Voucher SET TrangThai ='U' WHERE  NgayKetThuc <'"+today_1+"'";
        var request=new sql.Request();
        request.query(update,function(err,database){ 
        })
        var update_2 ="Update Voucher SET TrangThai ='P' WHERE  NgayBatDau > '"+today_1+"' AND TrangThai!='U'";
        request.query(update_2,function(err,database){ 
        })
        var update_1 ="Update Voucher SET TrangThai = 'A' WHERE NgayBatDau <= '"+today_1+"'AND NgayKetThuc >'"+today_1+"' AND TrangThai!='U'";
        var request_1=new sql.Request();
        request_1.query(update_1,function(err,database){ 
        })
        var str ="SELECT * FROM Voucher WHERE TrangThai='A'AND SoLuong >0"    
        request.query(str,function(err,database){
            if(database!=null)
            {
                res.send(database.recordset)
            }
                
           
        })
      

    });
    
});



app.post("/details",(req,res)=>{

    sql.connect(config,(err,result)=>{
        var str_1 ="SELECT * FROM Voucher Where MaVoucher = '"+req.body.ma+"' ;";

        var request_2=new sql.Request();

        request_2.query(str_1,function(err,database){ 

            res.send(database.recordset[0])
            
        })
    })
});
app.post("/details_dc",(req,res)=>{
    
    sql.connect(config,(err,result)=>{
        var str = "SELECT DiaDiemApDung.MaVoucher, DiaChi.So, DiaChi.TenDuong, DiaChi.TenQuan, DiaChi.TenTP FROM DiaDiemApDung  INNER JOIN DiaChi  ON DiaDiemApDung.MaDiaChi = DiaChi.MaDiaChi WHERE DiaDiemApDung.MaVoucher='"+req.body.ma+"'";  
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            res.send(database.recordset)     
        })
    })
});

app.post("/details_dk",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var str = "SELECT * FROM DieuKien Where MaVoucher='"+req.body.ma+"'";  
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
           

            res.send(database.recordset)
        })
    })
});



app.post("/list_kh",(req,res)=>{
    var a= "Voucher1"
    console.log(req.body.ma)
    sql.connect(config,(err,result)=>{
        var update ="Update Voucher SET TrangThai ='U' WHERE  NgayKetThuc <'"+today_1+"'";
        var request=new sql.Request();
        request.query(update,function(err,database){ 
        })
        var update_2 ="Update Voucher SET TrangThai ='P' WHERE  NgayBatDau > '"+today_1+"' AND TrangThai!='U'";
        request.query(update_2,function(err,database){ 
        })
        var update_1 ="Update Voucher SET TrangThai = 'A' WHERE NgayBatDau <= '"+today_1+"'AND NgayKetThuc >'"+today_1+"' AND TrangThai!='U'";
        var request_1=new sql.Request();
        request_1.query(update_1,function(err,database){ 
        })
        var str ="SELECT m.MaMua, v.MaVoucher,v. TenVoucher, v.NgayBatDau, v.NgayKetThuc, v.GiaTriSuDung, v.Hinh, m.SoLuong FROM MuaHang m INNER JOIN Voucher v On v.MaVoucher= m.MaVoucher Where v.TrangThai='A' AND m.MaKhachHang = '"+req.body.ma+"' ;";
        request.query(str,function(err,database){
            if(database!=null)
            {
                console.log(database.recordset)
                res.send(database.recordset)
            }
        })
    }); 
});
app.post("/details_kh",(req,res)=>{

    sql.connect(config,(err,result)=>{
        var str_1 ="SELECT v.MaVoucher, v.TenVoucher,v.NgayBatDau, v.NgayKetThuc, v.GiaTriSuDung, v.Hinh, m.SoLuong FROM MuaHang m INNER JOIN Voucher v On v.MaVoucher= m.MaVoucher Where v.TrangThai='A' AND m.MaMua= '"+req.body.ma+"' ;";

        var request_2=new sql.Request();

        request_2.query(str_1,function(err,database){ 

            res.send(database.recordset[0])
            
        })
    })
});