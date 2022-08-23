const express = require('express');
const expSession =  require('express-session');
const app =  express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser  =  require("body-parser");
const LocalStrategy =  require("passport-local");
const passportLocalMongoose =  require("passport-local-mongoose");
const router = express.Router();

const Registration = mongoose.model('Registration');
router.use(expSession ({
    secret:"mysecret",       //decode or encode session
    resave: false,          
    saveUninitialized:true,
    cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 60 * 1000 // 10 minutes
    }
}));

passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());
passport.use(new LocalStrategy(Registration.authenticate()));

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());




//Home
router.get('/', (req, res) => {
    //res.send('It works!');
    res.render('home', {
      title: 'Home Page'
    });
});

//Artists
router.get('/artists', (req, res) => {
  //res.send('It works!');
  res.render('artists', {
    title: 'artists list'
  });
});

//Register
router.get('/register', (req, res) => {
  //res.send('It works!');
  res.render('register', {
    title: 'Register Form'
  });
});

//Login
router.get('/login', (req, res) => {
  //res.send('It works!');
  res.render('login', {
    title: 'Login Form'
  });
});

//Register User
  router.post('/xxx',
 
  (req, res) => {
    //const errors = validationResult(req);
    //save user register info into database
    Registration.register(new Registration({
      username: req.body.username,
      email: req.body.email
    }),
      req.body.password,
      function(err,registration){
        if(err){
            console.log(err);
            res.render("register");
            /*res.render("register", {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });*/
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/login");
        })    
      }
    )
  });

//login 
// router.post("/xx1",passport.authenticate("local",{
//     successRedirect:"/artists",
//     failureRedirect:"/login"
// }),function (req, res){
// });

  //LOGIN 
  router.post('/xx1', (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login' + info);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/artists');
            });
        })(req, res, next);
});

module.exports = router;






