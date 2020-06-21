//const io = require('socket.io');
// const socket = io();



//video chat.

//get the local video and display it with permission.

function getVideo(callbacks) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    var constraints = {
        audio: true,
        video: true
    }
    navigator.getUserMedia(constraints, callbacks.success, callbacks.error);

}

function recStream(stream, elemid) {
    var video = document.getElementById(elemid);
    video.srcObject = stream;
    window.localstream = stream;
}

getVideo({
    success: function(stream) {
        window.localstream = stream;
        recStream(stream, 'lvideo');
    },
    error: function(err) {
        alert('cannot access your camera ');
        console.log(err);
    }
});
//create peer connection with peer obj.
var conn;
var peer_id;
var peer = new Peer();

//display the peer id.
peer.on('open', function() {
    document.getElementById("displayid").innerHTML = peer.id;
});
//onclick with the connection built -expose ice info
peer.on('connection', (connection) => {
    conn = connection;
    peer_id = connection.peer;

    document.getElementById('connid').value = peer_id;
});
peer.on('error', () => {
    alert('an error has been occured ' + err);
    console.log(err);
});

document.getElementById('conn_button').addEventListener('click', () => {
    peer_id = document.getElementById("connid").value;
    if (peer_id) {
        console.log('connecting to ' + peer_id);
        conn = peer.connect(peer_id);

    } else {
        alert('enter an Id');
        return false;
    }
});




// call on click(offer and answer is exchanged)
peer.on('call', (call) => {
    console.log('making a call')
    var acceptCall = confirm('Do you want to answer this call?');
    if (acceptCall) {
        call.answer(window.localstream);
        call.on('stream', (stream) => {
            window.peer_stream = stream;
            recStream(stream, 'rvideo');
        });
        //ask to call
        call.on('close', () => {
            alert('the call has been ended');
        });
        //accept the call
    } else {
        console.log("call denied");
    }
});
//display the remote video and local video on client.

document.getElementById('call_button').addEventListener('click', () => {
    console.log('calling a peer ' + peer_id);
    console.log(peer);

    var call = peer.call(peer_id, window.localstream);

    call.on('stream', (stream) => {
        window.peer_stream = stream;
        recStream(stream, 'rvideo');
    })
});