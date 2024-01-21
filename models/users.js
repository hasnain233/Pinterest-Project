const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");


const connect = mongoose.connect("mongodb://127.0.0.1:27017/pinproject");

const userSchema =new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String
    },
    email : {
        type : String ,
        required : true,
        unique : true
    },
    fullname :{
        type : String,
        required : true
    },
    post : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "post"
    }],
    dp : {
        type : String
    }
});
userSchema.plugin(plm);

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;