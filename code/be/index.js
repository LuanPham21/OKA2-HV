var sql = require('mssql');

// var config = {  
//     server: 'LAPTOP-32R6HKKQ\SQLEXPRESS',

//     userName: 'hieu1811', //update me
//     password: 'd18112000',  //update me
//     database:'QLVoucher',
//    port:1433,
//     options: {
//         // If you are on Microsoft Azure, you need encryption:
//         encrypt: true,
//           //update me
//         enableArithAbort: true
//     }
// };   `
// const config: ConnectionConfig = {
//   server: 'LAPTOP-32R6HKKQ\\SQLEXPRESS',
//   user: 'hieu1811',
//   password: 'd18112000',
  
//   "options": {
//     "encrypt": true,
//     "enableArithAbort": true
//   }
// };



const config = {
server: 'LAPTOP-32R6HKKQ\\SQLEXPRESS',
authentication: { type: 'default', options: { userName: 'hieu1811', password: 'd18112000' } },
database:"QLVoucher",
options: { encrypt:false,"enableArithAbort": true, port: 1433 }
}


sql.connect(config,(err,result)=>{
  console.table(result)
});

