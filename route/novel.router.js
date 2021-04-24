const express = require('express')

// La middleware su dung de upload files
var multer  = require('multer')

const controller = require('../controller/novel.controller')

var router = express.Router()

// Files dc upload duoc luu trong thu mux uploads
var upload = multer({ dest: './public/uploads/' })

router.get('/show', controller.showData);

router.get('/create', controller.create);

// upload.single de upload 1 file
router.post('/create', upload.single('avatar'), controller.postCreate);

module.exports = router;