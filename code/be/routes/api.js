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

