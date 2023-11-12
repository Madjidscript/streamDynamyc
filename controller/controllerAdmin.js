
const {request,response}= require('express') 
const Admin = require('../model/admin')
var path = require('path');


const controllerAdmin = class {
    
static article = async(req=request,res=response)=>{return res.render('article')}
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
    static update= (req=request,res=response)=>{return res.render('update')}
    static delete= (req=request,res=response)=>{return res.render('utilisateur')}
    static updatePost= (req=request,res=response)=>{return res.render('update')}
     static utilisateur = (req= request,res=response)=>{return res.render('utilisateur')}
}
module.exports= controllerAdmin





