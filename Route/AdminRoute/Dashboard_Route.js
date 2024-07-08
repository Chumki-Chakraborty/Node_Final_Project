const express=require('express')
const Dashboard = require('../../Controller/AdminController/Dashboard')
const { AdminJwtAuthCheck } = require('../../Middleware/Auth')
const { AdminAuthCheck } = require('../../Controller/AdminController/AdminAuthController')

const DashboardRoute=express.Router()


DashboardRoute.get('/admin/dashboard',AdminJwtAuthCheck,AdminAuthCheck,Dashboard.AdminDashboard)
DashboardRoute.get("/admin/all/democlass/details",AdminJwtAuthCheck,AdminAuthCheck,Dashboard.UserDemoClassDetails)
module.exports=DashboardRoute