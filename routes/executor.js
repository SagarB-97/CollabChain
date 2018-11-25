var express = require('express');
var router = express.Router();
var fs = require('fs');

const peerListFilePath = './peerserver/peerList.json';

function createNewFileIfAbsent() {
  let obj = {};
  try {
    fs.writeFileSync(peerListFilePath, JSON.stringify(obj), {flag: 'wx'});
  }
  catch(err) {
  }
}

router.get('/', function(req, res, next) {
  createNewFileIfAbsent();
  let obj = JSON.parse(fs.readFileSync(peerListFilePath));
  res.render('executor', {peerList: Object.values(obj)});
});

router.get('/:peerid', function(req, res, next) {
  createNewFileIfAbsent();
  let id = req.params.peerid;
  let obj = JSON.parse(fs.readFileSync(peerListFilePath))[id];
  res.render('executor_connected', {id: obj.id, task_title: obj.task_title, js_function: obj.js_function});
});

module.exports = router;
