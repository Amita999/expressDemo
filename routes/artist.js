let express = require("express");
let router = express.Router();
let Artist = require("../database/artistschema");
let G = require("../database/genreschema");
let Joi = require("@hapi/joi");

router.get("/allArtist", async (req, res) => {
  let result = await Artist.find();
  res.send(result);
});

router.post("/createArtist", async (req, res) => {
  let { error } = ValidationError(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }
  let Genre = await G.Genre.findById(req.body.genre_id);
  if (!Genre) {
    return res.status(404).send("invalid Id");
  }
  let Artist = new Artist({
    name: req.body.name,
    age: req.body.age,
    genre: {
      genre_id: genre_id,
      gName: gName
    }
  });
  let data = await Artist.save();
  res.send({ message: "Artist record created", data: result });
});

function ValidationError(message) {
  let Schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(30)
      .required(),
    age: Joi.string().required(),
    genre_id: Joi.string().required()
  });
  return Schema.validate(message);
}
module.exports = router;
