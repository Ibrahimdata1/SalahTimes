require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
