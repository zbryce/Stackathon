const socket = io()

socket.on('message', message => {
    console.log(message)
})


const p = document.getElementById('paragraph')

p.addEventListener('click', e => {
    e.preventDefault();

    const val = e.target.innerText

    console.log(val)
})