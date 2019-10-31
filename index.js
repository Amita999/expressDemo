let express = require("express");
let app = express();
app.use(express.json());
let mongoose = require("mongoose");
let albums = require("./routes/album.mongo");
let genre = require("./routes/genre");
let artist = require("./routes/artist");
let userReg = require("./routes/user.routes");
let port = 4500;
mongoose
  .connect("mongodb://localhost/ractiseDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connection Succesful"))
  .catch(ex => console.log(`Wrong connection ${ex.message}`));
let albumSchema = new mongoose.Schema({
  title: { type: String },
  singer: { type: String },
  genre: { type: String },
  p_date: { type: Date, default: Date.now }
});

let Album = mongoose.model("albums", albumSchema, "albums");

app.use("/api/albums/", albums);
app.use("/api/genre/", genre);
app.use("/api/artist/", artist);
app.use("/api/customerReg/", userReg);

app.listen(port, () => console.log(`App is working on port ${port}`));

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
