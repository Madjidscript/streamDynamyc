var express = require('express');
const controllerUser = require('../controller/controllerUser');

var router = express.Router();


/* GET users listing. */
router.get('/inscription', controllerUser.inscription);
router.post('/inscription', controllerUser.inscriptionPost)
router.get('/connexion',controllerUser.connexion);
router.post('/connexion',controllerUser.connexionPost);
router.get('/profil/:id',controllerUser.profil);
router.get('/editer',controllerUser.editer);
router.get('/indexs',controllerUser.indexs);
router.get('/index2',controllerUser.index2);
router.get('/anime',controllerUser.anime);
router.get('/anime2',controllerUser.anime2);
router.get('/meditation',controllerUser.meditation);
router.get('/meditation2',controllerUser.meditation2);
router.get('/filmsserie',controllerUser.filmsserie);
router.get('/filmsserie2',controllerUser.filmsserie2);






module.exports = router;

