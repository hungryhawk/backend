const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/blockRoute"));

app.listen(PORT, () => console.log("server ..."));
