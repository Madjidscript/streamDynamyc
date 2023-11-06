var express = require('express');
const controllerAdmin = require('../controller/controllerAdmin');
var router = express.Router();


/* GET home page. */
router.get('/admin/utilisateur',controllerAdmin.utilisateur) 
router.get('/admin/article',controllerAdmin.article) 
router.post('/admin/article', controllerAdmin.articlePost)
router.get('/admin/update/:id', controllerAdmin.update)
router.get('/admin/delete/:id', controllerAdmin.delete)
router.post('/admin/update', controllerAdmin.updatePost)
 


module.exports = router;
