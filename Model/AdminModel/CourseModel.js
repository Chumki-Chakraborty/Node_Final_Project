const mongoose=require('mongoose')

const schema=mongoose.Schema

const Courseschema=new schema({
    Trainer_id:{
        type:schema.Types.ObjectId,
        ref:"Trainer",
        required:true
    },
    CourseName:{
        type:String,
        required:[true,"CourseName is required"]
    },
    price:{
        type:String,
        required:[true,"price is required"]
    },
    Duration:{
        type:String,
        required:[true,"Details is required"]
    },
    Catagory:{
        type:String,
        required:[true,"Catagory is required"]
    },
    Image:{
        type:String,
        required:[true,"Image is required"]
    },
    status:{
        type:String,
        default:1
    }
},{timestamps:true})

const CourseModel=mongoose.model("Course",Courseschema)

module.exports=CourseModel