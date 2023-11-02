const User = require("../model/user");
const bcrypt = require("bcrypt")
const {response,request}= require('express')


const controllerUser =  class{
static inscription = (req=request,res= response)=>{return res.render('inscription',{title:'inscription'}) }
static inscriptionPost = async(req=request,res=response)=>{
    console.log('mon utilisateur',req.body)
    const userone = await User.findOne({email:req.body.email})
    if (userone) {
        res.render("inscription",{message1:"l'email que vous aves entrer existe deja"})
    } else {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        console.log('mon password hashe' ,hashPassword);
        
          const createUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword
          })
        try {
            const saveUser = await createUser.save()
            res.status(201).redirect("/connexion")
        } catch (error) {
            res.status(400).render('inscription',{message2:error.message})
            console.log(error.message);
        }
    }
}
static connexion = (req=request,res= response)=>{return res.render('connexion',{title:'connexion'}) }
static profil = (req=request,res= response)=>{ return res.render('profil',{title:'profil'})}
static editer = (req=request,res= response)=>{ return res.render('modif',{title:'editer'})}
static indexs = (req=request,res=response)=>{return res.render('indexs',{title:'indexs'})}
static index2 = (req=request,res=response)=>{return res.render('index2',{title:'index2'})}
static anime =(req=request,res=response)=>{return res.render('anime',{title:'anime'})}
static anime2 =(req=request,res=response)=>{return res.render('anime2',{title:'anime2'})}
static filmsserie =(req=request,res=response)=>{return res.render('filmsserie',{title:'filmsserie'})}
static filmsserie2 =(req=request,res=response)=>{return res.render('filmsserie2',{title:'filmsserie2'})}
static meditation =(req=request,res=response)=>{return res.render('meditation',{title:'meditation'})}
static meditation2 =(req=request,res=response)=>{return res.render('meditation2',{title:'meditation2'})}
}
module.exports = controllerUser