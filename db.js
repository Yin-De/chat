const mongoose=require("mongoose")
// const url='mongodb+srv://yinde:muhammad2004 @nodeexpressproject.hfrzvlv.mongodb.net/Chat?retryWrites=true&w=majority';
const url='mongodb+srv://yinde:muhammad2004@nodeexpressproject.hfrzvlv.mongodb.net/chat?retryWrites=true&w=majority';

const connectdb=()=>{
   return mongoose.connect(url)
} 
 
module.exports=connectdb
