const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

const blog = require("./routes/blog");

//mount
app.use("/api/v1", blog);

// //connection with db

const connectWithDb = require("./Config/Database");
connectWithDb();

//start the server

app.listen(PORT, () => {
  console.log(`App is started at port no 4000`);
});

app.get("/", (req, res) => {
  res.send(`<h1> This is my homepage Baby </h1>`);
});
