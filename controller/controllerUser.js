 const User = require("../model/user");
 const Admin = require('../model/admin')
 const bcrypt = require("bcrypt")
const {response,request}= require('express');
const jsonwt = require("../middlewares/jwtoken");
const otherUser = require("../other/user");







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
      return  res.render('connexion',{message2:"l'email nexiste pas"})
    }
    const verifPasswor =await bcrypt.compare(password,user.password)
    console.log(password,"mon pass",user.password);
    if (!verifPasswor) {
    return  res.render('connexion',{message3:'mots de pass incorrect'})
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
static detail2 =async(req=request,res=response)=>{
    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
    const verifToken = jsonwt.VerifierToken(token)
    console.log("ma verification",verifToken);
      
      const id = verifToken.id
       console.log("je verifie",id);
      const user =await User.findById(id).exec()
     console.log("mon ami pour la vie",user);
     console.log("mon vrai non",user.name);
     const ids = req.params.id
     const article = await Admin.findById(ids).exec()
     console.log("mon vrai article",article)
     
     return res.render('detail2',{'users':user,"articles":article})
     
}
static detail1 =async(req=request,res=response)=>{
    const id = req.params.id
    try {
     const article = await Admin.findById(id).exec()
     console.log("mon vrai article",article)
     res.render("detail1",{articles:article})
    } catch (error) {
     console.log(error);
    }
 }
static deconnexion =(req=request,res=response)=>{
    console.log("papapapppa");
    res.clearCookie("streamok")
    res.redirect('/connexion')
}

//mes texte hooooooooooooooooooooooooooooooooooooooooooo

static texte =(req=request,res=response)=>{
    const affiche = otherUser.afficheTout()
    console.log("monafichage wesh",affiche)
    res.render("texte",{"affiches":affiche})
}
 static texte1 = async(req= request,res=response)=>{
    const id =req.params.id
    const uniqueUtilisateur = await otherUser.utilisarteuParID(id)
    console.log("mon unique utilisateur", uniqueUtilisateur);
    res.send({"affiches":uniqueUtilisateur})
 }
 static texte2 = async (req=request,res =response)=>{
    const email = req.body.email
    const utilisateurParMail = await otherUser.utilisateurParEmail(email)
    console.log('mon utilisateur par mail',utilisateurParMail);
    res.send({"affiches":utilisateurParMail})
 }
 static inscription2 = async(req=request,res=response)=>{
    const email = req.body.email
    const password =req.body.password
    const verifemail = await otherUser.utilisateurParEmail(email)
    console.log("mon email",verifemail);
    if(verifemail){
        res.send({"ereur1":"utilisateur existe"})
    }
    const hashepwd = await bcrypt.hash(password,10)
    const data =(  {
        name:req.body.name,
        email:req.body.email,
        password:hashepwd,
        statut:req.body.statut
    })
    const enregistrer = await otherUser.inscription(data)
    console.log("mon utilisateur inscrit",enregistrer);
    res.send({'utilisateur':enregistrer})
 }

 static texte3 = async(req= request,res=response)=>{
    const id =req.params.id
    const uniqueUtilisateurs = await otherUser.suppression(id)
    console.log("mon unique utilisateur", uniqueUtilisateurs);
    res.send({"affiches":uniqueUtilisateurs})
 }

 static texte4 = async(req= request,res=response)=>{
    const id =req.params.id
    const password = await req.body.password
    const hashepwd = await bcrypt.hash(password,10)
    const data = {
        name:req.body.name,
        email:req.body.email,
        password:hashepwd,
        statut:req.body.statut

    }
    console.log("mes doner",id,data);
    const uniqueUtilisateur = await otherUser.update(id,data,{new:true})
     console.log("mon unique utilisateur", uniqueUtilisateur);
    res.send({"affiches":uniqueUtilisateur})
 }




}
module.exports = controllerUser