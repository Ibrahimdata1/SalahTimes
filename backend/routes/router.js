const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const authController = require("../controllers/authController");

// Route สำหรับดึงข้อมูลการ์ดทั้งหมด
router.get("/", cardController.getAllCards);
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

module.exports = router;
