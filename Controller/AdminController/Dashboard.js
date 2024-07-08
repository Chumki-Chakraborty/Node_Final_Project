const AdminAuthController=require('../../Model/UserModel/UserAuthModel')
// const UserAuthModel=require("../../Model/UserModel/UserAuthModel")
const UserDemoClass=require("../../Model/UserModel/DemoClassModel")
const UserCourseRegistrationModel=require("../../Model/UserModel/UserApplyFormModel")

class AdminDashboardController{
    AdminDashboard=async(req,res)=>{
        const admin=await AdminAuthController.find()
        const CourseRegistration=await UserCourseRegistrationModel.find().populate("User_id").populate("Course_Name")
        res.render('AdminPages/dashboard',{
            title:"Admin Dashboard page",
            admindetails:req.admin,
            UserCourseApply:CourseRegistration
            
        })
    }
    // **********UserDemoClassDetails**********//
    UserDemoClassDetails=async(req,res)=>{
        try{
            const AllDemoDetails=await UserDemoClass.find()
            const admin=await AdminAuthController.find()
            if(AllDemoDetails){
                res.render("AdminPages/DemoClassDetails",{
                    title:"User Demo Class Booking Details..",
                    democlass:AllDemoDetails,
                    admindetails:req.admin,
                })
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=new AdminDashboardController()