const collection = require('../model/homeSchema')

//Login Page Rendering
const login =  (req, res) => {
   res.render('login', { title: "Login" })
}

//Signup Page Rendering
const signup = async (req, res) => {
   res.render('signup', { title: "Signup" })
}

//POST Signup page rendering
const signup_create = async (req, res) => {
   const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phonenumber:req.body.phonenumber,
      isAdmin:0
   }
   await collection.insertMany([data])
   res.redirect('/')
}


//Login Credential Checking and logging in
//Login validation
const login_verify = async (req, res) => {
   try {
      const userDataFromUrl = await collection.findOne({ email: req.body.email })
      
      if (userDataFromUrl) {
         if (userDataFromUrl.password === req.body.password) {
            
            req.session.user_id = userDataFromUrl.name
            res.redirect('/homepage')
            console.log("login Successfull");
         }
         else {
            res.render('login',{ message: "Password Incorrect" })
            console.log("Password Incorrect");
         }
      }
      else {
         res.render('login',{ message: "E-mail Incorrect" })
      }

   }
   catch(error) {
      res.send(error.messsage)
   }

}

const userDashboard = async(req,res)=>{
   const user=req.session.user_id
   res.render('homepage',{title:user})
}

const logout = (req,res)=>{
   try {

      req.session.destroy();
      res.redirect('/')
      
 } catch (error) {
      console.log(error.message);
 }
}





module.exports = {
   login,
   signup,
   signup_create,
   login_verify,
   userDashboard,
   logout
}