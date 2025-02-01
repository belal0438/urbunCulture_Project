const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: "./.env",
});

const sequelize = require("./db/database");
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const User = require("./models/user.model");
const Data = require("./models/data.model");

const UserRouter = require("./routes/use.router");
const DataRouter = require("./routes/data.router");

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1", UserRouter);
app.use("/api/v1", DataRouter);

User.hasMany(Data);
Data.belongsTo(User);

sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    console.log("Table created");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is Running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("sequelize connection faild", error);
  });
