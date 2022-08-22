const express = require('express');
const app = express();

app.use(express.static(__dirname));

const bodyParser = require('body-parser');

const exp = require('constants');

// const expressSession = require('express-session')({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(expressSession);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Registration = mongoose.model('Registration');

//const userCode = mongoose.model('Registration', userInformation);

passport.use(userCode.createStrategy());

passport.serializeUser(userCode.serializeUser());
passport.deserializeUser(userCode.deserializeUser());

const connectEnsureLogin = require('connect-ensure-login');


const path = require('path');
const auth = require('http-auth');
const { check, validationResult } = require('express-validator');




const router = express.Router();
//const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

// router.get('/', (req, res) => {
//     //res.send('It works!');
//     res.render('register', { title: 'Registration form' });
// });

router.get('/', (req, res) => {
    //res.send('It works!');
    res.render('login', {
      title: 'Registration form'
    });
  });

  router.get('/artists', (req, res) => {
    //res.send('It works!');
    res.render('artists', {
      title: 'artists list'
    });
  });


  router.post('/xxx',
  [
    check('email')
    .isLength({
      min: 1
    })
    .withMessage('Please enter an email'),
    check('psw')
    .isLength({
      min: 1
    })
    .withMessage('Please enter a password'),
  ],
  (req, res) => {
    //save user register info into database
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => {
          res.render('artists')
          //calling file no /
        })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    } else {
      res.render('register', {
        title: 'resgiter',
        errors: errors.array(),
        data: req.body,
      });
    }
  });



  //LOGIN 
  app.post('/login', (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login?info=' + info);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/');
            });
        })(req, res, next);
});

  module.exports = router;






