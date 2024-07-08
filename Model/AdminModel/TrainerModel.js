const mongoose=require('mongoose')

const schema=mongoose.Schema

const Trainerschema=new schema({
    TrainerName:{
        type:String,
        required:[true,"TrainerName is required"]
    },
    Subject:{
        type:String,
        required:[true,"Subject is required"]
    },
    TrainerDetails:{
        type:String,
        required:[true,"TrainerDetails is required"]
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
const Trainermodel=mongoose.model('Trainer',Trainerschema)
module.exports=Trainermodel