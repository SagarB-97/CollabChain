var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9000, path: '/'});
var fs = require('fs');

const peerListFilePath = './peerList.json';

function createNewFileIfAbsent() {
  let obj = {};
  try {
    fs.writeFileSync(peerListFilePath, JSON.stringify(obj), {flag: 'wx'});
  }
  catch(err) {
  }
}

server.on('disconnect', function(id) {
  createNewFileIfAbsent();
  let obj = JSON.parse(fs.readFileSync(peerListFilePath));
  if(obj[id]) {
    delete obj[id];
  }
  fs.writeFileSync(peerListFilePath, JSON.stringify(obj));
});