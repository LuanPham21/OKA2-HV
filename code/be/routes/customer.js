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
    var a= "Voucher1"
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
                console.table(database.recordset)
                res.send(today)
            }
            
            // console.log(today_1);
            // console.log(database.recordset[0].NgayBatDau-today);
        })

    });
});

app.post("/details",(req,res)=>{
    
    var str ="SELECT * FROM Voucher Where MaVoucher = '"+req.Ma+ "'";  
    var request_1=new sql.Request();
    request_1.query(str,function(err,database){ 
    })
});

app.post("/details_dc",(req,res)=>{
    
    
    var str = "SELECT DiaDiemApDung.MaVoucher, DiaChi.So, DiaChi.TenDuong, DiaChi.TenQuan, DiaChi.TenTP FROM DiaDiemApDung  INER JOIN DiaChi  ON DiaDiemApDung.MaDiaChi = DiaChi.MaDiaChi WHERE DiaDiemApDung.MaVoucher='"+req.Ma+"'";  
    var request_1=new sql.Request();
    request_1.query(str,function(err,database){ 
        res.send(database.recordset)
    })
});

app.post("/details_dc",(req,res)=>{
    
    
    var str = "SELECT * FROM DieuKien Where MaVoucher='"+req.Ma+"'";  
    var request_1=new sql.Request();
    request_1.query(str,function(err,database){ 
        res.send(database.recordset)
    })
});

module.exports=app;