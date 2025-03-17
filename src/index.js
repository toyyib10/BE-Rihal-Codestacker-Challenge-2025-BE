const express = require("express");
const cors = require("cors");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const pool = require("./config/db.js");

const app = express();

const port = process.env.PORT || 3000;

const adminRoutes = require("./routes/admin.routes.js");
const errorHandling = require("./middlewares/errorHandler.js");
const createAdminTable = require("./data/createAdminTable.js");

app.use(cors());
app.use(express.urlencoded({extended:true, limit: "50mb"}));
app.use(express.json({limit: "50mb"}));

app.use("/admin",adminRoutes);

app.use(errorHandling);

createAdminTable()

app.get("/",async (req,res) => {
    console.log("start");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The database name is : ${result.rows[0].current_database}`);
});

app.listen(port, (() => {
    console.log(`Server is running on ${port}`);
}));