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
    res.render("index");
});

app.post("/form", (req, res) =>{
    var {email, nome, pontos} = req.body;

    var emailError;
    var nomeError;
    var pontoError;

    if(email == undefined || email == ""){
        emailError = "O email está vazio"
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome está vazio"
    }

    if(pontos == undefined || pontos == ""){
        pontoError = "Os pontos estão vazios"
    }

    if(emailError != undefined || pontoError != undefined || nomeError != undefined){
        res.send("Error" + " " + emailError + " " +  pontoError + " " +  nomeError)
    }else{
        res.send("Feito")
    }
})




app.listen(8080, (req, res) =>{
    console.log("Servidor Ok!");
});