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

var maKH

app.post("/getma",(req,res)=>{
    maKH=req.body.ma
})


app.get("/list",(req,res)=>{
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

app.post("/payment",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var mamua;
       
        var request_1=new sql.Request();
        var soluong
        var string="SELECT SoLuong FROM Voucher WHERE MaVoucher = '"+req.body.ma+"'"
        request_1.query(string,function(err,database){ 
            soluong=database.recordset[0].SoLuong-req.body.sl
        
            console.log(req.body.sl)
            var count="SELECT Dem=(Count(MaMua)+1) FROM MuaHang"
            request_1.query(count,function(err,database){ 
                console.log(database.recordset[0].Dem)
                mamua="MM"+database.recordset[0].Dem
                console.log(mamua)
                var str = "INSERT INTO MuaHang(MaMua, Ngay, MaKhachHang, MaVoucher, SoLuong, TongTien) Values('"+mamua+"', '"+today_1+"', '"+maKH+"', '"+req.body.ma+"', "+req.body.sl+", "+req.body.tong+")";
                request_1.query(str,function(err,database){ 
                })
                var str_1 = "UPDATE Voucher SET SoLuong= "+soluong+" WHERE MaVoucher = '"+req.body.ma+"'";
                request_1.query(str_1,function(err,database){ 
                })
            })
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
app.post("/search",(req,res)=>{
    
    sql.connect(config,(err,result)=>{
        
        var bd = dateFormat(req.body.ngay[0],"yyyy-mm-dd")
        var kt = dateFormat(req.body.ngay[1],"yyyy-mm-dd")
        var str
        if(req.body.ngay[0]==null||req.body.ngay[0]==null)
        {
            console.log(bd)
            str="SELECT * FROM Voucher v INNER JOIN DiaDiemApDung d On v.MaVoucher = d.MaVoucher INNER JOIN DiaChi di On d.MaDiaChi = di.MaDiaChi WHERE  di.TenTP =N'"+req.body.tp+"'"
        }
        else if(req.body.tp==null)
        {
            str = "SELECT * FROM Voucher v INNER JOIN DiaDiemApDung d On v.MaVoucher = d.MaVoucher INNER JOIN DiaChi di On d.MaDiaChi = di.MaDiaChi WHERE  v.NgayBatDau>= '"+bd+"' AND v.NgayKetThuc<= '"+kt+"'";
        }
        else{
            str = "SELECT * FROM Voucher v INNER JOIN DiaDiemApDung d On v.MaVoucher = d.MaVoucher INNER JOIN DiaChi di On d.MaDiaChi = di.MaDiaChi WHERE  di.TenTP =N'"+req.body.tp+"' AND v.NgayBatDau>= '"+bd+"' AND v.NgayKetThuc<= '"+kt+"'";
        }
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            if(database!=null)
            {   
                res.send(database.recordset)
            }
        })
    })
    
});
module.exports=app;