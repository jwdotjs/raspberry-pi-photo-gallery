'use strict';

/*
  This cron deletes old footage on AWS that is no longer needed.

  It grabs all AWS S3 keys in a bucket that match a prefix and passes the array of keys
  to deleteObjects()

  Note: Google returns a paginated list from the listObjects() function so this
  needs to be ran multiple times per day to clear out a days worth of images
*/

var _ = require('lodash');
var bucket = require('../utils/bucket');

var DAYS_AGO = 1;

module.exports = function() {
  bucket.getOlderImages(DAYS_AGO, function(images) {
    if (! _.isEmpty(images)) {
      var keys = _.map(images, function(image) {
        return { Key : image };
      });

      bucket.deleteImages(keys);
    } else {
      console.log('No images to delete.');
    }
  });
};