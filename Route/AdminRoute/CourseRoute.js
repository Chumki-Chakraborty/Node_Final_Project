const express=require('express')
const CourseController = require('../../Controller/AdminController/CouseController')
const CouseRoute=express.Router()
const CourseImg=require("../../Utilits/CourseImg")


CouseRoute.get("/admin/course",CourseController.CoursePage)
CouseRoute.get("/admin/addcourse",CourseController.AddCourse)
CouseRoute.get("/admin/edit/course/:id",CourseController.EditCourse)
CouseRoute.get("/admin/delete/course/:id",CourseController.DeleteCourse)

// CouseRoute.post("/admin/post/course",CourseController.PostCourse)
CouseRoute.post("/admin/post/course",CourseImg.single("Image"),CourseController.PostCourse)
CouseRoute.post("/admin/update/course/:id",CourseImg.single("Image"),CourseController.UpdateCourse)

module.exports=CouseRoute