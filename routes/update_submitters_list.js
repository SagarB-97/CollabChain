var express = require('express');
var router = express.Router();
const fs = require('fs');

const peerListFilePath = './peerserver/peerList.json';

function createNewFileIfAbsent() {
  let obj = {};
  try {
    fs.writeFileSync(peerListFilePath, JSON.stringify(obj), {flag: 'wx'});
  }
  catch(err) {
  }
}

router.post('/', function(req, res, next) {
  createNewFileIfAbsent();
  let obj = JSON.parse(fs.readFileSync(peerListFilePath));
  let id = req.body.id;
  obj[id] = {id: req.body.id, task_title: req.body.task_title};
  fs.writeFileSync(peerListFilePath, JSON.stringify(obj));
  res.send('List Updated');
});

module.exports = router;
