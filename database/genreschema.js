let mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
  gName: { type: String, required: true }
});
let Genre = mongoose.model("Genre", genreSchema);
//to call
module.exports = { genreSchema, Genre };
