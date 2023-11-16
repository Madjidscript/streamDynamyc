var express = require('express');
const controllerAdmin = require('../controller/controllerAdmin');
const jsonwt = require('../middlewares/jwtoken');
const upload = require('../middlewares/multer');
var router = express.Router();



/* GET home page. */
router.get('/utilisateur',jsonwt.requireAuth,controllerAdmin.utilisateur) 
router.post('/delete1/:id',jsonwt.requireAuth, controllerAdmin.delete1)
router.get('/listearticle', controllerAdmin.listearticle)
router.get('/article',controllerAdmin.article) 
router.post('/article',upload.fields([{name:'image',maxCount:1},{name:'video',maxCount:1}]), controllerAdmin.articlePost)
router.get('/update/:id',upload.fields([{name:'image',maxCount:1},{name:'video',maxCount:1}]) ,jsonwt.requireAuth, controllerAdmin.update)
router.post('/update/:id',upload.fields([{name:'image',maxCount:1},{name:'video',maxCount:1}]) ,jsonwt.requireAuth, controllerAdmin.updatePost)
router.post('/delete2/:id', controllerAdmin.delete2)



module.exports = router;
