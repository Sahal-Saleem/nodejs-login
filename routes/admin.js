const express = require('express')
const admin_route = express()
const adminController = require('../controller/adminController')
const validate=require('../Authentication/adminAuthentication')

admin_route.set('view engine', 'hbs')
admin_route.set('views', './views')

admin_route.use(express.json())
admin_route.use(express.urlencoded({ extended: false }))


admin_route.get('/', adminController.adminLogin,)
admin_route.get('/adminlogin',validate.isLogout,adminController.adminLogin)
admin_route.post('/adminLogin',adminController.verifyLogin)
// admin_route.post('/adminlogin',adminController.adminDashboard)
admin_route.get('/adminhome',validate.isLogin,adminController.adminDashboard)//redirecting to ADMIN Dashboard

//deleting the document by ADMIN
admin_route.get('/delete',adminController.deleteId)

//updating the document by ADMIN
admin_route.get('/update',adminController.updateUser)
admin_route.post('/update',adminController.updatedata);

//searching
admin_route.post('/search',adminController.search)

//reset button
admin_route.get('/reset',validate.isLogin,adminController.adminDashboard)

//session logout
admin_route.get('/logout',validate.isLogin,adminController.logout)


module.exports = admin_route