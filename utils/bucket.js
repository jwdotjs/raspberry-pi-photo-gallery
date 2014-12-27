'use strict';

var _ = require('lodash');
var moment = require('moment');
var credentials = require('../credentials');
var s3 = require('./s3');

module.exports = {
  getImagesWithinHour : function(callback) {
    var params = {
      Bucket : credentials.bucket,
      Prefix : moment().utc().format('YYYY-MM-DDTHH') // my pi stores files in utc format ISO-8601
    };

    s3.listObjects(params, function(err, data) {
      var imageNames = [];
      _.each(data.Contents, function(image) {
        imageNames.push(image.Key);
      });

      imageNames.reverse();
      callback(imageNames);
    });
  },

  getOlderImages : function(daysAgo, callback) {
    // my pi stores files in utc format ISO-8601
    var params = {
      Bucket : credentials.bucket,
      Prefix : moment().subtract(daysAgo, 'day').utc().format('YYYY-MM-DD')
    };

    s3.listObjects(params, function(err, data) {
      var imageNames = [];
      _.each(data.Contents, function(image) {
        imageNames.push(image.Key);
      });

      imageNames.reverse();
      callback(imageNames);
    });
  },

  deleteImages : function(keys) {
    var params = {
      Bucket : credentials.bucket,
      Delete : {
        Objects : keys,
        Quiet : true
      },
    };

    s3.deleteObjects(params, function(err, response) {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log(response);
      }
    });
  }
};