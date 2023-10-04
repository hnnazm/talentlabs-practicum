const express = require("express");

const db = require("./db");

require("dotenv").config()

const app = express();

app.use(express.json())

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
