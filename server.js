const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MondoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const fs = require("fs");
const alert = require('alert');

var url = "mongodb://localhost:27017/";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

var dbdata = [];
var err = "";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("covid");
    dbo.collection("cases").find().toArray(function(err, result){
        if(err) throw err;
        for(i of result){
            dbdata.push(i);
        }
        // console.log(dbdata);
        db.close();
        fs.writeFile('./Cases/Casesdata.json', JSON.stringify(dbdata, null, 2), err => {
            if(err) throw err;
            console.log("New data added");
        });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post("/", (req, res) => {
    const {name, pass} = req.body;
    console.log(name, pass);
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("covid");
        const check = dbo.collection("user");
        check.find({'uname': name, 'pass': pass}).toArray((err, result) => {
            if(err) throw err;
            if(result.length == 1){
                res.redirect('/home');
            }
            else{
                alert("Invalid username/password, please try again!");
            }
        });
    });
});

app.use(express.static('Home'));
app.use(express.static('Cases'));
app.use(express.static('Blogs'));
app.use(express.static('Vaccine'));
app.use(express.static('Web tech project all'));

app.get("/home", function(req, res){
    res.sendFile(path.join(__dirname, "/Home/Home.html"));
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "/Home/About.html"));
});

app.get("/symptom", function(req, res){
    res.sendFile(path.join(__dirname, "/Home/Symp.html"));
});

app.get("/cases", function(req, res){
    res.sendFile(path.join(__dirname, "/Cases/Cases.html"));
});

app.get("/blogs", function(req, res){
    res.sendFile(path.join(__dirname, "/Blogs/Blogs.html"));
});

app.get("/vaccine", function(req, res){
    res.sendFile(path.join(__dirname, "/Vaccine/Vaccine.html"));
});

app.get("/guidelines", function(req, res){
    res.sendFile(path.join(__dirname, "/Web tech project all/WEBTECHPROJECT GUIDLINES.html"));
});

app.get("/precautions", function(req, res){
    res.sendFile(path.join(__dirname, "/Web tech project all/WEBTECHPROJECT PREACTIONS.html"));
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});
