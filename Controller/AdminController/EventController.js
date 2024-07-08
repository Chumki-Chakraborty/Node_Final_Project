const EventModel=require("../../Model/AdminModel/EventModel")
const fs=require("fs")
const path=require("path")
class EventController{

    EventPage=async(req,res)=>{
        try{
            const AllEvent=await EventModel.find()
            if(AllEvent){
                res.render("AdminPages/Events/Event",{
                    title:"Admin Event page",
                    Eventdata:AllEvent
                })
            }
        }catch(error){
            console.log(error);
        }

        // res.render("AdminPages/Events/Event",{
        //     title:"Admin Event page"
        // })
    }
    AddEventPage=(req,res)=>{
        res.render("AdminPages/Events/Add_Event",{
            title:"Admin AddEvent page"
        })
    }
    // ***************PostEvent****************//
    PostEvent=async(req,res)=>{
        try{
            const{EventTitle,EventTime,EventDetails}=req.body
            const Addevent=new EventModel({
                EventTitle,EventTime,EventDetails
            })
            if(req.file){
                Addevent.Image=req.file.path  
            }
            const Eventsave=await Addevent.save()
            if(Eventsave){
                console.log(`Event Data has been added`);
                res.redirect("/admin/event")
            }
        }catch(error){
            console.log(error);
        }
    }
    // ***************EditEvent***********************//
    EditEvent=async(req,res)=>{
        try{
            const id=req.params.id
            const editevent=await EventModel.findById(id)
            if(editevent){
                res.render("AdminPages/Events/EditEvent",{
                    title:"Admin Edit Event Page....",
                    eventedit:editevent
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    // *-***************UpdateEvent*****************//
    UpdateEvent=async(req,res)=>{
        try{
            const{EventTitle,EventTime,EventDetails}=req.body
            const id=req.params.id
            const newimg=req.file.path
            const duplicateimg=await EventModel.findById(id)
            fs.unlinkSync(duplicateimg.Image)
            const updateevent=await EventModel.findByIdAndUpdate(id,{
                EventTitle,EventTime,EventDetails,Image:newimg
            },{new:true})
            if(updateevent){
                console.log(`event data has been updated`);
              return res.redirect("/admin/event")
            }
        }catch(error){
            console.log(error);
        }
    }
    // *******************DeleteEvent*******************//
    DeleteEvent=async(req,res)=>{
        try{
            const id=req.params.id
            const eventdelete=await EventModel.findByIdAndDelete(id)
            if(eventdelete){
                console.log(`Event data delete done.....`);
                fs.unlinkSync(eventdelete.Image)
                return res.redirect("/admin/event")
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=new EventController()