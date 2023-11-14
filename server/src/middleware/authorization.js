const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const jwtToken = req.header("jwtToken")

    if(!jwtToken) {
        return res.send("Not Authorized")
    }

    try {
        const data = jwt.verify(jwtToken, process.env.JWTSECRET)
        req.user = data.user
        next()
    } catch (error) {
        console.log(error.message)
        return res.send("Not Authorized")
    }
}