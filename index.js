var express = require("express");
var app = express();
var flash = require("express-flash");
var session = require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//view engine
app.set('view engine', 'ejs');

app.use(cookieParser("asdasdasd"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());


app.get("/", (req, res) =>{
    var emailError = req.flash("emailError");
    var nomeError = req.flash("nomeError");
    var pontosError = req.flash("pontosError");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;

    res.render("index",{emailError, nomeError, pontosError, email: req.flash("email"),  nome: req.flash("nome"), pontos: req.flash("pontos")});
});

app.post("/form", (req, res) =>{
    var {email, nome, pontos} = req.body;

    var emailError;
    var nomeError;
    var pontosError;

    if(email == undefined || email == ""){
        emailError = "O email está vazio"
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome está vazio"
    }

    if(pontos == undefined || pontos == ""){
        pontosError = "Os pontos estão vazios"
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        req.flash("pontosError", pontosError);

        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("pontos", pontos);
        res.redirect("/");
    }else{
        res.send("Feito");
    }
})




app.listen(8080, (req, res) =>{
    console.log("Servidor Ok!");
});