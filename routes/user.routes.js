let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let U = require("../database/user.register.schema");
let bcrypt = require("bcryptjs");
router.post("/uregister", async (req, res) => {
  try {
    let { error } = ValidationError(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }
    let user = await U.findOne({
      "UserLogin.uemail": req.body.UserLogin.uemail
    });
    if (user) {
      return res
        .status(402)
        .send({ message: "This emailId Is already present" });
    }
    let data = new U({
      fName: req.body.fName,
      lName: req.body.lName,
      address: req.body.address,
      UserLogin: req.body.UserLogin
    });

    let salt = await bcrypt.genSalt(10);
    data.UserLogin.password = await bcrypt.hash(data.UserLogin.password, salt);

    let result = await data.save();
    res.send({
      message: "Data inserted successfully Please Login",
      data: result
    });
  } catch (ex) {
    res.send(ex.message);
  }
});

function ValidationError(message) {
  let Schema = Joi.object({
    fName: Joi.string()
      .min(5)
      .max(100)
      .required(),
    lName: Joi.string()
      .min(5)
      .max(100)
      .required(),
    address: Joi.string().required(),
    UserLogin: {
      uemail: Joi.string()
        .required()
        .email(),
      password: Joi.string().required()
    }
  });
  return Schema.validate(message);
}

module.exports = router;
