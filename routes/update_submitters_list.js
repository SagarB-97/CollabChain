var express = require('express');
var router = express.Router();
const fs = require('fs');

const peerListFilePath = './peerserver/peerList.json';

function decodeEntities(encodedString) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
      "nbsp":" ",
      "amp" : "&",
      "quot": "\"",
      "lt"  : "<",
      "gt"  : ">"
  };
  return encodedString.replace(translate_re, function(match, entity) {
      return translate[entity];
  }).replace(/&#(\d+);/gi, function(match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
  });
}

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
  obj[id] = {id: req.body.id, task_title: req.body.task_title, js_function: decodeEntities(req.body.js_function)};
  fs.writeFileSync(peerListFilePath, JSON.stringify(obj));
  res.send('List Updated');
});

module.exports = router;
