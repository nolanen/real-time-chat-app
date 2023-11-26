const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class AuthController {
    constructor(db) {
        this.db = db
    }
    async register(req, res) {
        try {
            const {username, email, password} = req.body
            console.log(this.db)
            const userSearch = await this.db.query("SELECT * FROM users WHERE user_email =$1", [email]);
            if(userSearch.rows.length !== 0) {
                return res.send("User Exists.")
            }

            const hashedPassword = await this.hashedPassword(password)

            const defaultBio = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, magnam earum enim quae non, iusto necessitatibus velit quibusdam est voluptate, laudantium modi libero animi eveniet atque assumenda vel eaque blanditiis?"

            const user = await this.db.query("INSERT INTO users (user_name, user_email, user_password, user_bio) VALUES($1, $2, $3, $4) RETURNING *", [username, email, hashedPassword, defaultBio])
            console.log(user.rows)
            const jwtToken = await this.generateJWT(user.rows[0].user_id, user.rows[0].user_name)
            console.log(jwtToken)
            res.send({jwtToken})
        } catch (error) {
            console.log(error.message)
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            console.log(req.body)
            const user = await this.db.query("SELECT * FROM users WHERE user_name = $1", [username])
            if(user.rows.length === 0) {
                return res.send("User Does Not Exist.")
            }
            console.log(user.rows[0])
            
            const isValidPassword = await this.checkPassword(password, user.rows[0].user_password)
            if(!isValidPassword) {
                return res.status(401).json("Password is incorrect")
            }

            const jwtToken = await this.generateJWT(user.rows[0].user_id, user.rows[0].user_name)
        
            res.send({jwtToken})
        } catch (error) {
            
        }
    }

    async generateJWT(user_id, user_name) {
        const data = {
            user: {
                id: user_id,
                user_name: user_name
            }
        }
        return jwt.sign(data, process.env.JWTSECRET, {expiresIn: 3600})
    }

    async hashedPassword(password) {
        return await bcrypt.hash(password, 10)
    }

    async checkPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword)
    }

}
module.exports = AuthController