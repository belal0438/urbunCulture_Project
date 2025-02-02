const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

const firbseRoute = require("./routes/firbase.route");

app.use("/api/v1", firbseRoute);

app.listen(5000, () => console.log("🔥 Server running on port 5000"));
