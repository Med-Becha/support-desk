const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleWare");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registerUser);
router.get("/me", protect, getMe);
router.post("/login", loginUser);

module.exports = router;
