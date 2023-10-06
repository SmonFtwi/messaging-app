const express = require('express');
const mongoose= require('mongoose')
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const http = require("http")
const {Server} = require("socket.io")
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    credentials: true,
        origin: function (origin, callback) {
           
            callback(null, origin === process.env.client_url);
}}));

// create a server 
const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        credentials: true,
        origin: function (origin, callback) {
          
            callback(null, origin === process.env.client_url);
        }
    } 
})



io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });


  
  
  
  
  
  
// database connection 

const mongoDB = process.env.mongoDb
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}),
app.get('/', (req, res) =>{
    res.send('hello')
})

//routes 
const userRoute = require('./routes/userRoute');
const { throws } = require('assert');
app.use('/', userRoute)

const port = process.env.PORT || 3005
server.listen(port , () => {
    console.log(`server running on port ${port}`)
})