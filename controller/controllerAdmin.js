
const {request,response}= require('express') 
const Admin = require('../model/admin')
var path = require('path');
const User = require('../model/user');
const jsonwt = require("../middlewares/jwtoken");


const controllerAdmin = class {
    
static article = async(req=request,res=response)=>{
    const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
    const verifToken = jsonwt.VerifierToken(token)
    console.log("ma verification",verifToken);
      
      const id = verifToken.id
       console.log("je verifie",id);
      const user =await User.findById(id).exec()
      
     console.log("mon ami pour la vie",user);
     console.log("mon vrai non",user.name);
     return res.render('article',{'users':user})
     
 
}
    static articlePost = (req=request,res=response)=>{
         const image = req.files.image[0].path
         const video = req.files.video[0].path
    
        const createArticle = new Admin({
            image:image,
            video:video,
            categorie:req.body.categorie
        })
        try {
            const saveArticle = createArticle.save()
            res.status(201).render('article')
        } catch (error) {
            console.log("erreur1 article",error)
        }

    }
    
    static listearticle = async (req=request,res=response)=>{
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
         
     
         return res.render('listeAticle',{'users':user,"articles":article})
         
     
     
    }
    static utilisateur = async (req= request,res=response)=>{
        const token = req.cookies.streamok //cette partie  nous permet dappeller notre cookie qui a pour non streamok
        const verifToken = jsonwt.VerifierToken(token)
        console.log("ma verification",verifToken);
          
          const id = verifToken.id
           console.log("je verifie",id);
          const user = await User.findById(id).exec()
          
         console.log("mon ami pour la vie",user);
         console.log("mon vrai non",user.name);
         const userTout = await User.find().exec()
             console.log("mon vrai article",userTout)
         
     
         return res.render('listeUtilisateur',{'users':user,'utilisateur':userTout})
         
     
     
    }
    static update= async(req=request,res=response)=>{
        const token = req.cookies.streamok
        const verifToken = jsonwt.VerifierToken(token)
        console.log("ma verification",verifToken);
          
          const id = verifToken.id
           console.log("je verifie",id);
          const user = await User.findById(id).exec()
          
         console.log("mon ami pour la vie",user);
         console.log("mon vrai non",user.name);
         const id2 = req.params.id
         const article = await Admin.findById(id2).exec()
             console.log("mon vrai article",article)
         
         return res.render('update',{'users':user,'articles':article})
    }
    static updatePost= async(req=request,res=response)=>{
        const image = req.files.image.path
         const video = req.files.video.path
        const id =req.params.id
        try {
        const article = await Admin.findByIdAndUpdate(id,{
            image:image,
            video:video,
            categorie:req.body.categorie
        },
        {new:true})
        console.log("mon utilisateur a modifier",req.body)
        if (!article) {
          return  res.redirect("/admin/update/"+article.id)
        }else{
            return  res.redirect('/admin/listearticle')
        }
        } catch (error) {
            console.log("modification error",error);
        }


        
    }
    static delete1= async(req=request,res=response)=>{
        
         
        const id = req.params.id
        try {
            
             await User.findByIdAndRemove(id);
            res.redirect('/admin/utilisateur'); 
          } catch (error) {
            console.error(error);
            res.status(500).send('Erreur du serveur');
          }
        };
       
    static delete2=async (req=request,res=response)=>{
        const id = req.params.id
        try {
            
             await Admin.findByIdAndRemove(id);
            res.redirect('/admin/listearticle'); 
          } catch (error) {
            console.error(error);
            res.status(500).send('Erreur du serveur');
          }
        }
    
    
     
}
module.exports= controllerAdmin





