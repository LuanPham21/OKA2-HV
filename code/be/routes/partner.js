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

        var str ="SELECT * from Voucher  Where TrangThai = 'A' OR TrangThai='P' "    
        request.query(str,function(err,database){
                res.send(database.recordset )
            
        })
    });
});
app.get("/list_loai",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT * FROM LoaiVoucher"
        request.query(loai,function(err,database){
                res.send(database.recordset)
            
        })
    })
})
app.get("/list_dc",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT * FROM DiaChi"
        request.query(loai,function(err,database){
                res.send(database.recordset)
           
        })
    })
})

app.get("/list_dc1",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT MaDiaChi FROM DiaChi"
        request.query(loai,function(err,database){
                res.send(database.recordset)
           
        })
    })
})
app.get("/ma",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT Dem=(Count(MaVoucher)+1) From Voucher"
        request.query(loai,function(err,database,result){
                res.send(database.recordset)
           
        })
    })
})


app.get("/list_dk",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT * FROM DieuKien"
        request.query(loai,function(err,database){
                res.send(database.recordset)
            
        })
    })
})

app.post("/add",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var bd = dateFormat(req.body.bd,"yyyy-mm-dd")
        var kt = dateFormat(req.body.kt,"yyyy-mm-dd")
        console.log(kt)
        var sl=Number(req.body.sl)
        var ptram=Number(req.body.ptram)
        var gia=req.body.gia
        var str = "INSERT INTO Voucher (MaVoucher, TenVoucher, SoLuong, NgayBatDau, NgayKetThuc, GiaTriSuDung, GiaTien, Hinh, TrangThai) Values('"+req.body.ma+"', '"+req.body.ten+"', "+sl+" , '"+bd+"', '"+kt+"',  "+ptram+", "+gia+", '"+req.body.hinh+"', 'P')";
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            console.log(err)

        })
        if(req.body.dk[0].check==true)
        {
            var str_1="INSERT INTO DieuKien (MaDieuKien, MaVoucher, LoaiDieuKien, GiaTri) Values('"+req.body.ma+"A"+"', '"+req.body.ma+"', '"+"A"+"', '"+req.body.dk[0].input+"')";
            request_1.query(str_1,function(err,database){ 
                console.log(err)
            })
        }
        if(req.body.dk[1].check==true)
        {
            var str_2="INSERT INTO DieuKien (MaDieuKien, MaVoucher, LoaiDieuKien, GiaTri) Values('"+req.body.ma+"B"+"', '"+req.body.ma+"', '"+"B"+"', '"+req.body.dk[1].input+"')";
            request_1.query(str_2,function(err,database){ 
                console.log(err)
            })
        }
        var count =0;
        req.body.dd.forEach(e => {
            count++;
            console.log(e)
            var diadiem="INSERT INTO DiaDiemApDung (MaCT_Voucher,MaVoucher,MaDiaChi) Values('"+req.body.ma+count+"', '"+req.body.ma+"', '"+e+"' )"
            request_1.query(diadiem,function(err,database){ 
                console.log(err)
            })
        });      
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
