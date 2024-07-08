const TrainerModel=require("../../Model/AdminModel/TrainerModel")
const fs=require("fs")
const path=require("path")
class TrainerController {

    TrainerPage=async(req, res) => {
        try{
            const AllTrainer=await TrainerModel.find()
            if(AllTrainer){
                res.render("AdminPages/Trainers/Trainer", {
                    title: "Admin trainer Page",
                    Trainerdata:AllTrainer
                })
            }

        }catch(error){
            console.log(error);
        }
        
    }
    AddTrainerPage = (req, res) => {
        res.render("AdminPages/Trainers/AddTrainer",{
            title:"Add Trainer Page...."
        })
    }
    // **************PostTrainer****************//
    PostTrainer=async(req,res)=>{
        try{
            const{TrainerName,Subject,TrainerDetails,Catagory}=req.body
            const addtrainer=new TrainerModel({
                TrainerName,Subject,TrainerDetails,Catagory 
            })
            if(req.file){
                addtrainer.Image=req.file.path
            }
            const savetrainer=await addtrainer.save()
            if(savetrainer){
                console.log(`trainer added sucessfully..`);
                return res.redirect("/admin/trainer")
                
            }
        }catch(error){
            console.log(error);
        }
    }
    // **************EditTrainer****************//
    EditTrainer=async(req,res)=>{
        try{
            const id=req.params.id
            const traineredit=await TrainerModel.findById(id)
            if(traineredit){
                res.render("AdminPages/Trainers/EditTrainer",{
                    title:"Admin trainer page",
                    edit:traineredit
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    // ***********************UpdateTrainer*****************//
    UpdateTrainer=async(req,res)=>{
        try{
            const{TrainerName,Subject,TrainerDetails,Catagory}=req.body
            const id=req.params.id
            const newimg=req.file.path
            const duplicateimg=await TrainerModel.findById(id)
            fs.unlinkSync(duplicateimg.Image)
            const TrainerUpdate=await TrainerModel.findByIdAndUpdate(id,{
                TrainerName,Subject,TrainerDetails,Catagory,Image:newimg  
            },{new:true})
            if(TrainerUpdate){
                console.log(`Trainer Data has been updated`);
                return res.redirect("/admin/trainer")
            }

        }catch(error){
            console.log(error);
        }
    }
    // **************DeleteTrainer***************//
    DeleteTrainer=async(req,res)=>{
        try{
            const id=req.params.id
            const trainerdelete=await TrainerModel.findByIdAndDelete(id)
            if(trainerdelete){
                console.log(`Trainer data has been deleted..`);
                fs.unlinkSync(trainerdelete.Image)
                return res.redirect("/admin/trainer")
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new TrainerController()