const socket = io();

// Elements 
const $messageForm = document.querySelector('#msg_form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send_location')


socket.on('message' , (msg) =>{
    console.log(msg);
})


$messageForm.addEventListener('submit' , (e) => {
        e.preventDefault()
        $messageFormButton.setAttribute('disabled' , 'disabled')
        let doc = $messageFormInput.value
        socket.emit('sendMessage' , doc,(e) =>{
            $messageFormInput.value = ''
            $messageFormInput.focus()
            if(e){
            return console.log(e)
            }  
            $messageFormButton.removeAttribute('disabled')
            console.log("message  delivered" );
        })

})

$sendLocationButton.addEventListener('click', () =>{
    if(!navigator.geolocation)
    return alert('No location found')
    $sendLocationButton.setAttribute('disabled' , 'disabled')
    navigator.geolocation.getCurrentPosition((pos) =>{
        socket.emit('sendLocation' ,{
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        }, () =>{
            $sendLocationButton.removeAttribute('disabled')
            console.log('shared');
        })
    })
})