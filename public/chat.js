var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message'),
    habdle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
});

socket.on('chat', function(data) {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    message.value = "";
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message ...</em><p>';
});

const uploader = new SocketIOFileUpload(socket);

// When #file_button is clicked, the file in #fileUpload is uploaded.
uploader.listenOnSubmit(document.getElementById('send'), document.getElementById('upload'));

uploader.addEventListener('start', (event)=> {
    event.file.meta.extension = 'csv';
});