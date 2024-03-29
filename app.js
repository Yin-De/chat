const express=require("express")
const connectdb=require("./db")
const route=require('./Routes/route')
const app=express()  
 const cors = require("cors");
app.use(express.urlencoded({extended:true}))
app.use(express.json());
const socket=require("socket.io")
app.use("/",route)
app.use(cors({
origin: "*",
  methods: ['POST,GET'],
  credentials: true,
  maxAge: 3600,
  enablePreflight: true
})); 
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const start=async()=>{
    try {
          await  connectdb()
          console.log("connectedednelas");
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
      origin: "*",
      
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

