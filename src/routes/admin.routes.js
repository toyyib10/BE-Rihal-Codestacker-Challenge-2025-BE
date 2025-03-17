const express = require("express");
const { getAllUser, createAdmin } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/user",getAllUser);
router.post("/createAdmin",createAdmin);
// router.get("/user:id",updateUser);
// router.get("/user:",getUserById);
// router.get("/user:id",deleteUser);

module.exports = router