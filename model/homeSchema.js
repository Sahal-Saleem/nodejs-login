const mongoose = require('mongoose')

mongoose.connect("mongodb://0.0.0.0:27017/venue")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("Not connected");
  });

const details = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requred: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique : true,
        required: true,
    },
    isAdmin: {
      type: Number,
      required: true
  }
})

const collection = new mongoose.model("logindetails", details);

module.exports = collection