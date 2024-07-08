const express=require('express')
const ejs=require('ejs')
const path=require('path')
const app=express()
const flash = require('connect-flash');
const session = require('express-session')
var cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const dotenv=require('dotenv')
dotenv.config()
const Mongodb_Connection=require('./Config/database')
Mongodb_Connection()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {  maxAge: 60000 }
  }))
app.use(flash());

app.set('view engine',"ejs")
app.set('views',"views")
app.use(cookieParser())
// **********************for Public*******************//
app.use(express.static(path.join(__dirname,'public')))
// *********************forimage****************//
app.use("/Uploads",express.static("Uploads"))

// Userallpage_route
const Userallpage_route=require("./Route/UserRoute/userallpage_route")
app.use(Userallpage_route)
// UserAuthRoute
const UserAuthRoute=require('./Route/UserRoute/user_auth_route')
app.use(UserAuthRoute)
// DashboardRoute
const DashboardRoute=require("./Route/AdminRoute/Dashboard_Route")
app.use(DashboardRoute)
// ******AdminAuthRoute*******//
const AdminAuthRoute=require('./Route/AdminRoute/AdminAuthRoute')
app.use(AdminAuthRoute)
// *************BannerRoute***************//
const BannerRoute=require('./Route/AdminRoute/BannerRoute')
app.use(BannerRoute)
// ****************TestimonialRoute*******************//
const TestimonialRoute=require('./Route/AdminRoute/TestimonialRoute')
app.use(TestimonialRoute)
// ****************EventRoute**************//
const EventRoute=require("./Route/AdminRoute/EventRoute")
app.use(EventRoute)
// *****************TrainerRoute*****************//
const TrainerRoute=require("./Route/AdminRoute/TrainerRoute")
app.use(TrainerRoute)
// ********************CouseRoute********************//
const CouseRoute=require("./Route/AdminRoute/CourseRoute")
app.use(CouseRoute)

const port=1999
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})