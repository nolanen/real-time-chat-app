const jwt = require("jsonwebtoken")

module.exports = (socket, next) => {
    const jwtToken = socket.handshake.auth.jwtToken
    if(!jwtToken) {
        return next("Not Authorized")
    }

    try {
        const data = jwt.verify(jwtToken, process.env.JWTSECRET)
        socket.handshake.auth.user = data.user
        next()
    } catch (error) {
        console.log(error.message)
        return next("Not Authorized")
    }
}