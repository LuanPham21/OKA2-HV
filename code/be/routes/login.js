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
var token

app.post("/login_kh",(req,res)=>{
    token=req.body.ma
    sql.connect(config,(err,result)=>{
        var str ="SELECT MaKhachHang FROM KhachHang WHERE UserName ='"+req.body.name+"' AND Password ='"+req.body.pass+"'";
        var request=new sql.Request();
        request.query(str,function(err,database){ 
            if(database!=[])
            {
                console.log(database.recordset[0])
                res.send(database.recordset[0])
            }
        })

        
    })
})

app.post("/login",(req,res)=>{
    token=req.body.ma
    sql.connect(config,(err,result)=>{
        var str ="SELECT MaKhachHang FROM KhachHang WHERE UserName ='"+req.body.name+"' AND Password ='"+req.body.pass+"'";
        var str_1 ="SELECT MaPartner FROM Partner WHERE UserName ='"+req.body.name+"' AND Password ='"+req.body.pass+"'";
        var A={
            makh:'',
            type:''
        }
        var request=new sql.Request();
        request.query(str,function(err,database){ 
            if(database.rowsAffected[0]!=0)
            {
                console.log(err)
                console.log(database.recordset[0].MaKhachHang)
                A.makh=database.recordset[0].MaKhachHang
                A.type='kh'
                console.log(A)
                res.send(A)
            }
        })
        request.query(str_1,function(err,database){ 
            console.log(database)
            if(database.rowsAffected[0]!=0)
            {
                console.log(database)
                console.log(database.recordset[0])
                A.makh=database.recordset[0].MaPartner
                A.type='partner'
                console.log(A)
                res.send(A)
            }
        })
    })
})
app.post("/login_partner",(req,res)=>{
    token=req.body.ma
    sql.connect(config,(err,result)=>{
        var str_1 ="SELECT MaPartner FROM Partner WHERE UserName ='"+req.body.name+"' AND Password ='"+req.body.pass+"'";
        var request=new sql.Request();
        request.query(str_1,function(err,database){ 
            if(database.recordset[0]!=null)
            {
                console.log(database)
                console.log(database.recordset[0])
                res.send(database.recordset[0])
            }
        })
    })
})
app.get("/loginstt",(req,res)=>{
   res.send(token) 
   console.log(token)
})

module.exports=app;

