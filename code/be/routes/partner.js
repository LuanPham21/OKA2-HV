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
var partner ="MP001     "
const date = Date.now();
let today= new Date(date);
var today_1 = dateFormat(today,"yyyy-mm-dd")


var maPartner

app.post("/getma",(req,res)=>{
    maPartner=req.body.ma
})

app.get("/list",(req,res)=>{
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

        var str ="SELECT * from Voucher  Where TrangThai = 'A' OR TrangThai='P' "    
        request.query(str,function(err,database){
            
            
                res.send(database.recordset)
            
                
            
        })
    });
});

app.get("/list_dc",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var request=new sql.Request();
        var loai="SELECT * FROM DiaChi WHERE MaPartner = '"+maPartner+"'"
        
        request.query(loai,function(err,database){
            if(database!=null)
            {
                res.send(database.recordset)
            }
                
           
        })
    })
})

// app.get("/list_dc1",(req,res)=>{
//     sql.connect(config,(err,result)=>{
//         var request=new sql.Request();
//         var loai="SELECT MaDiaChi FROM DiaChi"
//         request.query(loai,function(err,database){
//                 res.send(database.recordset)
           
//         })
//     })
// })
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
        var sl=Number(req.body.sl)
        var ptram=Number(req.body.ptram)
        var gia=req.body.gia
        var str = "INSERT INTO Voucher (MaVoucher, TenVoucher, SoLuong, NgayBatDau, NgayKetThuc, GiaTriSuDung, GiaTien, Hinh, TrangThai, MaPartner) Values('"+req.body.ma+"', N'"+req.body.ten+"', "+sl+" , '"+bd+"', '"+kt+"',  "+ptram+", "+gia+", '"+req.body.hinh+"', 'P', '"+maPartner+"')";
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            console.log(err)
        })
        console.log(req.body.dk)
        var input
        if(req.body.dk[0].check==true)
        {
            input= Number(req.body.dk[0].input)
            console.log(input)
            var str_1="INSERT INTO DieuKien (MaDieuKien, MaVoucher, LoaiDieuKien, GiaTri) Values('"+req.body.ma+"A"+"', '"+req.body.ma+"', 'A', "+input+")";
            request_1.query(str_1,function(err,database){ 
                console.log(err)
            })
        }
        if(req.body.dk[1].check==true)
        {
            input= Number(req.body.dk[1].input)
            var str_2="INSERT INTO DieuKien (MaDieuKien, MaVoucher, LoaiDieuKien, GiaTri) Values('"+req.body.ma+"B"+"', '"+req.body.ma+"', 'B', "+input+")";
            request_1.query(str_2,function(err,database){ 
            })
        }
        var count =0;
        req.body.dd.forEach(e => {
            count++;
            var diadiem="INSERT INTO DiaDiemApDung (MaCT_Voucher,MaVoucher,MaDiaChi) Values('"+req.body.ma+count+"', '"+req.body.ma+"', '"+e+"' )"
            request_1.query(diadiem,function(err,database){ 
            })
        });      
    })
})
app.post("/pre_edit",(req,res)=>{
    // var str = "UPDATE Voucher SET TenVoucher='"+req.ten+"' MaLoaiVoucher= '"+req.loai+"' SoLuong= "+req.soluong+"' NgayBatDau= "+req.ngay1+" NgayKetThuc= "+req.ngay2+" GiaTriSuDung= "+req.giatri+" GiaTien= "+req.gia+" Hinh= '"+req.hinh+"'  WHERE MaVoucher ='"+req.ma+"'";
    // var request_1=new sql.Request();
    // request_1.query(str,function(err,database){ 
    // })
    sql.connect(config,(err,result)=>{
        var str ="SELECT * FROM Voucher WHERE MaVoucher = '"+req.body.id+"'"
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            res.send(database.recordset)
        })
    })
    

});

app.post("/pre_editdc",(req,res)=>{
    // var str = "UPDATE Voucher SET TenVoucher='"+req.ten+"' MaLoaiVoucher= '"+req.loai+"' SoLuong= "+req.soluong+"' NgayBatDau= "+req.ngay1+" NgayKetThuc= "+req.ngay2+" GiaTriSuDung= "+req.giatri+" GiaTien= "+req.gia+" Hinh= '"+req.hinh+"'  WHERE MaVoucher ='"+req.ma+"'";
    // var request_1=new sql.Request();
    // request_1.query(str,function(err,database){ 
    // })
    sql.connect(config,(err,result)=>{
        var str ="SELECT d.MaDiaChi, d.MaPartner, d.So , d.TenDuong, d.TenQuan, d.TenTP, d.TrangThai FROM DiaChi d  INNER JOIN DiaDiemApDung c  ON c.MaDiaChi=d.MaDiaChi WHERE c.MaVoucher = '"+req.body.id+"'"
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            res.send(database.recordset)
        })
    })
    

});


app.post("/pre_editdk",(req,res)=>{
    // var str = "UPDATE Voucher SET TenVoucher='"+req.ten+"' MaLoaiVoucher= '"+req.loai+"' SoLuong= "+req.soluong+"' NgayBatDau= "+req.ngay1+" NgayKetThuc= "+req.ngay2+" GiaTriSuDung= "+req.giatri+" GiaTien= "+req.gia+" Hinh= '"+req.hinh+"'  WHERE MaVoucher ='"+req.ma+"'";
    // var request_1=new sql.Request();
    // request_1.query(str,function(err,database){ 
    // })
    sql.connect(config,(err,result)=>{
        var con=[{check:false,input:''},{check:false,input:''}]
        var str ="SELECT * FROM DieuKien WHERE MaVoucher = '"+req.body.id+"'"
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
            
            database.recordset.forEach(element => {
                if(element.LoaiDieuKien=="A ")
                {
                    con[0]={
                        check: true,
                        input: element.GiaTri.toString()
                    }
                }
                else if(element.LoaiDieuKien=="B ")
                {
                    con[1]={
                        check: true,
                        input: element.GiaTri.toString()
                    }
                }
            });
            res.send(con)
        })
    })
    

});


app.post("/edit",(req,res)=>{
    sql.connect(config,(err,result)=>{
        
        var sl=Number(req.body.sl)
        console.log(req.body.ma)
        var ptram=Number(req.body.ptram)
        var gia=req.body.gia
        var str = "UPDATE Voucher SET TenVoucher= N'"+req.body.ten+"', SoLuong= "+sl+", GiaTriSuDung= "+ptram+", GiaTien= "+gia+", Hinh= '"+req.body.hinh+"'  WHERE MaVoucher = '"+req.body.ma+"'";
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
        })
        var dk = "DELETE FROM DieuKien WHERE MaVoucher='"+req.body.ma+"'";
        var dc= "DELETE FROM DiaDiemApDung WHERE MaVoucher ='"+req.body.ma+"'"
        request_1.query(dk,function(err,database){ 
        })
        request_1.query(dc,function(err,database){ 
        })
        var input
        console.log(req.body.dk)
        if(req.body.dk[0].check==true)
        {
            input=Number(req.body.dk[0].input)
            console.log(req.body.dk[0])
            var str_1="INSERT INTO DieuKien (MaDieuKien, MaVoucher, LoaiDieuKien, GiaTri) Values('"+req.body.ma+"A"+"', '"+req.body.ma+"', 'A ', "+input+")";
            console.log(req.body.ma+"A")
            console.log(req.body.ma)
            console.log(input)
            request_1.query(str_1,function(err,database){ 
                // console.log(err)
            })
        }
        if(req.body.dk[1].check==true)
        {
            input=Number(req.body.dk[1].input)
            console.log(input)
            var str_2="INSERT INTO DieuKien (MaDieuKien, MaVoucher, LoaiDieuKien, GiaTri) Values('"+req.body.ma+"B"+"', '"+req.body.ma+"', 'B ', "+input+")";
            request_1.query(str_2,function(err,database){ 
                // console.log(err)
            })
        }
        var count =0;
        req.body.dd.forEach(e => {
            count++;
            var diadiem="INSERT INTO DiaDiemApDung (MaCT_Voucher,MaVoucher,MaDiaChi) Values('"+req.body.ma+count+"', '"+req.body.ma+"', '"+e+"' )"
            request_1.query(diadiem,function(err,database){ 
                // console.log(err)
            })
        }); 
    })
    
});

app.post("/delete",(req,res)=>{
    sql.connect(config,(err,result)=>{
        var str = "UPDATE Voucher SET TrangThai= 'U' WHERE MaVoucher ='"+req.body.ma+"'";
        var request_1=new sql.Request();
        request_1.query(str,function(err,database){ 
        })
    })
    
});

app.post("/search",(req,res)=>{
    
    sql.connect(config,(err,result)=>{
        
        var str = "SELECT * FROM Voucher WHERE TenVoucher LIKE'%"+req.body.ma+"%' AND (TrangThai = 'A' OR TrangThai='P' )";
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
