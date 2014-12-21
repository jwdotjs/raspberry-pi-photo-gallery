var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('stream', { title: 'Raspberry Pi Stream' });
});

module.exports = router;
