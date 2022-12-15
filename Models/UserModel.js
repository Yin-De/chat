const  mongoose=require("mongoose")


const UserModel=new mongoose.Schema({
    // username:{
    //     Type:String,
    //     // required:true,
    //     // min:3,
    //     // max:20,
    //     // unique:true
    // },
    username:String,
   
    email:String,
    // password:{
    //     Type:String,
    //     // required:true,
    //     // min:8
    // },
    password:String,
    // isAvatarImageSet:{
    //     Type:String,
    //     default:false
    // },
    // isAvatarImageSet
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: { 
        type: String,  
        default: "",
      },
})  
module.exports=mongoose.model("Users",UserModel)
 