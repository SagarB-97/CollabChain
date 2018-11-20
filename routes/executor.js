var express = require('express');
var router = express.Router();
var peerList = require('../peerList');

router.get('/', function(req, res, next) {
  res.render('executor', {peerList: peerList});
});

router.get('/:peerid', function(req, res, next) {
  var idx = -1;
  for(var i = 0; i < peerList.length; i++) {
    if(peerList[i].id == req.params.peerid) {
      idx = i;
      break;
    }
  }
  res.render('executor_connected', {id: peerList[idx].id, task_title: peerList[idx].task_title});
});

module.exports = router;
