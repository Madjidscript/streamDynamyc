var express = require('express');
const controllerAdmin = require('../controller/controllerAdmin');
const upload = require('../middlewares/multer');
var router = express.Router();



/* GET home page. */
router.get('/utilisateur',controllerAdmin.utilisateur) 
router.get('/article',controllerAdmin.article) 
router.post('/article',upload.fields([{name:'image',maxCount:1},{name:'video',maxCount:1}]), controllerAdmin.articlePost)
router.get('/update/:id', controllerAdmin.update)
router.get('/delete/:id', controllerAdmin.delete)
router.post('/update', controllerAdmin.updatePost)
 


module.exports = router;
