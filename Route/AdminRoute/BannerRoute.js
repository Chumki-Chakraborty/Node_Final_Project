const express=require('express')
const BannerController = require('../../Controller/AdminController/BannerController')
const uploadimg=require("../../Utilits/Bannerimg")
const BannerRoute=express.Router()

BannerRoute.get('/admin/banner',BannerController.Banner_page)
BannerRoute.get('/admin/addbanner',BannerController.AddBanner_Page)


BannerRoute.get('/admin/editbanner/:id',BannerController.EditBanner)

BannerRoute.get('/admin/detete/banner/:id',BannerController.DeleteBanner)


BannerRoute.post('/admin/post/banner',uploadimg.single('image'),BannerController.PostBanner)
BannerRoute.post('/admin/updatebanner/:id',uploadimg.single('image'),BannerController.UpdateBanner)

// ***********************thumps**************//
BannerRoute.get("/DeactivateThumps/:id",BannerController.DeactivateThumps)
BannerRoute.get('/Activatethumps/:id',BannerController.ActivateThumps)

module.exports=BannerRoute