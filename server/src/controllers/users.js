const path = require('path');

class UsersController {
    constructor(db) {
        this.db = db
    }

    async getUser(req, res) {
        try {
            const { user_id } = req.params
            const user = await this.db.query("SELECT user_name FROM users WHERE user_id = $1", [user_id])
            if(user.rows.length === 0) {
                res.send("Error")
            }
            res.send(user.rows[0])
        } catch (error) {
            
        }
    }

    async getProfileImage(req, res) {
        try {
            const {user_id} = req.params
            const image_url = await this.db.query("SELECT image_url FROM users WHERE user_id = $1", [user_id])
            const uploadsDirectory = path.join(path.resolve(__dirname), '..', '..', 'uploads')
            var image_path = ''
            if(image_url.rows[0].image_url !== null) {
                image_path = path.join(uploadsDirectory, image_url.rows[0].image_url)
            } else {
                image_path = path.join(uploadsDirectory, 'placeholder.png')
            }
            res.sendFile(image_path)
        } catch (error) {
            
        }
    }

    async getUsers(req, res) {
        try {
            const { user_name } = req.query
            const users = await this.db.query("SELECT u.user_id, u.user_name, CASE WHEN uc.contact_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_contact FROM users u LEFT JOIN user_contacts uc ON u.user_id = uc.contact_id WHERE u.user_name ILIKE $1 AND u.user_id != $2", [`%${user_name}%`, req.user.id])

            res.send(users.rows)
        } catch (error) {
            
        }
    }

    async getProfile(req, res) {
        try {
            const user = await this.db.query("SELECT user_name, user_bio FROM users WHERE user_id = $1", [req.user.id])
            if(user.rows.length === 0) {
                res.send("Error")
            }
            res.send(user.rows[0])
        } catch (error) {
            
        }
    }

    async updateProfile(req, res) {
        try {
            const {user_name, user_bio} = req.body
            const userExists = await this.db.query("SELECT user_name FROM users WHERE user_name=$1 AND user_id!=$2", [user_name, req.user.id])
            if(userExists.rows.length !== 0) return res.send(false)

            const updateUser = await this.db.query("UPDATE users SET user_name=$1, user_bio=$2 WHERE user_id=$3", [user_name, user_bio, req.user.id])

            res.send(true)
        } catch (error) {
            
        }
    }
}

module.exports = UsersController