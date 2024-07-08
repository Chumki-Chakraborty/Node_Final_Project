const UserAuthModel=require('../../Model/UserModel/UserAuthModel')
const jwt=require('jsonwebtoken')
const flash = require('connect-flash');
const { hashpassword, ComparePassword } = require('../../Middleware/Auth');
class UserAuthController{

    UserRegisterPage=(req,res)=>{
        res.render('UserPages/register_user',{
            title:"user register page",
            message:req.flash("message")
        })
    }
    UserLoginPage=(req,res)=>{
        res.render("UserPages/login_user",{
            title:"user log in page",
            message:req.flash('message'),
            message1:req.flash('message1')
        })
    }
    UserForgetPassword=(req,res)=>{
        res.render('UserPages/forgetpassword_user',{
            title:"user forget password page",
            message:req.flash('message'),
            message1:req.flash('message1')
        })
    }
    UserUpdatePassword=async(req,res)=>{
        const id=req.params.id
        const userid=await UserAuthModel.findById(id)
        res.render('UserPages/updatepassword_user',{
            title:"user update password page",
            data:userid
        })
    }
    // ***************************Authintication********************//
    UserRegistration=async(req,res)=>{
        // console.log(req.body);
        try{
            const{name,email,mobile,password}=req.body
           if(!name){
            console.log(`name is required`);
            req.flash('message',"name is required")
           return res.redirect('/')
           }
           if(!email){
            console.log(`email is required`);
            req.flash('message',"email is required")
           return res.redirect('/')
           }
           if(!mobile){
            console.log(`mobile is required`);
            req.flash('message',"mobile is required")
           return res.redirect('/')
           }
           if(mobile.length<10){
            console.log(`mobile number must be 10 digits required`);
            req.flash('message',"mobile number must be 10 digits required")
            return res.redirect('/')
           }
           if(!password){
            console.log(`password is required`);
            req.flash('message',"password is required")
           return res.redirect('/')
           }
           
           if(password.length<5){
                console.log(`password must be greater than 5 dights/characters`);
                req.flash("message","password must be greater than 5 dights/characters required")
                return res.redirect('/')
           }
        //    *******************ExistingUser*****************//
        const ExistingUser=await UserAuthModel.findOne({email})
        if(ExistingUser){
            console.log(`email is already exists`);
            req.flash('message',"email is already exists")
            return res.redirect('/')
        }
        //    ***************HashPassword*********//
        const HashPassword=await hashpassword(password)
         const user=new UserAuthModel({
            name,email,mobile,password:HashPassword
         })
         const newuser=await user.save()
         if(newuser){
            console.log(`user registration done`);
            return res.redirect('/user/home')
         }
        }catch(error){
            console.log(error);
            return res.redirect('/')
        }
    }
    // *************************UserLogin**********************//
    UserLogin=async(req,res)=>{
        try{
            const{email,password}=req.body
            if(!(email && password)){
                console.log(`all fields are qequired`);
                req.flash('message',"all fields are qequired")
                return res.redirect('/user/login')
            }
            const User=await UserAuthModel.findOne({email})
            if(!User){
                console.log(`email is not registered`);
                req.flash('message',"email is not registered")
                return res.redirect('/user/login')
            }
            // ************MatchPassword******************//
            const MatchPassword=await ComparePassword(password,User.password)
            if(!MatchPassword){
                console.log(`Incorrect Password`);
                req.flash('message',"Incorrect Password")
                return res.redirect('/user/login')
            }
            const token=await jwt.sign({
                _id:User._id,
                name:User.name,
                email:User.email,
                mobile:User.mobile,
                password:User.password

            },process.env.JWT_SECRET,{expiresIn:"12 hr"})
            if(token){
                res.cookie('usertoken',token)
                return res.redirect('/user/home')
            }
        }catch(error){
            console.log(error);
        }
    }
    // ------------UserAuthCheck-----------------//
    UserAuthCheck=(req,res,next)=>{
        if(req.user){
            next()
        }else{
            req.flash('message',"can't access home page...Login first!!!! ")
            return res.redirect(`/user/login`);
        }
   } 
    //***************************UserForgetPassword******************//
    ForgetPasswordUser=async(req,res)=>{
        try{
            const {email,mobile,newpassword}=req.body
            if(!email){
                console.log(`email is required`);
                req.flash('message',"email is required")
               return res.redirect('/user/forget/password')
               }
               if(!mobile){
                console.log(`mobile is required`);
                req.flash('message',"mobile is required")
               return res.redirect('/user/forget/password')
               }
               if(mobile.length<10){
                console.log(`mobile number must be 10 digits required`);
                req.flash('message',"mobile number must be 10 digits required")
                return res.redirect('/user/forget/password')
               }
               if(!newpassword){
                console.log(`password is required`);
                req.flash('message',"password is required")
               return res.redirect('/user/forget/password')
               }
               
               if(newpassword.length<5){
                    console.log(`password must be greater than 5 dights/characters`);
                    req.flash("message","password must be greater than 5 dights/characters required")
                    return res.redirect('/user/forget/password')
               }
               const User=await UserAuthModel.findOne({email,mobile})
               if(!User){
                console.log(`Invalid Email & Password!!`);
                req.flash('message',"Invalid Email & Password!!")
                return res.redirect('/user/forget/password')
               }
            //    ***********hashed*************//
            const hashed=await hashpassword(newpassword)
            const upadatepasword=await UserAuthModel.findByIdAndUpdate(User._id,{
                password:hashed
            })
            if(upadatepasword){
                console.log(`password has been updated`);
                req.flash('message1',"password has been updated")
                return res.redirect('/user/login')
            }

            
        }catch(error){
            console.log(error);
        }
    }
    // ********************UpdatePasswordUser**************//
    UpdatePasswordUser=async(req,res)=>{
       try{
        const UserId=req.params.id
        const{updatepassword,newemail}=req.body
        const UserData=await UserAuthModel.findOne({_id:UserId})
        if(UserData){
            const HASHPASSWORD=await hashpassword(updatepassword)
            const Newpassword=await UserAuthModel.findByIdAndUpdate({_id:UserId},{
                $set:{
                    password:HASHPASSWORD,
                    email:newemail
                }
            })
            if(Newpassword){
                console.log(`password update done`);
                req.flash('message1',"password update done")
                return res.redirect('/user/login')
            }
        }


       } catch(error){
        console.log(error);
       }
    }
    // *************************Userlogout****************//
    Userlogout=async(req,res)=>{
        res.clearCookie('usertoken')
        req.flash('message',"please login!!!")
        return res.redirect('/user/login')
    }
}

module.exports=new UserAuthController()