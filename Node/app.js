const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected");
});
