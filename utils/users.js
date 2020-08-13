const users = []

//join user to chat

function userJoin (id, username, room) {
    const user = {id, username, room}

    users.push(user)
}

function getUser (id){
    const user = users.find((user) => {
        user.id === id
    })
}

module.exports = {
    userJoin,
    getUser
}