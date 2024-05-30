//backend/server.js
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');

const connectDb =require("./Utils/db");
const auth=require("./routes/auth")
const tasklist=require("./routes/listitem")
const authenticate = require("./middleware/auth");
// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ||3000;


app.use("/api",auth);
app.use("/api/tasks", authenticate,tasklist);




connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    });
});