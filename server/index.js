import express from "express";

const app = express();
const PORT = 3001;

app.use("/", (req, res) => {
  res.send("Welcome..");
});

app.listen(PORT, () => {
  console.log("Server running on port :", PORT);
});
