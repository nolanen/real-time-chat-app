const express = require("express");
const cors = require("cors");
require("dotenv").config()
const http = require("http")
const { Server } = require("socket.io")
const SocketController = require("./controllers/socket")
const socketAuthorization = require("./middleware/socket-authorization")
const db = require("./db")

const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")
const contactsRoutes = require("./routes/contacts")
const chatRoutes = require("./routes/chat")

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", [authRoutes, usersRoutes, contactsRoutes, chatRoutes])

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
    connectionStateRecovery: {}
})

io.use((socket, next) => socketAuthorization(socket, next))

io.on("connection", (socket) => {
    const socketController = new SocketController(socket, io, db)

    socket.on("join chat", (chat_id) => socketController.joinChat(chat_id))


    socket.on("message", (message) => {
        socketController.newMessage(message)
    })

    socket.on("new chat", (chatInfo) => {
        socketController.createChat(chatInfo)
    })

    socket.on("disconnect", () => socketController.disconnect())
})

server.listen(3001, () => {
    console.log("Server running on http://localhost:3001")
})