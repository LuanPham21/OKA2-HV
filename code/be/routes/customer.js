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
app.get("/test",(req,res)=>{
    // var connection = new Connection(config);  
    // connection.on('connect', function(err) {  
    //     // If no error, then good to proceed.
    //     console.log("Connected");  
    // });
    
}
)
app.get("/list",(req,res)=>{
    var a= "Voucher1"
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
        var str ="SELECT * FROM Voucher "    
        request.query(str,function(err,database){
            
                res.send(database.recordset)
           
        })
      

    });
    
});

app.post("/details",(req,res)=>{

    sql.connect(config,(err,result)=>{
        var str_1 ="SELECT * FROM Voucher Where MaVoucher = '"+req.body.ma+"' ;";

        var request_2=new sql.Request();

        request_2.query(str_1,function(err,database){ 

            console.log(database)
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
            console.log(database.recordset)

            res.send(database.recordset)
        })
    })
});

module.exports=app;