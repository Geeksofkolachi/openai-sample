const express = require("express");
const app = express();
require("dotenv").config();
import apiRoutes from "./src/routes/apis";
// const apiRoutes = require('./src/routes/apis');

app.use(express.json());

app.use("/apis", apiRoutes);

app.listen(3003, function () {
  console.log("Example app listening on port 3003!");
});
