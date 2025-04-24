const { Server } = require("socket.io");
const http = require("http");

const app = require("express")();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // o tu frontend
    methods: ["GET", "POST"],
    credentials: true
  }
});

const connectedUsers = new Map(); // { userId: socket.id }

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("register", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`Usuario ${userId} registrado con socket ID ${socket.id}`);
  });

  socket.on("disconnect", () => {
    for (const [userId, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    console.log("Cliente desconectado:", socket.id);
  });
});

const sendNotification = (userId, data) => {
  const socketId = connectedUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit("newMessage", data);
    console.log(`🔔 Notificación enviada a ${userId}:`, data);
  } else {
    console.log(`⚠️ Usuario ${userId} no está conectado`);
  }
};

module.exports = { io, server, sendNotification };
