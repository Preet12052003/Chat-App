import express from "express"
const app = express()
import { createServer } from "http"
import cors from "cors"
import { Server } from "socket.io"
app.use(cors())

const server = createServer(app)

const io = new Server(server , {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET" , "POST"]
    },
})

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
//   console.log(socket.id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

server.listen(5000 , () => {
    console.log("SERVER STARTED....");
})