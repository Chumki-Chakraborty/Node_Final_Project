
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const hashpassword=async(password)=>{
    const saltpassword=5
    const hashpassword=await bcrypt.hash(password,saltpassword)
    return hashpassword
}
// -----------ComparePassword------------//
const ComparePassword=async(password,hashpassword)=>{
    return await bcrypt.compare(password,hashpassword)
}
// *******************UserJwtAuthCheck***************//
const UserJwtAuthCheck=(req,res,next)=>{
    
        if(req.cookies && req.cookies.usertoken){
            jwt.verify(req.cookies.usertoken,process.env.JWT_SECRET,(err,data)=>{
                req.user=data
                //  console.log(`Token user`,req.user);
                next()
            })
        }
        else{
        console.log(`Can't access this page...Login first!!!!`);
        next()
    }
}
// ******************AdminJwtAuthCheck**************//
const AdminJwtAuthCheck=async(req,res,next)=>{
    if(req.cookies && req.cookies.admintoken){
        jwt.verify( req.cookies.admintoken,process.env.JWT_SECRET,(err,admindata)=>{
            req.admin=admindata
            console.log(`Admindata`, req.admin);
            next()
        })
    }else{
        console.log(`can't access Admin dashboard page....login First!!!!`);
        next()
    }
}
module.exports={
    hashpassword,
    ComparePassword,
    UserJwtAuthCheck,
    AdminJwtAuthCheck
}