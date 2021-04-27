const express = require('express')

// This is middleware use upload file 
var multer  = require('multer')

const controller = require('../controller/novel.controller')

var router = express.Router()

// File upload to folder uploads
var upload = multer({ dest: './public/uploads/' })

// Showed novels
router.get('/show', controller.showData);

// Create a novel and add to db
router.get('/create', controller.create);

// upload.single use load a single file
router.post('/create', upload.single('avatar'), controller.postCreate);

// use to search novel from name
router.get('/search', controller.search);

// use route parameter can to take much id 
router.get('/:id', controller.view);


module.exports = router;