const express=require('express')
const TestimonialController = require('../../Controller/AdminController/TestimonialController')
const TestimonialRoute=express.Router()
const testimonial_img=require('../../Utilits/Testimonial_img')

TestimonialRoute.get('/admin/testimonial',TestimonialController.Testimonial_Page)
TestimonialRoute.get("/admin/addtestimonial",TestimonialController.AddTestimonial_Page)
TestimonialRoute.get('/admin/edit/testimonial/:id',TestimonialController.EditTestimonial)
TestimonialRoute.get("/admin/delete/testimonial/:id",TestimonialController.DeleteTestimonial)

// TestimonialRoute.post('/admin/post/testimonial',TestimonialController.PostTestimonial)
TestimonialRoute.post('/admin/post/testimonial',testimonial_img.single("Image"),TestimonialController.PostTestimonial)
TestimonialRoute.post('/admin/update/testimonial/:id',testimonial_img.single("Image"),TestimonialController.UpdateTestimonial)

TestimonialRoute.get('/Activate/Thumps/:id',TestimonialController.ActivateThumps)
TestimonialRoute.get("/DeActivate/Thumps/:id",TestimonialController.DeactivateThumps)

module.exports=TestimonialRoute