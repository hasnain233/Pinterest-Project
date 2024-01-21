var express = require('express');
var router = express.Router();
var {getHomePage,
  getRegister,
  getProfile,
  postRegister,
  getLogout
} = require("../controllers/users")
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var multer = require("multer");
var upload = require("./multer");

var usermodel = require("../models/users");
//var postmodel = require("./post");

passport.use(new localStrategy(usermodel.authenticate()))

/* GET home page. */
router.get('/', getHomePage);

router.get("/register", getRegister);

router.get("/profile",isLogged,getProfile);

router.post("/register",postRegister);

router.post("/login",passport.authenticate("local", {
  failureRedirect : "/",
  successRedirect : "/profile" 
}),function(req,res){});

router.get("/logout", getLogout)

function isLogged(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}

router.post("/fileupload",isLogged,upload.single("images"),async function(req,res){
  const user = await usermodel.findOne({username : req.session.passport.user});
  user.dp = req.file.filename;
  await user.save();
  res.redirect("/profile");
})



module.exports = router;
