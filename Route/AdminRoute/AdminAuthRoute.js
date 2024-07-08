const express=require('express')
const AdminAuthController = require('../../Controller/AdminController/AdminAuthController')
const AdminAuthRoute=express.Router()

AdminAuthRoute.get('/admin/login',AdminAuthController.AdminLogin_Page)
AdminAuthRoute.get('/admin/forget/password',AdminAuthController.Admin_forgetpassword_page)
AdminAuthRoute.get('/admin/update/password/:id',AdminAuthController.Admin_Updatepassword_Page)

AdminAuthRoute.post('/admin/post/login',AdminAuthController.AminLoginPost)
AdminAuthRoute.post("/admin/post/forgetpassword",AdminAuthController.AdminForgetPassword)
AdminAuthRoute.post('/admin/post/updatepassword/:id',AdminAuthController.AdminUpdatePassword)

AdminAuthRoute.get('/admin/logout',AdminAuthController.AdminLogout)
module.exports=AdminAuthRoute