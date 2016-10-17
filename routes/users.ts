import * as express from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import User from '../models/user';
//var expressJwt = require('express-jwt');
import * as jwt from 'jsonwebtoken';


let router = express.Router();
let LocalStrategy = passportLocal.Strategy;

// passport configuration
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({ username: username.trim() }).then(function(user){
        if(!user) return done(null, false, { message: 'incorrect username'});

        if(!user.validatePassword(password)) return done(null, false, { message: 'password does not patch'});

        user.password = null;
        return done(null, user);
    }).catch((err)=>{
        return done(err);
    });
}));

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.send("not authenticated");
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



// Register
router.post('/register', (req, res)=>{
    req.checkBody('username', 'Email is required').notEmpty();
    req.checkBody('username', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.status(400).send(errors);
    } else {
        let newUser = new User();
        newUser.username = req.body.username;
        // newUser.password = req.body.password;
        // newUser.setPassword(newUser, (function(req, res){
        //     res.send(newUser);
        // })(req, res));
        newUser.setPassword(req.body.password);
        newUser.save().then((newUser)=>{
            res.send(newUser);
        }).catch((err)=>{
            res.send(err);
        })
    }
});

router.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login'}),
    function(req, res){
        if(req.isAuthenticated()){
            let token = { token: req.user.generateToken()};
            res.send(token);
        } else {
            res.send("you are not authenticated");
        }
    });

    router.get('/logout', (req, res)=>{
        req.logout();
        res.send(200);
    });

    export default router;
