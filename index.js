require("dotenv").config();
const express = require("express");
const createRouter = require('./create')
const readRouter = require('./read')
const authRouter = require('./auth')
const updateRouter = require('./update')
const deleteRouter = require('./delete')
const cors = require("cors");
app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/create", createRouter);
app.use("/read", readRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);

port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port: " + port);
});
