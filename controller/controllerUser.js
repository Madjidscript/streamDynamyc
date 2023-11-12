 const User = require("../model/user");
 const Admin = require('../model/admin')
 const bcrypt = require("bcrypt")
const {response,request}= require('express');
const jsonwt = require("../middlewares/jwtoken");







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
            password:hashPassword,
            statut:req.body.statut
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
      
try {
    const user = await User.findOne({email})
    if (!user) {
      return  res.render('connexion',{message:"l'email nexiste pas"})
    }
    const verifPasswor =await bcrypt.compare(password,user.password)
    console.log(password,"mon pass",user.password);
    if (!verifPasswor) {
    return  res.render('connexion',{message:'mots de pass incorrect'})
    } else if(verifPasswor){
        const token = jsonwt.CreerToken(user._id)
        res.cookie('streamok',token)
        console.log("mon amo",token);
       
    }
        
    if(user.statut ==='A') {
        console.log("ma vie amoureuse est la")
       return res.status(200).redirect("/admin/article")
    }
    return res.redirect('/index2')
   
    
} catch (error) {
    console.log(error);
}
 }
static profil = async(req=request,res= response)=>{ 

    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
    const verifToken = jsonwt.VerifierToken(token)
    console.log("ma verification",verifToken);
      
      const id = verifToken.id
       console.log("je verifie",id);
      const user =await User.findById(id).exec()
     console.log("mon ami pour la vie",user);
     console.log("mon vrai non",user.name);
 
     return res.render('profil',{'users':user})
     
 
    
}
static editer = async(req=request,res= response)=>{ 
    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
    const verifToken = jsonwt.VerifierToken(token)
    console.log("ma verification",verifToken);
      
      const id = verifToken.id
       console.log("je verifie",id);
      const user =await User.findById(id).exec()
     console.log("mon ami pour la vie",user);
     console.log("mon vrai non",user.name);
 
     return res.render('modif',{'users':user})
     
 
}
static editerPost = async(req=request,res= response)=>{ 
   
    const id =req.params.id
    try {
    const user = await User.findByIdAndUpdate(id,req.body,{new:true})
    console.log("mon utilisateur a modifier",req.body)
    if (!user) {
      return  res.redirect("/editer/"+user.id)
    }else{
        return  res.redirect('/profil/'+user.id)
    }
    } catch (error) {
        console.log("modification error",error);
    }
}
static indexs = async(req=request,res=response)=>{
    
    try {
        const article = await Admin.find().exec()
        console.log("mon vrai article",article)
        res.render('indexs',{"articles":article})
    } catch (error) {
        console.log(error);
    }
    
}
static index2 = async(req=request,res=response)=>{
    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
   const verifToken = jsonwt.VerifierToken(token)
   console.log("ma verification",verifToken);
     
     const id = verifToken.id
      console.log("je verifie",id);
     const user =await User.findById(id).exec()
     
    console.log("mon ami pour la vie",user);
    console.log("mon vrai non",user.name);
    const article = await Admin.find().exec()
        console.log("mon vrai article",article)
    

    return res.render('index2',{'users':user,"articles":article})
    


}
static anime =async(req=request,res=response)=>{
    try {
        const article = await Admin.find().exec()
        console.log("mon vrai article",article)
        res.render("anime",{"articles":article})
    } catch (error) {
        console.log(error);
    }
}
static anime2 =async(req=request,res=response)=>{
    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
    const verifToken = jsonwt.VerifierToken(token)
    console.log("ma verification",verifToken);
      
      const id = verifToken.id
       console.log("je verifie",id);
      const user =await User.findById(id).exec()
     console.log("mon ami pour la vie",user);
     console.log("mon vrai non",user.name);
     const article = await Admin.find().exec()
     console.log("mon vrai article",article)
     return res.render('anime2',{'users':user,"articles":article})
     
}
static filmsserie =async(req=request,res=response)=>{
    try {
        const article = await Admin.find().exec()
        console.log("mon vrai article",article)
        res.render("filmsserie",{"articles":article})
    } catch (error) {
        console.log(error);
    }
}
static filmsserie2 =async(req=request,res=response)=>{
    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
    const verifToken = jsonwt.VerifierToken(token)
    console.log("ma verification",verifToken);
      
      const id = verifToken.id
       console.log("je verifie",id);
      const user =await User.findById(id).exec()
     console.log("mon ami pour la vie",user);
     console.log("mon vrai non",user.name);
     const article = await Admin.find().exec()
     console.log("mon vrai article",article)
     
     res.render('filmsserie2',{'users':user,"articles":article})
      
}
static meditation =async(req=request,res=response)=>{
   try {
    const article = await Admin.find().exec()
    console.log("mon vrai article",article)
    res.render("meditation",{"articles":article})
   } catch (error) {
    console.log(error);
   }
}
static meditation2 =async(req=request,res=response)=>{
    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
    const verifToken = jsonwt.VerifierToken(token)
    console.log("ma verification",verifToken);
      
      const id = verifToken.id
       console.log("je verifie",id);
      const user =await User.findById(id).exec()
     console.log("mon ami pour la vie",user);
     console.log("mon vrai non",user.name);
     const article = await Admin.find().exec()
     console.log("mon vrai article",article)
     
     return res.render('meditation2',{'users':user,"articles":article})
     
}
static deconnexion =(req=request,res=response)=>{
    console.log("papapapppa");
    res.clearCookie("streamok")
    res.redirect('/connexion')
}






}
module.exports = controllerUser