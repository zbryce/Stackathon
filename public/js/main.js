const socket = io()
const chatMessages = document.querySelector('.chat-messages')
//getting url, options -> ignore unecessary chars
//cdn qs is a querystring parser
//value attribute determine returned values
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
console.log(username, room)
//message/text from the server

socket.emit('joinRoom', {username, room})
socket.on('chatMessage', message => {
    console.log(message)
    outputText(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})
socket.on('solo', message => {
    console.log('in solo', message)
    outPutSolo(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})
socket.on('new', message => {
    outputNew(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})
socket.on('message', object => {
    
})
const outPutSolo = (message) => {
    const box = document.createElement('div')
    box.classList.add('soloMessage')
    box.innerHTML = `<p>span test <span>time: 12:00</span></p>
    <p>${message}</p>`
    const div = document.querySelector('.chat-messages')
    div.appendChild(box)
}
const outputText = (message) => {
    console.log('in output')
    const box = document.createElement('div')
    // box.classList.add('message')
    box.classList.add('general')
    box.innerHTML = `<p> ${message.username}  <span>${  message.moment}</span></p>
    <p>${message.text}</p>`
    const div = document.querySelector('.chat-messages')
    div.appendChild(box)

}
const outputNew = (message) => {
    console.log('new ', message)
    const box = document.createElement('div')
    box.classList.add('new')
    box.innerHTML = `<p> ${message.username} says:  <span>${message.moment}</span></p>
    <p>${message.text}</p>`
    const div = document.querySelector('.chat-messages')
    div.appendChild(box)

}

chatForm = document.getElementById('chat-form')


chatForm.addEventListener('submit', e => {
    e.preventDefault();

    const value = e.target.elements.msg.value

    //emit message to server when paragraph is clicked (see above)
    socket.emit('chatMessage', value)

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})
