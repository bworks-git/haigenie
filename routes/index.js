var express = require('express');
var config = require('../config');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(config.rootDir+'/public/store/index.html');
});

module.exports = router;
