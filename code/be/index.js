var express = require('express');
var cors=require("cors");
var path = require('path');

var Customer = require('./routes/customer');
var Partner = require("./routes/partner");
var Test = require("./routes/login");
var app = express();

app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.listen(9000, ()=>{
  console.log("running on port 9000");
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/customer', Customer);
app.use('/partner', Partner);
app.use('/login', Test);
// app.use("/testAPI",testAPIRouter);