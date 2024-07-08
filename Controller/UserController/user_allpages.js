const userauthmodel=require('../../Model/UserModel/UserAuthModel')
const BannerModel = require('../../Model/AdminModel/Bannermodel')
const TestimonialModel = require('../../Model/AdminModel/Testimonialmodel')
const TrainerModel=require("../../Model/AdminModel/TrainerModel")
const EventModel=require("../../Model/AdminModel/EventModel")
const CourseModel=require("../../Model/AdminModel/CourseModel")
// const UserApplyForm=require("../../Model/UserModel/UserApplyFormModel")
const DemoClassModel=require("../../Model/UserModel/DemoClassModel")
const UserDemoClass=require("../../Model/UserModel/DemoClassModel")
const UserCourseRegistrationModel=require("../../Model/UserModel/UserApplyFormModel")

const flash=require("connect-flash")

class UserAllPagesController{

    HomePage=async(req,res)=>{
        const user=await userauthmodel.find()
        const AllBanner = await BannerModel.find()
        const Allcourse=await CourseModel.find().populate("Trainer_id")
        const AllTrainer=await TrainerModel.find()
        // const id=req.params.id
        // const userid=await userauthmodel.findById(id)
        res.render('UserPages/home',{
            title:"user home page",
            Data:req.user,
            BannerData: AllBanner,
            coursedata:Allcourse,
            Trainerdata:AllTrainer,
            message1:req.flash('message1')
            
            
           
        })
    }
    // ------------------------UserAboutPage---------------------//
    UserAboutPage=async(req,res)=>{
        const user=await userauthmodel.find()
        const AllTestimonial = await TestimonialModel.find()
        res.render('UserPages/about',{
            title:"about page",
            Data:req.user,
            Tesimonialdata: AllTestimonial
        })
    }
    UserCoursePage=async(req,res)=>{
        const user=await userauthmodel.find()
        const Allcourse=await CourseModel.find().populate("Trainer_id")
        res.render('UserPages/courses',{
            title:"User Courses page",
            Data:req.user, 
            coursedata:Allcourse
        })
    }
    UsertrainerPage=async(req,res)=>{
        const user=await userauthmodel.find()
        const AllTrainer=await TrainerModel.find()
        res.render('UserPages/trainer',{
            title:"User Trainer Page",
            Data:req.user,
            Trainerdata:AllTrainer
        })
    }
    UsereventPage=async(req,res)=>{
        const user=await userauthmodel.find()
        const AllEvent=await EventModel.find()
        res.render('UserPages/events',{
            title:"User event Page",
            Data:req.user,
            Eventdata:AllEvent
        })
    }
    UserBlogPage=async(req,res)=>{
        const user=await userauthmodel.find()
        res.render("UserPages/blog",{
            title:"user blog page",
            Data:req.user
        })
    }
    UserContactPage=async(req,res)=>{
        const user=await userauthmodel.find()
        const Allcourse=await CourseModel.findById(req.params.id).populate("Trainer_id")
        res.render('UserPages/contact',{
            title:"User Contact Page",
            Data:req.user,
            Coursedata:Allcourse,
            Message:req.flash("Message")
        })
    }
    // *************CourseDetails*************//
    CourseDetails=async(req,res)=>{
        // const courseall=await CourseModel.find().populate("Trainer_id")
        const Allcourse=await CourseModel.findById(req.params.id).populate("Trainer_id")
        const user=await userauthmodel.findById(req.params.id)
        res.render("UserPages/CourseDetails",{
            title:" User Course details Page....",
            Data:req.user,
            coursedata:Allcourse
           
        })
    }
    // *******************ApplyNow***************//
    ApplyNow=async(req,res)=>{
         const user=await userauthmodel.find()
        // const user=await userauthmodel.findById(req.params.id)
        
        const Allcourse=await CourseModel.find()
        res.render("UserPages/ApplyNow",{
            title:"User Apply now page",
            Data:req.user,
            coursedata:Allcourse,
            Message:req.flash("Message")
            
            
        })
    }
    // ****************PostApplyNow**************//
    // PostApplyNow=async(req,res)=>{
    //    try{
    //     const{name,email,Date_of_Birth,Course_Name,Qualification,Education_Mode}=req.body
    //     const AddApplyForm=new UserCourseRegistrationModel({
    //         name,email,Date_of_Birth,Course_Name,Qualification,Education_Mode 
    //     })
    //     const saveapplyform=await AddApplyForm.save()
    //     if(saveapplyform){
    //         console.log(`User Course Registration Done....`);
    //         res.redirect("/user/home")
    //     }
    //    }catch(error){
    //     console.log(error);
    //    }
        
    // }
    // ****************************//
    PostApplyNow=async(req,res)=>{
        try{
         const{User_id,Date_of_Birth,Course_Name,Qualification,Education_Mode,date}=req.body
           
        //  **********ExistingCourse*************//
        const ExistingCourse=await UserCourseRegistrationModel.findOne({Course_Name})
        if(ExistingCourse){
            console.log(`you have already applied this course....`);
            req.flash("Message","you have already applied this course....")
           
           return res.redirect("/user/apply")
        }
        // *******************************//
        // Convert date to year-month-date format
  const formattedDate = new Date(date).toISOString().split('T')[0];
  const formatDate = new Date(Date_of_Birth).toISOString().split("T")[0]
        // ******************************//
        const AddApplyForm=new UserCourseRegistrationModel({
             User_id,Date_of_Birth:formatDate,Course_Name,Qualification,Education_Mode,date:formattedDate
         })
        const saveapplyform=await AddApplyForm.save()
        //  *************************/
        
         if(saveapplyform){
             console.log(`User Course Registration Done....`,saveapplyform);
             req.flash('message1',"your from submission sucessfully done....")
             res.redirect("/user/home")
         }
        }catch(error){
         console.log(error);
        }
         
     }

    // ********************PostDemoClass******************//
    PostDemoClass=async(req,res)=>{
        try{
            const{name,Mobile,date,Time}=req.body
            const ExistingMobile=await DemoClassModel.findOne({Mobile})
            if(ExistingMobile){
                console.log(`You have already booked free demo class!!!`);
                req.flash("Message","You have already booked free demo class!!!")
                return res.redirect("/user/contact")
            }
            // *******************************//
        // Convert date to year-month-date format
  const formattedDate = new Date(date).toISOString().split('T')[0];
  // ******************************//
            const AddClass=new DemoClassModel({
                name,Mobile,date:formattedDate,Time 
            })
            const saveclass=await AddClass.save()
            if(saveclass){
                console.log(`Demo Class form data has been submitted....`);
                res.redirect("/user/home")
            }
        }catch(error){
            console.log(error);
        }
    }
    // *********************UserDashBoard***************//
    UserDashBoardPage=async(req,res)=>{
        const user=await userauthmodel.findById(req.params.id)
         const User_id=req.params.id
        
        const CourseRegistration=await UserCourseRegistrationModel.find({User_id}).populate("User_id").populate("Course_Name")
   
    
        res.render("UserPages/UserDashboard",{
            
            title:"UserDashboard Page....",
             Data:req.user,
            
            ApplyCourse:CourseRegistration,
            
            
        })
    }
    
}

module.exports=new UserAllPagesController()