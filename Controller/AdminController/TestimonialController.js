const TestimonialModel = require('../../Model/AdminModel/Testimonialmodel')
const fs=require('fs')
const path=require("path")
class TestimonialController {
    Testimonial_Page = async (req, res) => {
        try {
            const AllTestimonial = await TestimonialModel.find()
            if (AllTestimonial) {
                res.render('AdminPages/Testimonials/Testimonial', {
                    title: "Admin Testimonial page",
                    Tesimonialdata: AllTestimonial
                })
            }
        } catch (error) {

        }
        
    }
    AddTestimonial_Page = (req, res) => {
        res.render('AdminPages/Testimonials/AddTestimonial', {
            title: "Admin Testimonial page"
        })
    }
    // *******************PostTestimonial*********************//
    PostTestimonial = async (req, res) => {
        try {
            const { StudentName, CourseName, StudentDetails } = req.body
            const addtestimonial = new TestimonialModel({
                StudentName, CourseName, StudentDetails
            })
            if(req.file){
                addtestimonial.Image=req.file.path  
            }
            const savetestimonial = await addtestimonial.save()
            if (savetestimonial) {
                console.log(`Testimonial data has been added.....`);
                return res.redirect('/admin/testimonial')
            }
        } catch (error) {
            console.log(error);
        }
    }
    // *******************EditTestimonial****************//
    EditTestimonial = async (req, res) => {
        try {
            const id = req.params.id
            const edit_testimonial = await TestimonialModel.findById(id)
            if (edit_testimonial) {
                res.render('AdminPages/Testimonials/Edit_Testimonial', {
                    title: "Edit Testimonial page",
                    edit: edit_testimonial
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    // *******************UpdateTestimonial**************//
    UpdateTestimonial = async (req, res) => {
        try {
            const id = req.params.id
            const { StudentName, CourseName, StudentDetails } = req.body
            const NewImg=req.file.path
            const duplicateimg=await TestimonialModel.findById(id)
            fs.unlinkSync(duplicateimg.Image)
            const update = await TestimonialModel.findByIdAndUpdate(id, {
                StudentName, CourseName, StudentDetails,Image:NewImg
            }, { new: true })
            if (update) {
                console.log(`Testimonial data has been updated`);
                return res.redirect('/admin/testimonial')
            }
        } catch (error) {
            console.log(error);
        }
    }
    // ********************DeleteTestimonial*******************//
    DeleteTestimonial = async (req, res) => {
        try {
            const id = req.params.id
            const delete_testimonial = await TestimonialModel.findByIdAndDelete(id)
            if (delete_testimonial) {
                console.log(`Testimonial data has been deleted......`);
                fs.unlinkSync(delete_testimonial.Image)
                return res.redirect('/admin/testimonial')
            }

        } catch (error) {
            console.log(error);
        }
    }
    // ***********************ActivateThumps***************//
    ActivateThumps = async (req, res) => {

        try {
            const id = req.params.id
            const diactivate = await TestimonialModel.findByIdAndUpdate(id, { status: 0 })
            if (diactivate) {
                return res.redirect('/admin/testimonial')
            }
        } catch (error) {
            console.log(error);
        }
}
// ****************************
DeactivateThumps = async (req, res) => {
    try {
        const id = req.params.id
        const diactivate = await TestimonialModel.findByIdAndUpdate(id, { status: 1 })
        if (diactivate) {
            return res.redirect('/admin/testimonial')
        }
    } catch (error) {
        console.log(error);
    }
}
}
module.exports = new TestimonialController()