var express = require('express');
const controllerUser = require('../controller/controllerUser');
const jsonwt = require('../middlewares/jwtoken');

var router = express.Router();


/* GET users listing. */
router.get('/inscription', controllerUser.inscription);
router.post('/inscription', controllerUser.inscriptionPost)
router.get('/connexion',controllerUser.connexion);
router.post('/connexion',controllerUser.connexionPost);
router.get('/profil/:id',jsonwt.requireAuth,controllerUser.profil);
router.get('/editer/:id',jsonwt.requireAuth,controllerUser.editer);
router.post('/editer/:id',jsonwt.requireAuth,controllerUser.editerPost);
router.get('/',controllerUser.indexs);
router.get('/index2',jsonwt.requireAuth,controllerUser.index2);
router.get('/anime',controllerUser.anime);
router.get('/anime2',jsonwt.requireAuth,controllerUser.anime2);
router.get('/meditation',controllerUser.meditation);
router.get('/meditation2',jsonwt.requireAuth,controllerUser.meditation2);
router.get('/filmsserie',controllerUser.filmsserie);
router.get('/filmsserie2',jsonwt.requireAuth,controllerUser.filmsserie2);
router.get('/detail2/:id',jsonwt.requireAuth,controllerUser.detail2);
router.get('/detail1/:id',controllerUser.detail1);
router.get('/deconnexion',controllerUser.deconnexion);
//mes texte hooooooàààoooooooooooooooooooooooooooooooooooooooooooooooooooooo
router.get('/texte',controllerUser.texte);
router.get('/texte1/:id',controllerUser.texte1);
router.delete('/texte3/:id',controllerUser.texte3);
router.put('/texte4/:id',controllerUser.texte4);
router.get('/texte2',controllerUser.texte2);
router.post('/inscription2',controllerUser.inscription2);










module.exports = router;

