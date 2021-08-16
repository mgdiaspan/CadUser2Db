const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 3000

// get config vars
dotenv.config();
// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/contact.routes.js")(app);

app.listen(port,"0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`)
})