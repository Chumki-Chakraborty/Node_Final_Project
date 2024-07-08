const CourseModel=require("../../Model/AdminModel/CourseModel")
const TrainerModel=require("../../Model/AdminModel/TrainerModel")

const fs=require("fs")
const path=require("path")
class CourseController{

    CoursePage=async(req,res)=>{
        const Allcourse=await CourseModel.find().populate("Trainer_id")
        res.render("AdminPages/Courses/Course",{
            title:"Admin Course Page....",
            coursedata:Allcourse
        })
    }
    AddCourse=async(req,res)=>{
        const trainerdata=await TrainerModel.find()
        res.render("AdminPages/Courses/AddCourse",{
            title:"Admin AddCourse page",
            TrainerData:trainerdata
        })
    }
    // **************PostCourse***********//
    PostCourse=async(req,res)=>{
        try{
            const{Trainer_id,CourseName,price,Duration,Catagory}=req.body
            const addcourse=new CourseModel({
                Trainer_id,CourseName,price,Duration,Catagory
            })
            if(req.file){
                addcourse.Image=req.file.path 
            }
            const savecourse=await addcourse.save()
            if(savecourse){
                console.log(`Course Details has been added....`);
                return res.redirect("/admin/course")
            }
        }catch(error){
            console.log(error);
        }
    }
    // ***********EditCourse***************//
    EditCourse=async(req,res)=>{
        try{
            const trainerdata=await TrainerModel.find()
            const id=req.params.id
            const EditCourse=await CourseModel.findById(id)
            if(EditCourse){
                res.render("AdminPages/Courses/EditCourse",{
                    title:"Admin Edit Course Page",
                    editcourse:EditCourse,
                    TrainerData:trainerdata
                })
            }
        }catch(error){

        }
    }
    // ****************UpdateCourse*****************//
    UpdateCourse=async(req,res)=>{
        try{
            const{Trainer_id,CourseName,price,Duration,Catagory}=req.body
            const id=req.params.id
            const newimg=req.file.path
             const duplicateid=await CourseModel.findById(id)
            fs.unlinkSync(duplicateid.Image)

            const updatecourse=await CourseModel.findByIdAndUpdate(id,{
                Trainer_id,CourseName,price,Duration,Catagory,Image:newimg
            },{new:true})
            if(updatecourse){
                console.log(`Course data has been updated`);
                return res.redirect("/admin/course")
            }
        }catch(error){
            console.log(error);
        }
    }
    // ************DeleteCourse****************//
    DeleteCourse=async(req,res)=>{
        try{
            const deletecourse=await CourseModel.findByIdAndDelete(req.params.id)
            if(deletecourse){
                console.log(`Course data has been deleted...`);
                fs.unlinkSync(deletecourse.Image)
                res.redirect("/admin/course")

            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=new CourseController()