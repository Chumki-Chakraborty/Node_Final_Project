const mongoose=require('mongoose')

const schema=mongoose.Schema

const DemoClassschema=new schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    
    Mobile:{
        type:String,
        required:[true,"Mobile is required"]
    },
    date: {
        type: String, 
        required: true 
    },
    Time:{
        type:String,
        required:[true,"Time is required"]
    },
    status:{
        type:String,
        default:1
    }
    
})

// ********************//


const DemoClasssModel=mongoose.model('DemoClass',DemoClassschema)
module.exports=DemoClasssModel