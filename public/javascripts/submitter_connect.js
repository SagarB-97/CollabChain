function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function createPeer() {
  var peer = new Peer(guid(), {host: 'localhost', port: 3000, path: '/peerserver'});
  var peerIdText = document.getElementById("peer_id");
  peer.on('open', function () {
      peerIdText.value = peer.id;
      $.post('/update_submitters_list', {id: peer.id, task_title: '<%= task_title %>'}, function(data) {
      });
  });
}

window.onload = createPeer;