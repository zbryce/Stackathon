const socket = io()
const chatMessages = document.querySelector('.chat-messages')
//message/text from the server
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
const outPutSolo = (message) => {
    console.log('in output solo')
    const box = document.createElement('div')
    box.classList.add('soloMessage')
    box.innerHTML = `<p>span test <span>time: 12:00</span></p>
    <p>${message}</p>`
    console.log('solo box ', box)
    const div = document.querySelector('.chat-messages')
    div.appendChild(box)
}
const outputText = (message) => {
    const box = document.createElement('div')
    box.classList.add('message')
    box.innerHTML = `<p>span test <span>time: 12:00</span></p>
    <p>${message}</p>`
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
