const mongoose = require('mongoose');
const validator = require('validator')

const Admin = mongoose.model("Admin",{
    image:{
        type:String,
        require:true,
    },
    video:{
        type:String,
        require:true,
    },
    categorie:{
     type:String,
     require:true
    }
})
module.exports = Admin