const express = require('express');
const app = express();

const apiRoutes = require('./src/routes/apis');

app.use(express.json())



app.use("/apis", apiRoutes)
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3003, function () {
    console.log('Example app listening on port 3003!');
});