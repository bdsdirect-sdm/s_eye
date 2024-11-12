// import http from 'http';
// import { Server, Socket } from 'socket.io';
import express from 'express';
import sequelize from './src/config/database';
import UserDetails from './src/models/UserDetails';
import UserAddresses from './src/models/UserAddress';
import CORS from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import path from 'path';

dotenv.config();

const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://127.0.0.1:5173",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

app.use(express.json());
app.use(CORS({
  origin: true, 
  optionsSuccessStatus: 200 
}));

app.use(express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use('/', userRoutes);

// io.on("connection", (socket: Socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (room: string) => {
//     console.log(`${socket.id} joined room ${room}`);
//     socket.join(room);  
//   });

//   socket.on("send_message", async (data) => {
//     const { message, room, senderId } = data;
    
//     console.log(`Received message data:`, data);
  
//     if (!room || !senderId) {
//       console.error("Chat room ID or sender ID is missing.");
//       return;
//     }
//     io.to(room).emit("receive_message", data);
//   });
  

//   socket.on("disconnect", () => {
//     console.log(`User Disconnected: ${socket.id}`);
//   });
// });


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await UserDetails.sync({ force: false });
    await UserAddresses.sync({ force: false });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
