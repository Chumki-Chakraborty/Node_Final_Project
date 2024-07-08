const mongoose=require('mongoose')

const schema=mongoose.Schema

const bannerschema=new schema({
    BannerTitle:{
        type:String,
        required:[true,"BannerTitle is required"]
    },
    BannerDetails:{
        type:String,
        required:[true,"BannerDetails is required"]
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    status:{
        type:String,
        default:1
    }
},{timestamps:true})
const bannermodel=mongoose.model('banner',bannerschema)
module.exports=bannermodel