 const User = require("../model/user");
 const bcrypt = require("bcrypt")
const {response,request}= require('express');
const Admin = require("../model/admin");




const controllerUser =  class{
static inscription = (req=request,res= response)=>{return res.render('inscription',{title:'inscription'}) }

static inscriptionPost = async(req=request,res=response)=>{ 
    console.log("mon utilisateur",req.body)
    const userOne = await User.findOne({email:req.body.email})
    if(userOne){
        res.render("inscription",{message1:"l'email existe deja"})
    }else{
        const  hashPassword = await bcrypt.hash(req.body.password,10)
        const createUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword
        })
        try {
            const saveUser = createUser.save()
            res.status(201).redirect("/connexion")
        } catch (error) {
            res.render('inscription',{message2:error.message})
        }
    }
    
}
static connexion = (req=request,res= response)=>{ return res.render('connexion')}
static connexionPost = async(req=request,res= response)=>{
    const email= req.body.email
    const password=req.body.password
    const emailsAdmin = 'admin@gmail.com'
    const passwordAdmin= 'admin23'
    
   
try {
    const user = await User.findOne({email})
    if (!user) {
      return  res.render('connexion',{message:"l'email nexiste pas"})
    }
    const verifPasswor =await bcrypt.compare(password,user.password)
    console.log(password,"mon pass",user.password);
    if (!verifPasswor) {
    return  res.render('connexion',{message:'mots de pass incorrect'})
    } 
        
    if(email === emailsAdmin && password === passwordAdmin) {
       return res.status(200).redirect("/admin/article")
    }
    return res.redirect('/index2')
    
} catch (error) {
    console.log(error);
}
 }
static profil = async(req=request,res= response)=>{ 
const userId= req.params.id
 try {
    const user = await User.findById(userId)
    console.log('mon utilisateur',user)
    return res.status(201).render('modif',{users:user})
 } catch (error) {
    console.log(error);
 }
    
    
}
static editer = (req=request,res= response)=>{ return res.render('modif',{title:'editer'})}
static indexs = (req=request,res=response)=>{return res.render('indexs',{title:'indexs'})}
static index2 = (req=request,res=response)=>{return res.render('index2')}
static anime =(req=request,res=response)=>{return res.render('anime',{title:'anime'})}
static anime2 =(req=request,res=response)=>{return res.render('anime2',{title:'anime2'})}
static filmsserie =(req=request,res=response)=>{return res.render('filmsserie',{title:'filmsserie'})}
static filmsserie2 =(req=request,res=response)=>{return res.render('filmsserie2',{title:'filmsserie2'})}
static meditation =(req=request,res=response)=>{return res.render('meditation',{title:'meditation'})}
static meditation2 =(req=request,res=response)=>{return res.render('meditation2',{title:'meditation2'})}
}
module.exports = controllerUser