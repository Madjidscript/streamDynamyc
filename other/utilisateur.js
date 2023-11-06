// const {response,request}=require('express')
// const User = require('../model/user')
// const bcrypt= require('bcrypt')

// const utilisateur = class {
// static inscritUser = async(req=request,res=response)=>{
//     console.log("mon utilisateur",req.body)
//     const userone = await User.findOne({email:req.body.email})
//     if (userone) {
//         res.render('inscription',{message1:"l'email existe deja"})
//     } else {
//         const hashPassword = await bcrypt.hash(req.body.password,10)
//         const createUser = new User({
//             name:req.body.name,
//             email:req.body.email,
//             password:hashPassword
//         })
//         try {
//             const saveUser = await createUser.save()
//             res.status(201).redirect("/connexion")
//         } catch (error) {
//             res.status(400).render('inscription',{message2:error.message})
//         }
       
//     }
// }
// }
// module.exports = utilisateur



