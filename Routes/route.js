const express=require("express")
const user=require("../Models/UserModel")
const msg=require("../Models/MessageModel")
const router=express.Router()
const brcypt=require("bcrypt")
const cors = require("cors");


router.route("/register").post(async (req,res)=>{
try {
    const { username, email, password }=req.body
    const usernamecheck= await user.findOne({username})
    if(usernamecheck){
     return res.json({
        msg:"Username already used",
        status:false
     })   
    }
    const emailcheck=await user.findOne({email})
    if(emailcheck){
        return res.json({
            msg:"Email already used",
            status:false 
        })
    }
    const hashpassword=await brcypt.hash(password,10);

    const users= await user.create({
        username,
        email,
        password:hashpassword
    })

    delete users.password
    return res.json({status:true, users})
    // res.send("sucess")
    // const blogs=await  blog.create(name)
} catch (error) {
    
}

})
router.route("/login").post(async cors(), (req,res)=>{
try {
    const { username, password }=req.body
    const login= await user.findOne({username})
    if(!login){
     return res.json({
        msg:"Incorrect username or password",
        status:false
     })   
    }
    const passwordcheck=await brcypt.compare(password,login.password)
    if(!passwordcheck){
        return res.json({
            msg:"Incorrect username or password ",
            status:false 
        })
    }
    delete login.password

    return res.json({status:true,login})
    // res.send("sucess")
    // const blogs=await  blog.create(name)
} catch (error) {
    
}

})
router.route("/setavatar/:id").post(async  (req,res)=>{
    try {
        const userId=req.params.id
        const avatarImage=req.body.image
        const userData=await user.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        })
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
    } catch (error) {
        
    }
    
})
router.route("/allusers/:id").get(async  (req,res)=>{
    try {
        const users=await user.find({_id:{$ne:req.params.id}}).select([
            "email", 
            "username",
            "avatarImage",
            "_id"
        ])
         return res.json(users)
      
    } catch (error) {
        console.log(error.message);
    }
    
})
router.route("/addmsg").post(async  (req,res)=>{
    try {
   const {from,to,message} =req.body
   const data=await msg.create(
    {
        message:{text:message},
        users:[from,to],
        sender:from,
    }
   )

 
   if(data) return res.json({msg:"Message added successfully"})
    return res.json({msg:"Fail to add message to database "})
    } catch (error) {
        console.log(error.message);
    }
    
})
router.route("/getmsg").post(async  (req,res)=>{
    try {
        const {from,to} =req.body    
const messages=await msg.find({
    users:{
        $all:[from,to],
    },
})
.sort({updatedAt:1})
const projectmessage=messages.map((mess)=>{
    return{
        fromSelf:mess.sender.toString() === from,
        message: mess.message.text
    }
})
res.json(projectmessage)
    } catch (error) {
        console.log(error.message);
    }
    
})
module.exports=router
