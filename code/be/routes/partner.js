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

app.get("/list",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var update ="Update Voucher SET TrangThai ='U' WHERE NgayBatDau > '"+today_1+"' OR NgayKetThuc <'"+today_1+"'";
        var request=new sql.Request();
        request.query(update,function(err,database){ 
        })
        
        
        var update_1 ="Update Voucher SET TrangThai = 'A' WHERE NgayBatDau <= '"+today_1+"'AND NgayKetThuc >'"+today_1+"'";
        var request_1=new sql.Request();
        request_1.query(update_1,function(err,database){ 
        })

        var str ="SELECT * FROM Voucher Where TrangThai = 'A' "    
        request.query(str,function(err,database){
            if(database.recordset[0].NgayBatDau<today)
            {
                res.send(database.recordset)
            }
        })
    });
});


app.post("/add",(req,res)=>{
    var str = "INSERT INTO Voucher Value MaVoucher ='"+req.ma+"' TenVoucher='"+req.ten+"' MaLoaiVoucher= '"+req.loai+"' SoLuong= "+req.soluong+"' NgayBatDau= "+req.ngay1+" NgayKetThuc= "+req.ngay2+" GiaTriSuDung= "+req.giatri+" GiaTien= "+req.gia+" Hinh= '"+req.hinh+"' TrangThai= '"+req.tt+"'";
    var request_1=new sql.Request();
    request_1.query(str,function(err,database){ 
    })
});

app.post("/edit",(req,res)=>{
    var str = "UPDATE Voucher SET TenVoucher='"+req.ten+"' MaLoaiVoucher= '"+req.loai+"' SoLuong= "+req.soluong+"' NgayBatDau= "+req.ngay1+" NgayKetThuc= "+req.ngay2+" GiaTriSuDung= "+req.giatri+" GiaTien= "+req.gia+" Hinh= '"+req.hinh+"'  WHERE MaVoucher ='"+req.ma+"'";
    var request_1=new sql.Request();
    request_1.query(str,function(err,database){ 
    })
});

app.post("/delete",(req,res)=>{
    var str = "UPDATE Voucher SET TrangThai= 'U' WHERE MaVoucher ='"+req.ma+"'";
    var request_1=new sql.Request();
    request_1.query(str,function(err,database){ 
    })
});








module.exports=app;
