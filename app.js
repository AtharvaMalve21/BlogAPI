const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const users = require("./routes/users") ;
const blogs = require("./routes/blogs") ;
dotenv.config();

const app = express();

//middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

//connect with DB
connectDB();

// user route

app.use("/api/v1/user",users) ;

//blog route
app.use("/api/v1/blogs",blogs);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
