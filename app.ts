const express = require("express");
const app = express();
require("dotenv").config();
import apiRoutes from "./src/routes/apis";
const fileUpload = require("express-fileupload");
// const apiRoutes = require('./src/routes/apis');

app.use(fileUpload());
app.use(express.json());

app.use("/apis", apiRoutes);

app.listen(3003, function () {
  console.log("Example app listening on port 3003!");
});
