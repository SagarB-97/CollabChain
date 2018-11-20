var express = require('express');
var router = express.Router();
var peerList = require('../peerList');

router.post('/', function(req, res, next) {
  peerList.push({id: req.body.id, task_title: req.body.task_title});
  res.send('List Updated');
});

module.exports = router;
