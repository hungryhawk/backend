const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/blockRoute"));

app.listen(5000, () => console.log("server ..."));
