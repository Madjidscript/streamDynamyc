const mongoose = require('mongoose');
const validator = require('validator')

const Admin = mongoose.model("Admin",{
    image:{
        type:String,
        required:true,
        unique:true
    },
    video:{
        type:String,
        required:true,
        unique:true
    },
    categorie:{
     type:String,
     required:true
    }
})
module.exports = Admin