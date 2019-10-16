let express = require("express");

let router = express.Router();
let Joi = require("@hapi/joi");

let allAlbums = [
  {
    id: 1,
    title: "sanam",
    singer: "sanam",
    genre: "romantic",
    p_date: 2019
  },
  {
    id: 2,
    title: "jabariya jodi",
    singer: "Arijit singh",
    genre: "romantic",
    p_date: 2018
  },
  {
    id: 3,
    title: " Saawali si raat",
    singer: "Pritam ",
    genre: "romantic",
    p_date: 2016
  },
  {
    id: 4,
    title: " The Simulation",
    singer: "Born of Osiris",
    genre: "Progressive metalcore",
    p_date: 2015
  },
  {
    id: 5,
    title: "Magnolia",
    singer: "Randy Houser ",
    genre: "Country",
    p_date: 2012
  },
  {
    id: 6,
    title: "Time for Us",
    singer: "GFriend",
    genre: "K-pop",
    p_date: 2010
  },
  {
    id: 7,
    title: "Mint",
    singer: "Alice Merton",
    genre: "Dance-pop",
    p_date: 2013
  },
  {
    id: 8,
    title: "The End of Chaos",
    singer: "Flotsam and Jetsam",
    genre: "Thras-Metal",
    p_date: 2011
  },
  {
    id: 9,
    title: "Look Alive",
    singer: "Guster",
    genre: "indie-pop",
    p_date: 2010
  },
  {
    id: 10,
    title: "Outer Peace",
    singer: "Toro y Moi",
    genre: "synth-pop",
    p_date: 2009
  }
];
//get
router.get("/", (req, res) => {
  res.send(allAlbums);
});
//get by id
router.get("/:id", (req, res) => {
  let id = req.params.id;
  res.send(id);
});
//get the object by id
router.get("/api/Albums/:id", (req, res) => {
  let albumId = allAlbums.find(data => data.id === parseInt(req.params.id));
  if (!albumId) {
    return res.status(404).send({ message: "Invalid request" });
  }
  res.send(albumId);
});
//storing data in array
router.post("/newAlbum", (req, res) => {
  let { error } = ValidationError(message);
  if (error) {
    return res.send(error.details[0].message);
  }

  let data = {
    id: allAlbums.length + 1,
    title: req.body.title,
    singer: req.body.singer,
    genre: req.body.genre,
    p_date: req.body.p_date
  };

  allAlbums.push(data);

  res.send(allAlbums);
});
//update the data

router.put("/updateAlbum/:id", (req, res) => {
  let { error } = ValidationError(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let album = allAlbums.find(data => data.id === parseInt(req.params.id));
  if (!album) {
    return res.status(404).send({ message: "userId not found" });
  }

  album.title = req.body.title;
  album.singer = req.body.singer;
  album.genre = req.body.genre;
  album.p_date = req.body.p_date;

  res.send(allAlbums);
});

router.delete("/deletealbum/:id", (req, res) => {
  let deletealbum = allAlbums.find(data => data.id === parseInt(req.params.id));
  if (!deletealbum) {
    return res.status(404).send({ message: "userId not found" });
  }
  let index = allAlbums.indexOf(deletealbum);
  console.log(index);
  allAlbums.splice(index, 1);
  res.send({ message: "remove the data" });
});
//Validation
function ValidationError(message) {
  let Schema = Joi.object().keys({
    title: Joi.string()
      .min(4)
      .max(15)
      .required(),
    singer: Joi.string()
      .min(4)
      .max(15)
      .required(),
    genre: Joi.string()
      .min(4)
      .max(15)
      .required(),
    p_date: Joi.string()
      .min(4)
      .max(15)
      .required()
  });
  return Schema.validate(message);
}
module.exports = router;
