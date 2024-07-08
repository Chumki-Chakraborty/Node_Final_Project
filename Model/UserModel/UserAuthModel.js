const mongoose=require('mongoose')

const schema=mongoose.Schema

const userschema=new schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    mobile:{
        type:String,
        required:[true,"mobile is required"]
    },
    password:{
        type:String,
        required:[true,"mobile is required"]
    },
    
   role:{
        type:String,
        default:'user'
    },
    status:{
        type:String,
        default:1
    }
    
})
const UserAuthModel=mongoose.model('user',userschema)
module.exports=UserAuthModel