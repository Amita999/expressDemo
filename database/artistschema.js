let mongoose = require("mongoose");
let Genre = require("./genreschema");

let artistSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 30, required: true },
  age: { type: Number, required: true },
  genre: { type: Genre.genreSchema, required: true }
});
let Artist = mongoose.model("Artist", artistSchema);

//to call
module.exports = Artist;
