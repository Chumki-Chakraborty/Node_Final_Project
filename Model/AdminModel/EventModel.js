const mongoose=require('mongoose')

const schema=mongoose.Schema

const Eventschema=new schema({
    EventTitle:{
        type:String,
        required:[true,"EventTitle is required"]
    },
    EventTime:{
        type:String,
        required:[true,"EventTime is required"]
    },
    EventDetails:{
        type:String,
        required:[true,"EventDetails is required"]
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
const Eventmodel=mongoose.model('Event',Eventschema)
module.exports=Eventmodel