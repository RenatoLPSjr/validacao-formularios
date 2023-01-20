var express = require("express");
var app = express();
var flash = require("express-flash");
var session = require("express-session");
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//view engine
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(flash());


app.get("/", (req, res) =>{
    console.log("Está rodando");
    res.send("Tudo ok")
})




app.listen(8080, (req, res) =>{
    console.log("Servidor Ok!");
});