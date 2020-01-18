// require
const express = require("express");

//create express
const app = express();
app.use(express.static('public'));

// set port
const PORT = process.env.PORT || 3000;

// have express handel data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// initiate server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});