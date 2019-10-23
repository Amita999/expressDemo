const express = require("express");
const router = express.Router();
const Album = require("../database/album.schema");
const Joi = require("@hapi/joi");
//album search by id
router.get("/:id", async (req, res) => {
  let item = await Album.findById(req.params.id);
  if (!item) {
    return res.status(404).send({ message: "Invalid album id" });
  }
  res.send(item);
});

//all albums
router.get("/", async (req, res) => {
  let data = await Album.find();
  res.send(data);
});

// create a new album
router.post("/newalbum", async (req, res) => {
  let { error } = ValidationError(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }
  let album = new Album({
    title: req.body.title,
    singer: req.body.singer,
    genre: req.body.genre,
    p_date: req.body.p_date
  });
  let data = await album.save();
  res.send({ item: data });
});

// update album by id
router.put("/update/:id", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).send({ message: "Invalid album id" });
    }
    let { error } = ValidationError(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }
    album.title = req.body.title;
    album.singer = req.body.singer;
    album.author = req.body.author;
    album.price = req.body.price;
    let data = await album.save();
    res.send({ message: "Album is updated", item: data });
  } catch (Ex) {
    res.send(Ex.message);
  }
});

//remove album by searching id

router.delete("/remove/:id", async (req, res) => {
  let album = await Album.findByIdAndRemove(req.params.id);
  if (!album) {
    return res.status(404).send({ message: "Invalid album id" });
  }
  res.send({ message: "removed the data" });
});

function ValidationError(message) {
  let Schema = Joi.object().keys({
    courseName: Joi.string()
      .min(5)
      .max(250)
      .required(),
    author: Joi.string()
      .min(5)
      .max(100)
      .required(),
    price: Joi.number().required()
  });

  return Schema.validate(message);
}

module.exports = router;
