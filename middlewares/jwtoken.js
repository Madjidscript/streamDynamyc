const jwt = require('jsonwebtoken');
const User = require('../model/user');

const jsonwt = class{
    static CreerToken = (id)=>{
        let dataUser ={id};
        console.log("mon ami fidele",dataUser.id);
        console.log("voit mon id",id);
        const token = jwt.sign(dataUser, 'macléetoken',{ expiresIn:'2h' });
        console.log(token);
        return token;
      
    }

    static VerifierToken=(token)=>{
       

        try {
            const decodedToken = jwt.verify(token, 'macléetoken');
            console.log(decodedToken) 
            return decodedToken
        } catch (error) { 
            console.log('Token non valide');
        }
    }

    static requireAuth= (req,res,next)=>{
        const token = req.cookies.streamok
            
        if (token) {
            jwt.verify(token, 'macléetoken',async(err,decodedToken) =>{
                if (err) {
                    console.log(err.message);
                    res.redirect('/connexion')
                    
                } else {
                    console.log("decodedTokenn",decodedToken);
                    if( req.url ==='/connexion'|| req.url ==="/inscription" || req.url ==="/indexs" || req.url ==="/anime" 
                    || req.url ==="/meditation" || req.url ==="/filmsserie"){
                        console.log("mon chemin",req.url);
                       res.redirect("/index2")
                    }else if(req.url ==="/deconnexion"){
                        console.log("yoyoyoyoyoy");
                        res.redirect("/connexion")

                    }else{
                        next()
                    }
                   
                    
                }
            });
        } else {
            res.redirect('/connexion')
        }
        
    }
}


module.exports=jsonwt;