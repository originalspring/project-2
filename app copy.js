const express = require('express');
const passport = require('passport');
const Registration = require('./models/Registration')
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

//app.use(expressSession);




//views folder important//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);




//login
// app.get("/login",(req,res)=>{
//     res.render("login");
// });

// app.post("/xx1",passport.authenticate("local",{
//     successRedirect:"/artists",
//     failureRedirect:"/login"
// }),function (req, res){
// });

module.exports = app;