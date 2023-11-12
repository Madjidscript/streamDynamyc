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
router.get('/indexs',controllerUser.indexs);
router.get('/index2',jsonwt.requireAuth,controllerUser.index2);
router.get('/anime',controllerUser.anime);
router.get('/anime2',jsonwt.requireAuth,controllerUser.anime2);
router.get('/meditation',controllerUser.meditation);
router.get('/meditation2',jsonwt.requireAuth,controllerUser.meditation2);
router.get('/filmsserie',controllerUser.filmsserie);
router.get('/filmsserie2',jsonwt.requireAuth,controllerUser.filmsserie2);
router.get('/deconnexion',controllerUser.deconnexion);








module.exports = router;

