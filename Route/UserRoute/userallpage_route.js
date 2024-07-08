const express=require('express')

const user_allpages = require('../../Controller/UserController/user_allpages')
const { UserJwtAuthCheck } = require('../../Middleware/Auth')
const { UserAuthCheck } = require('../../Controller/UserController/UserAuthController')


const Userallpage_route=express.Router()

Userallpage_route.get('/user/home',UserJwtAuthCheck,UserAuthCheck,user_allpages.HomePage)
Userallpage_route.get('/user/about',UserJwtAuthCheck,UserAuthCheck,user_allpages.UserAboutPage)
Userallpage_route.get('/user/courses',UserJwtAuthCheck,UserAuthCheck,user_allpages.UserCoursePage)
Userallpage_route.get('/user/trainer',UserJwtAuthCheck,UserAuthCheck,user_allpages.UsertrainerPage)
Userallpage_route.get('/user/event',UserJwtAuthCheck,UserAuthCheck,user_allpages.UsereventPage)
Userallpage_route.get('/user/blog',UserJwtAuthCheck,UserAuthCheck,user_allpages.UserBlogPage)
Userallpage_route.get('/user/contact',UserJwtAuthCheck,UserAuthCheck,user_allpages.UserContactPage)

Userallpage_route.get("/user/course/details/:id",UserJwtAuthCheck,UserAuthCheck,user_allpages.CourseDetails)
  Userallpage_route.get("/user/apply",UserJwtAuthCheck,UserAuthCheck,user_allpages.ApplyNow)
// Userallpage_route.get("/user/apply/:id",UserJwtAuthCheck,UserAuthCheck,user_allpages.ApplyNow)

Userallpage_route.post("/user/post/apply",user_allpages.PostApplyNow)
// Userallpage_route.post("/user/democlass",user_allpages.PostDemoClass)
Userallpage_route.post("/user/democlass",user_allpages.PostDemoClass)

Userallpage_route.get("/user/dashboard/page/:id",UserJwtAuthCheck,UserAuthCheck,user_allpages.UserDashBoardPage)

module.exports=Userallpage_route