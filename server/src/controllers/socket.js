
const onlineUsers = new Map()

class socketController {

    constructor(socket, io, db) {
        this.socket = socket
        this.io = io
        this.user = socket.handshake.auth.user
        this.db = db
        onlineUsers.set(this.user.id, socket)
    }

    disconnect() {
        console.log("disconnected")
    }

    joinChat(chat_id) {
        const setArray = [...this.socket.rooms]
        this.socket.leave(setArray[1])
        this.socket.join(chat_id)
    }

    async newMessage(message) {
        const setArray = [...this.socket.rooms]
        const chat_id = setArray[1]
        const newMessageRequest = await this.db.query("INSERT INTO chat_messages(chat_id, user_id, text) VALUES($1, $2, $3) RETURNING *", [chat_id, this.user.id, message])
        const newMessage = newMessageRequest.rows[0]
        const currentDate = new Date();
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
      
        hours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        newMessage.message_time = `${hours}:${formattedMinutes} ${ampm}`;

        this.io.to(chat_id).except(setArray[0]).emit("message", {
            user_id: this.user.id,
            text: newMessage.text,
            message_time: newMessage.message_time,
            is_recipient: true
        })
        return newMessage
    }

    async createChat(chatInfo) {
        const {to_user, message} = chatInfo
        const newChat = await this.db.query("INSERT INTO chats DEFAULT VALUES RETURNING *")
        const chat_id = newChat.rows[0].chat_id
        await this.db.query("INSERT INTO chat_users(chat_id, user_id) VALUES($1, $2)", [chat_id, this.user.id])
        await this.db.query("INSERT INTO chat_users(chat_id, user_id) VALUES($1, $2) RETURNING *", [chat_id, to_user])
        this.joinChat(chat_id)
        const newMessage = await this.newMessage(message)
        const contactSocket = onlineUsers.get(to_user)?.id

        const contact = await this.db.query("SELECT user_name FROM users WHERE user_id = $1", [to_user])

        this.io.to(this.socket.id).emit("chatCreationSuccess", {
            chat_id: chat_id,
            contact_name: contact.rows[0].user_name,
            message_time: newMessage.message_time,
            text: newMessage.text
        })

        if(contactSocket) {
            this.io.to(contactSocket).emit("new chat", {
                chat_id: chat_id,
                contact_name: this.user.user_name,
                message_time: newMessage.message_time,
                text: newMessage.text
            })
        }
    }

    userOnline(user_id) {
        const rooms = this.io.socket.adapter.rooms
        const index = rooms.indexOf((socket) => socket.handshake.auth.user.id === user_id)
        if(online > -1) {
            return rooms[online].id
        }
        return null
    }

}

module.exports = socketController