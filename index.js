let express = require("express");
let app = express();
let mongoose = require("mongoose");
let albums = require("./routes/album.mongo");
mongoose
  .connect("mongodb://localhost/ractiseDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connection Suuccesful"))
  .catch(ex => console.log(`Wrong connection ${ex.message}`));
let albumSchema = new mongoose.Schema({
  title: { type: String },
  singer: { type: String },
  genre: { type: String },
  p_date: { type: Date, default: Date.now }
});

let Album = mongoose.model("albums", albumSchema, "albums");
app.listen(4500, () => console.log("App is working on port 4500"));
app.use("api/albums", albums);
//Add albums
// async function AddAlbums() {
//   let newAlbum = new Album({
//     title: "Esposa",
//     singer: "Seth ",
//     genre: "Romace"
//   });
//   let data = await newAlbum.save();
//   console.log(data);
// }

// AddAlbums();
