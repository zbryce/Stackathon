const users = []

//join user to chat

function userJoin (id, username, room) {
    const user = {id, username, room}

    users.push(user)
    return user
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