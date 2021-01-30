const express = require("express");
const env = require("dotenv");
const app = express();

//enviroment variable or u can say constant
env.config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
