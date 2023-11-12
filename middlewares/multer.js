const multer  = require('multer')


const upload= multer({storage:multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname === "image"){
        cb(null, './uploads')
      }else if(file.fieldname ==='video'){
        cb(null, './uploads2')
      }
        
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split('/')[1])
      }

})

})

module.exports=upload;