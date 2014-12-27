'use strict';

var express = require('express');
var router = express.Router();

var credentials = require('../credentials');
var bucket = require('../utils/bucket');

/* GET home page. */
router.get('/', function(req, res) {
  bucket.getImagesWithinHour(function(images) {
    res.render(
      'index',
      {
        title: 'Raspberry Pi Image Gallery',
        images: images,
        bucket: credentials.bucket
      }
    );
  });
});

module.exports = router;
