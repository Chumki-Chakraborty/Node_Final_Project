const express=require('express')
const TrainerController = require('../../Controller/AdminController/TrainerController')
const TrainerImg=require("../../Utilits/TrainerImg")

const TrainerRoute=express.Router()

TrainerRoute.get("/admin/trainer",TrainerController.TrainerPage)
TrainerRoute.get("/admin/addtrainer",TrainerController.AddTrainerPage)
TrainerRoute.get("/admin/edit/trainer/:id",TrainerController.EditTrainer)

// TrainerRoute.post("/admin/post/trainer",TrainerController.PostTrainer)
TrainerRoute.post("/admin/post/trainer",TrainerImg.single("Image"),TrainerController.PostTrainer)
TrainerRoute.post("/admin/update/trainer/:id",TrainerImg.single("Image"),TrainerController.UpdateTrainer)


TrainerRoute.get("/admin/delete/trainer/:id",TrainerController.DeleteTrainer)


module.exports=TrainerRoute