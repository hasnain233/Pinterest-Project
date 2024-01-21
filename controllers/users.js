//var passport = require("passport");
//var localStrategy = require("passport-local").Strategy;

var usermodel = require("../models/users");

//passport.use(new localStrategy(usermodel.authenticate()));

function getHomePage(req, res, next) {
    res.render('index');
  };

function getRegister(req,res){
    res.render("register");
  }

async function getProfile(req,res){
    const user = await usermodel.findOne({username : req.session.passport.user})
    res.render("profile",{user})
  }  

function postRegister(req,res){
    const userCreate =new usermodel({
      username : req.body.username,
      email : req.body.email,
      fullname : req.body.fullname,
      
    });
    usermodel.register(userCreate,req.body.password)
    .then(function(){
      passport.authenticate("local")(req,res,function(){
        res.redirect("/profile")
      });
    });
  } 

function getLogout(req,res,next){
    req.logOut(function(err){
      if(err) return next(err);
      res.redirect("/");
    });
  }  
module.exports = {
    getHomePage,
    getRegister,
    getProfile,
    postRegister,
    getLogout
};