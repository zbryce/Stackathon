const moment = require('moment')

function formatMessage(username, text) {
    return {
        username,
        text,
        moment: moment().format('h:mm a')
    }
}

module.exports = formatMessage