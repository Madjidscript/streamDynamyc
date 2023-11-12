const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model("User",{
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
statut:{
    type:String,
}
})
module.exports = User