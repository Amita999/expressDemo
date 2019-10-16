let express = require("express");
let app = express();

app.use(express.json());
let album = require("./routes/album");
app.use("/api/allAlbums/", album);
app.listen(4500, () => console.log("Port is working"));
