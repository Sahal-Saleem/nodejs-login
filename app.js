const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const userRoute = require('./routes/users')     
const adminRoute = require('./routes/admin')    

app.use('/', userRoute)
app.use('/admin', adminRoute)


app.listen(PORT, () => { console.log("the port is created"); })
