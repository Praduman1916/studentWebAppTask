const express = require('express')
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const studentRoutes = require('./routes/studentRoutes.js')
const cors = require('cors')
// const {notFound,errorHandler}=require("./middleware/errorMiddleware")
dotenv.config();
connectDB()
const app = express()
app.use(cors());
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Testing the data")
})

app.use("/api", studentRoutes)


// app.use(errorHandler)
const PORT = process.env.PORT || 8000
// const server=
app.listen(PORT, () => {
    console.log(`Server is running at port  ${PORT}`);
});