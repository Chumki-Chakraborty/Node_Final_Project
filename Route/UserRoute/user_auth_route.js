const express=require('express')
const UserAuthController = require('../../Controller/UserController/UserAuthController')
// const { UserJwtAuthCheck } = require('../../Middleware/Auth')

const UserAuthRoute=express.Router()

UserAuthRoute.get('/',UserAuthController.UserRegisterPage)
UserAuthRoute.get('/user/login',UserAuthController.UserLoginPage)
UserAuthRoute.get('/user/forget/password',UserAuthController.UserForgetPassword)
UserAuthRoute.get('/user/update/password/:id',UserAuthController.UserUpdatePassword)

// ***************************Authintication********************//
UserAuthRoute.post('/register/user',UserAuthController.UserRegistration)
UserAuthRoute.post('/login/user',UserAuthController.UserLogin)
UserAuthRoute.post('/forgetpassword/user',UserAuthController.ForgetPasswordUser)
UserAuthRoute.post('/update/password/user/:id',UserAuthController.UpdatePasswordUser)


UserAuthRoute.get('/user/logout',UserAuthController.Userlogout)


module.exports=UserAuthRoute