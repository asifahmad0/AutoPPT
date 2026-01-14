const express = require("express");
const cors = require("cors");
require("dotenv").config();

const genrateSlider =require('./controller/genrateSlider')
const reGenrateSlider =require('./controller/reGenrateSlide')

const app = express();
app.use(cors());
app.use(express.json());


app.post("/generate-presentation", );



app.post("/regenerate-slide",)




app.get("/", (_, res) => res.send("Backend running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
