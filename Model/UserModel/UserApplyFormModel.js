const mongoose=require('mongoose')

const schema=mongoose.Schema

// ************************//
const Applyschema=new schema({
    User_id:{
        type:schema.Types.ObjectId,
        ref:"user",
        required:true
        // required:[true,"Course Name is required"]
    },
    Date_of_Birth:{
        type:String,
        required:[true,"Date_of_Birth is required"]
    },
    Course_Name:{
        type:schema.Types.ObjectId,
        ref:"Course",
        required:true
        // required:[true,"Course Name is required"]
    },
    Qualification:{
        type:String,
        required:[true,"Qualification is required"]
    },
    Education_Mode:{
        type:String,
        required:[true,"Education_Mode is required"]
    },
    // date: {
    //     type: Date,
    //     default: Date.now()
    // },
    date: {
        type: String, 
        required: true 
    },
    status:{
        type:String,
        default:1
    }
    
})
const UserApplyNowModel=mongoose.model('RegistrationForm',Applyschema)
module.exports=UserApplyNowModel