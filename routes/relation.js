let mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/ractiseDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connection Succesful"))
  .catch(ex => console.log(`Wrong connection ${ex.message}`));

// movie schema
let movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  writer: { type: String, required: true },
  type: { type: String, required: true }
});
// Album schema
const albumSchema = new mongoose.Schema({
  title: { type: String, maxlength: 250, minlength: 5, required: true },
  singer: { type: String, maxlength: 100, minlength: 5, required: true },
  genre: { type: String, maxlength: 100, minlength: 5, required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }
});

let Album = mongoose.model("Album", albumSchema);
let Movie = mongoose.model("Movie", movieSchema);

// create new movie

async function CreateMovie(name, writer, type) {
  let movie = new Movie({
    name,
    writer,
    type
  });
  let result = await movie.save();
  console.log(result);
}
//
async function CreateAlbum(title, singer, genre, movieId) {
  let album = new Album({
    title,
    singer,
    genre,
    movieId
  });
  let result = await album.save();
  console.log(result);
}

async function AllAlbum() {
  let data = await Album.find().populate("movieId");
  console.log(data);
}
// CreateMovie("neah", "hvvbiuh", "Sarbffhaiuhfcastic");
// CreateAlbum("Friendship", "Amita", "k-pop", "5db175d35b8fbf13dc805e03");
AllAlbum();
