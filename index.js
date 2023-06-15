const express = require("express");
const app = express();
const router = require("./router");

app.use(express.json());
app.use("/", router);

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
