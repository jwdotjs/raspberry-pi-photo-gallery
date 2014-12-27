'use strict';

var CronJob = require('cron').CronJob;

module.exports = function() {
  var jobs = [];

  jobs.push(new CronJob('0 */2 * * * *', function() {
    console.log('Deleting old images.');
    require('./delete-images')();
  }, null, true));
};