const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  title: { type: String, maxlength: 250, minlength: 5, required: true },
  singer: { type: String, maxlength: 100, minlength: 5, required: true },
  genre: { type: String, maxlength: 100, minlength: 5, required: true },
  p_date: { type: Date, required: true }
});

let Album = mongoose.model("albumsInfo", Schema);
module.exports = Album;
