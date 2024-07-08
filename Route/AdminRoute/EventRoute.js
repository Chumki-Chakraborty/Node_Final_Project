const express=require('express')
const EventControoler = require('../../Controller/AdminController/EventController')
const EventRoute=express.Router()
const EventImg=require("../../Utilits/Eventimg")

EventRoute.get("/admin/event",EventControoler.EventPage)
EventRoute.get("/admin/addevent",EventControoler.AddEventPage)
EventRoute.get("/admin/edit/event/:id",EventControoler.EditEvent)

// EventRoute.post("/admin/post/event",EventControoler.PostEvent)
EventRoute.post("/admin/post/event",EventImg.single("Image"),EventControoler.PostEvent)
EventRoute.post("/admin/update/event/:id",EventImg.single("Image"),EventControoler.UpdateEvent)

EventRoute.get("/admin/delete/event/:id",EventControoler.DeleteEvent)
module.exports=EventRoute