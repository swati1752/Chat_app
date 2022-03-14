const socket = io();

socket.on('message' , (msg) =>{
    console.log(msg);
})

document.querySelector('#msg_form').addEventListener('submit' , (e) => {
        e.preventDefault()
        let doc = document.querySelector('input').value
        socket.emit('sendMessage' , doc);
})
