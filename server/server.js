const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMidleware");
const connectDB = require("./config/db");
const app = express();
require("colors");

//get data from the body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome!" });
});

//routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`.cyan.underline.bold);
    });
  })
  .catch((error) => {
    console.log(error.red.bold);
  });
