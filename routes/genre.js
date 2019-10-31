let express = require("express");
let router = express.Router();
let Genre = require("../database/genreschema");
let Joi = require("@hapi/joi");
router.post("/genre", async (req, res) => {
  try {
    let { error } = ValidationError(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }
    let data = new Genre.Genre({
      gName: req.body.gName
    });
    let result = await data.save();
    res.send({
      message: "Genre created",
      data: result
    });
  } catch (ex) {
    res.send(ex.message);
  }
});

function ValidationError(message) {
  let Schema = Joi.object({
    gName: Joi.string().required()
  });
  return Schema.validate(message);
}
module.exports = router;
