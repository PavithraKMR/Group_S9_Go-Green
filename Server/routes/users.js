<<<<<<< HEAD
const express = require('express');
var router = express.Router();
var TipController = require('../Controllers/Tip');
var profileController = require('../Controllers/Profile');
var fileUpload = require('../Middleware/file-upload');
const multer = require('multer');

router.get('/:userId',profileController.getUser)
=======
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
>>>>>>> main

module.exports = router;
