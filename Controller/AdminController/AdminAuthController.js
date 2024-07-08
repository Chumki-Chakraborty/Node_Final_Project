const AdminAuthModel=require('../../Model/UserModel/UserAuthModel')
const flash=require("connect-flash")
const jwt=require('jsonwebtoken')
const { ComparePassword, hashpassword } = require('../../Middleware/Auth')


class AdminAuthController{
    //***************AdminAuthPages****************//
    AdminLogin_Page=(req,res)=>{
        res.render('AdminPages/login_admin',{
            title:"Admin login page",
            message3:req.flash('message3'),
            message4:req.flash('message4')
            })
    }
    Admin_forgetpassword_page=(req,res)=>{
        res.render('AdminPages/forgetpassword_admin',{
            title:"admin forgetpassword page",
            message3:req.flash('message3'),
            
        })
    } 
    Admin_Updatepassword_Page=async(req,res)=>{
        const id=req.params.id
        const updtepassword=await AdminAuthModel.findById(id)
        res.render('AdminPages/updatepassword_admin',{
            title:"admin updatepassword page",
            Adminid:updtepassword,
            
        })
    }  
        //**************AminLoginPost*************/
        AminLoginPost=async(req,res)=>{
            try{
                const{email,password}=req.body
                if(!email){
                    console.log(`email is required`);
                    req.flash('message3',"email is required")
                    return res.redirect('/admin/login')
                }
                if(!password){
                    console.log(`password is required`);
                    req.flash('message3',"password is required")
                    return res.redirect('/admin/login')
                }
                const admin=await AdminAuthModel.findOne({email})
                if(!admin){
                    console.log(`Invalid Email!!`);
                    req.flash('message3',"Invalid Email!!")
                    return res.redirect('/admin/login')
                }
                // **********MatchPassword********//
                if(admin.role=='admin'){
                  const MatchPassword=await ComparePassword(password,admin.password) 
                  if(!MatchPassword){
                    console.log(`Incorrect password!!`);
                    req.flash("message3","Incorrect password!!")
                    return res.redirect('/admin/login')
                  } 
                  const Token=await jwt.sign({
                    _id:admin._id,
                    name:admin.name,
                    email:admin.email,
                   mobile:admin.mobile,
                   password:admin.password
                  },process.env.JWT_SECRET,{expiresIn:"12 hr"})
                  if(Token){
                    res.cookie('admintoken',Token)
                    return res.redirect('/admin/dashboard')
                  }
                }
            }catch(error){
                console.log(error);
            }
        }
        // ****************AdminAuthCheck**************//
        AdminAuthCheck=(req,res,next)=>{
            if(req.admin){
                next()
            }else{
                req.flash("message3","can't access Admin dashboard page..login First!!")
                return res.redirect('/admin/login')
            }
        }
        // ********************AdminForgetPassword***************//
        AdminForgetPassword=async(req,res)=>{
            try{
                const{email,mobile,newpassword}=req.body
                if(!email){
                    console.log(`email is required!!!`);
                    req.flash('message3','email is required!!!')
                    return res.redirect('/admin/forget/password')
                }
                if(!mobile){
                    console.log(`mobile is required!!!`);
                    req.flash('message3','mobile is required!!!')
                    return res.redirect('/admin/forget/password')
                }
                if(!newpassword){
                    console.log(`newpassword is required!!!`);
                    req.flash('message3','newpassword is required!!!')
                    return res.redirect('/admin/forget/password')
                }
                // ***********Admin***************//
                const Admin=await AdminAuthModel.findOne({email,mobile})
                if(!Admin){
                    console.log(`Invalid Email & Mobile!!!`);
                    req.flash('message3','Invalid Email or Mobile!!!')
                    return res.redirect('/admin/forget/password')
                }
                // *************hashedpassword************//
                const hashedpassword=await hashpassword(newpassword)
                const updatepassword=await AdminAuthModel.findByIdAndUpdate(Admin._id,{
                    password:hashedpassword
                }) 
                if(updatepassword){
                    console.log(`password has been updated`);
                    req.flash('message4','password has been updated..please login with new password!!!')
                    return res.redirect('/admin/login')
                }
            }catch(error){
                console.log(error);
            }
        }
        // **************AdminUpdatePassword**************//
        AdminUpdatePassword=async(req,res)=>{
            try{
                const AdminId=req.params.id
                const {newemail,updatepassword}=req.body
                const admindata=await AdminAuthModel.findOne({_id:AdminId})
                if(admindata){
                    // ************Hashedpassword******//
                    const Hashedpassword=await hashpassword(updatepassword)
                    const newpassword=await AdminAuthModel.findByIdAndUpdate({_id:AdminId},{
                        $set:{
                            password:Hashedpassword,
                            email:newemail
                        }
                    })
                    if(newpassword){
                        console.log(`password update done...`);
                        req.flash('message4','password has been updated..please login with new password!!!')
                        return res.redirect('/admin/login')
                    }
                }
            }catch(error){

            }
        }
        // *************AdminLogout****************//
        AdminLogout=(req,res)=>{
            res.clearCookie('admintoken')
            return res.redirect('/admin/login')
        }
}
module.exports=new AdminAuthController()