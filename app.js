const express=require("express")
const connectdb=require("./db")
const route=require('./Routes/route')
const app=express()  
// const cors = require("cors");
app.use(express.urlencoded({extended:true}))
app.use(express.json());
const socket=require("socket.io")
app.use("/",route)
// app.use(cors());
 
const start=async()=>{
    try {
          await  connectdb()
          console.log("connected");
  // app.listen(5000,()=>{
    // console.log("port listening on 5000");
  // })  
    } catch (error) { 
        console.log(error.message);  
    }


}
start()
// try {
  const io = socket(app.listen(5000,()=>{
    console.log("port listening on 5000");
  })  , {
    cors: {
      origin: "https://silly-puffpuff-3a4a48.netlify.app",
      credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
}); 
// } catch (error) {
//   console.log(error.message);
// }

