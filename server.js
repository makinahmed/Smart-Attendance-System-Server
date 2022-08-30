const express = require("express");
const connectDB = require("./db");
const app = express();
const authenticate = require("./middleware/authenticate");
app.use(express.json());





app.get("/private", authenticate, async(req, res) => {
  console.log('You are ',req.user)
  return res.status(200).json({ message: "I am private route"});
});



app.get("/", (_req, res) => {
  const obj = {
    name: "Ayman",
    email: "ayman@example.com",
  };
  res.json(obj);
});

// global error handler 
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ message: "Server Error Occured!" });
});


// db connection 

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    app.listen(4000, () => {
      console.log("I'm listening on port 4000");
    });
  })
  .catch(() => {
    console.log(e);
  });
