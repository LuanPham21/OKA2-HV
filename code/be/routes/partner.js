var sql = require('mssql');
var express = require('express');
var app=express();
var dateFormat = require("dateformat");
var config= require("./config")

const cors = require("cors");
const bodyParser = require('body-parser');
const { Connection } = require('tedious');
const { connect } = require('./partner');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const date = Date.now();
let today= new Date(date);
var today_1 = dateFormat(today,"yyyy-mm-dd")

app.get("/list",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var update ="Update Voucher SET TrangThai ='U' WHERE  NgayKetThuc <'"+today_1+"'";
        var request=new sql.Request();
        request.query(update,function(err,database){ 
        })

        var update_2 ="Update Voucher SET TrangThai ='P' WHERE  NgayBatDau > '"+today_1+"'";
        request.query(update_2,function(err,database){ 
        })
        var update_1 ="Update Voucher SET TrangThai = 'A' WHERE NgayBatDau <= '"+today_1+"'AND NgayKetThuc >'"+today_1+"'";
        var request_1=new sql.Request();
        request_1.query(update_1,function(err,database){ 
        })

        var str ="SELECT Voucher.TenVoucher, LoaiVoucher.TenLoai, Voucher.GiaTriSuDung, Voucher.GiaTien, Voucher.TrangThai FROM Voucher INNER JOIN LoaiVoucher ON LoaiVoucher.MaLoaiVoucher= Voucher.MaLoaiVoucher Where TrangThai = 'A' OR TrangThai='P' "    
        request.query(str,function(err,database){
            
                console.log(database.recordset)
                res.send(database.recordset )
            
        })
    });
});
app.get("/list_loai",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT * FROM LoaiVoucher"
        request.query(loai,function(err,database){
            
                console.log(database.recordset)
                res.send(database.recordset)
            
        })
    })
})
app.get("/list_dc",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT * FROM DiaChi"
        request.query(loai,function(err,database){
                console.log(database.recordset  )
                res.send(database.recordset)
           
        })
    })
})
app.get("/ma",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT Dem=(Count(MaVoucher)+1) From Voucher"
        request.query(loai,function(err,database,result){
                console.log(database.recordset)
                res.send(database.recordset)
           
        })
    })
})


app.get("/list_dk",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT * FROM DieuKien"
        request.query(loai,function(err,database){
                console.log(database.recordset)
                res.send(database.recordset)
            
        })
    })
})

app.post("/add",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var bd = dateFormat(req.body.ngaybd,"yyyy-mm-dd")
        var kt = dateFormat(req.body.ngaykt,"yyyy-mm-dd")
        console.log(kt)
        var sl=Number(req.body.sl)
        var ptram=Number(req.body.ptram)
        var gia=req.body.gia
        console.log(sl)
        console.log(req.body.sl)
        // console.log(sl)
        console.log(req.body)
        var str = "INSERT INTO Voucher (MaVoucher, TenVoucher, MaLoaiVoucher, SoLuong, NgayBatDau, NgayKetThuc, GiaTriSuDung, GiaTien, Hinh, TrangThai) Values('"+req.body.ma+"', '"+req.body.ten+"', '"+req.body.loai+"' , "+sl+" , '"+bd+"', '"+kt+"',  "+ptram+", "+gia+", '"+req.body.hinh+"', 'P')";
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            console.log(err)
        })
    })
})

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
