const mongoose=require('mongoose')

const schema=mongoose.Schema

const Testimonialschema=new schema({
    StudentName:{
        type:String,
        required:[true,"StudentName is required"]
    },
    CourseName:{
        type:String,
        required:[true,"CourseName is required"]
    },
    StudentDetails:{
        type:String,
        required:[true,"StudentDetails is required"]
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
const Testimonialmodel=mongoose.model('Testimonial',Testimonialschema)
module.exports=Testimonialmodel