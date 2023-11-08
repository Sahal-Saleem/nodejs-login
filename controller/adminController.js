const collection = require('../model/homeSchema')

const adminLogin = async (req, res) => {
    res.render('adminlogin', { title: "Admin Page" })
    console.log("admin page rendered");
}

const verifyLogin = async(req, res) => {
   
    try {
        const email = req.body.email;
        const password = req.body.password;
        const adminDataFromUrl = await collection.findOne({ isAdmin: 1 })

        if (adminDataFromUrl) {
            if (adminDataFromUrl.password === req.body.password) {
                req.session.admin_id = adminDataFromUrl.email
                res.redirect('/admin/adminhome')
            }
            else {
                res.render("adminlogin", { message: "Password incorrect" })
            }
        }
        else {
            res.render("adminlogin", { message: "Username incorrect" })
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

//  Rendering the ADMIN dashboard
const adminDashboard = async (req, res) => {
    try {
        const find = await collection.find({})
        res.render('adminhome', { find: find })
        console.log("admin dashboard loaded")
    } catch (error) {
        res.send("error")
        console.log(error.message);
    }
}

//  To find the user for updating
const updateUser = async (req, res) => {
    try {
        const userid = req.query.userid;

        const userdata = await collection.findById({ _id: userid })

        res.render('updateUser', { userdata: userdata })

    } catch (error) {
        console.log(error.message);
    }
}

//for deleteing the user
const deleteId = async (req, res) => {
    try {
        const deleteid = req.body.id
        const userid = await collection.deleteOne({ deleteid })
        console.log(userid);
        res.redirect('/admin/adminhome')

    } catch (error) {
        console.log(error);
    }
}

//for updating the user by admin
const updatedata = async (req, res) => {
    try {
        const updateid = req.body.id;
        console.log(updateid);
        console.log(req.body.name,req.body.email);
        const updatedata = await collection.updateOne({_id:updateid}, {$set:{name: req.body.name,email: req.body.email}})
        res.redirect('/admin/adminhome')
        console.log(updatedata);
    } catch (error) {
        console.log(error.messsage);
    }
}

//session destroying
const logout = async (req, res) => {
    try {
            req.session.destroy();
            res.redirect('/admin/adminlogin')
    } catch (error) {
        console.log(error.message);
    }
}

//search operation
const search=async (req,res)=>{
    try{
        searchdata=req.body.search
        console.log(searchdata);
        const find = await collection.find({$or:[{name:req.body.search},{email:req.body.search}]})
        res.render('adminhome', { find: find })
        console.log("admin dashboard loaded")
    } catch(error){
        console.log(error.message);
    }
}

module.exports = {
    adminLogin,
    verifyLogin,
    adminDashboard,
    updateUser,
    deleteId,
    updatedata,
    logout,
    search

}