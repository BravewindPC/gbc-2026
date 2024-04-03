import { Socket } from 'dgram'
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors:{
    origin:process.env.NODE_ENV==="production" ? false: ["http://localhost:3000"]
  }
})

io.on('connection', socket =>{
  console.log(`User ${socket.id} connected`)

  socket.on("join-room", (roomName) => {
    console.log(`Socket ${socket.id} joining room ${roomName}`);
    socket.join(roomName);
  });

  socket.on("leave-room", (roomName) => {
    socket.leave(roomName);
    console.log(`Socket ${socket.id} left room ${roomName}`);
  });

  socket.on("update-score", (data, roomName) => {
    console.log(data,"and", roomName)
    io.in(roomName).emit("receive-score", data);
  });

  socket.on('send-message', (message, roomId) => {
    socket.to(roomId).emit('receive-message', message);
  })
})

httpServer.listen(8080,()=>
  console.log(`Listening to port 8080`)
)