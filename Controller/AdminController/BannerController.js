const BannerModel = require('../../Model/AdminModel/Bannermodel')
const fs=require('fs')
const path=require("path")
class AdminBannerController {
    Banner_page = async (req, res) => {
        try {
            const AllBanner = await BannerModel.find()
            if (AllBanner) {
                res.render('Adminpages/banner', {
                    title: "admin banner page",
                    BannerData: AllBanner

                })
            }
        } catch (error) {
            console.log(`Banner data not found!! ${error}`);
        }
        // res.render('Adminpages/banner',{
        //     title:"admin banner page",

        // })
    }
    AddBanner_Page = (req, res) => {
        res.render('Adminpages/AddBanner', {
            title: "Admin Addbanner Page"
        })
    }
    // *************PostBanner****************//
    PostBanner = async (req, res) => {
        try {
            const { BannerTitle, BannerDetails } = req.body
            const addbanner = new BannerModel({
                BannerTitle, BannerDetails
            })
            if(req.file){
                addbanner.image=req.file.path 
            }
            const savebanner = await addbanner.save()
            if (savebanner) {
                console.log(`Banner data has been added `);
                return res.redirect('/admin/banner')
            }
        } catch (error) {
            console.log(error);
        }
    }
    // *********************EditBanner*************//
    EditBanner = async (req, res) => {
        try {
            const id = req.params.id
            const editdata = await BannerModel.findById(id)
            if (editdata) {
                res.render('Adminpages/EditBanner', {
                    title: "Admin edit banner page...",
                    editbanner: editdata
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    // *******************UpdateBanner**************//
    UpdateBanner = async (req, res) => {
        try {
            const { BannerTitle, BannerDetails } = req.body
            const updateimg=req.file.path
            const id = req.params.id
            
            const duplicateimg=await BannerModel.findById(id)
            fs.unlinkSync(duplicateimg.image)

            const bannerupdate = await BannerModel.findByIdAndUpdate(id, {
                BannerTitle, BannerDetails,image:updateimg
            }, { new: true })
            if (bannerupdate) {
                console.log(`Banner data update done.....`);
                return res.redirect('/admin/banner')
            }
        } catch (error) {
            console.log(error);
        }
    }
    // ********************DeleteBanner*****************//
    DeleteBanner = async (req, res) => {
        try {
            const id = req.params.id
            const bannerdelete = await BannerModel.findByIdAndDelete(id)
            if (bannerdelete) {
                console.log(`banner data delete done!!`);
                fs.unlinkSync(bannerdelete.image)
                res.redirect('/admin/banner')
    
            }
        } catch (error) {
            console.log(error);
        }
    }
    // *******************DeactivateThumps**************//
    DeactivateThumps=async(req,res)=>{
        try{
            const id=req.params.id
            const diactivate=await BannerModel.findByIdAndUpdate(id,{status:1})
            if(diactivate){
                return res.redirect('/admin/banner')
            }
        }catch(error){
            console.log(error);
        }
    }
    // ****************************
    ActivateThumps=async(req,res)=>{
        try{
            const id=req.params.id
            const diactivate=await BannerModel.findByIdAndUpdate(id,{status:0})
            if(diactivate){
                return res.redirect('/admin/banner')
            }
        }catch(error){
            console.log(error);
        }
    }

}
// ********************DeleteBanner*****************//

module.exports = new AdminBannerController()