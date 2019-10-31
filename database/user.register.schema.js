let mongoose = require("mongoose");
let userRegSchema = new mongoose.Schema({
  fName: { type: String, required: true, minlength: 5, maxlength: 100 },
  lName: { type: String, required: true, minlength: 5, maxlength: 100 },
  address: { type: String, required: true },
  UserLogin: {
    uemail: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
});
let User = mongoose.model("Users", userRegSchema);
module.exports = User;
