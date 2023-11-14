class ChatController {
    constructor(db) {
        this.db = db
    }

    async getChats(req, res) {
        try {
            console.log(req.user)
            const chats = await this.db.query("SELECT c.chat_id, text, message_time, (SELECT u.user_name FROM chat_users cu LEFT JOIN users u on u.user_id = cu.user_id WHERE cu.user_id != $1 and cu.chat_id = c.chat_id) as contact_name FROM chats c LEFT JOIN chat_users cu on c.chat_id = cu.chat_id LEFT JOIN users u on cu.user_id = u.user_id LEFT JOIN (SELECT chat_id, max(message_id) as message_id FROM chat_messages cm GROUP BY chat_id) as last_message ON c.chat_id = last_message.chat_id LEFT JOIN chat_messages cm on last_message.message_id = cm.message_id WHERE u.user_id = $1 ORDER BY message_time DESC", [req.user.id])
            res.send(chats.rows)
        } catch (error) {
            
        }
    }

    async getChat(req, res) {
        try {
            const {chat_id} = req.body
            const chat = await this.db.query("SELECT * FROM chats WHERE chat_id = $1", [chat_id])

            res.send(chat.rows[0])
        } catch (error) {
            
        }
    }

    async getChatMessages(req, res) {
        try {
            const chat_id  = req.params.id
            const messages = await this.db.query("SELECT cm.text, cm.message_time, u.user_id, CASE WHEN cm.user_id = $1 THEN FALSE ELSE TRUE END as is_recipient FROM chat_messages cm LEFT JOIN users u on cm.user_id = u.user_id WHERE chat_id = $2", [req.user.id, chat_id])
            const today = new Date()
            console.log(today)
            res.send(messages.rows)
        } catch (error) {
            
        }
    }

    async checkIfChatExists(req, res) {
        try {
            console.log(req.params)
            const {with_user} = req.params
            const chat = await this.db.query("SELECT chat_id FROM chat_users WHERE user_id = $1 AND chat_id IN (SELECT chat_id FROM chat_users WHERE user_id = $2) AND chat_id NOT IN (SELECT chat_id FROM chat_users group by chat_id HAVING count(*) > 2)", [req.user.id, with_user])
            console.log(chat.rows)
            if(chat.rows.length !== 0) {
                res.send({
                    exists: true,
                    chat_id: chat.rows[0].chat_id
                })
            } else {
                res.send({exists: false})
            }
        } catch (error) {
            
        }
    }

    async createChat(user_id) {
        try {
            const newChat = await this.db.query("INSERT INTO chats DEFAULT VALUES RETURNING *")
            const chat_id = newChat.rows[0].chat_id
            const chatUser = await this.db.query("INSERT INTO chat_users(chat_id, user_id) VALUES($1, $2)", [chat_id, req.user.id])
            const {contact_id} = req.params
            const nextChatUser = await this.db.query("INSERT INTO chat_users(chat_id, user_id) VALUES($1, $2) RETURNING *", [chat_id, contact_id])
            res.send(nextChatUser.rows[0])
        } catch (error) {
            
        }
    }

    // rest route to create chat in chats

    // actual handler for new messages to save messages sent in socket


}

module.exports = ChatController