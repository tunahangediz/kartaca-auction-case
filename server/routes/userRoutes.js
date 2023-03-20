const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signUp);
router
  .post("/login", authController.login)
  .get("/login", authController.isLoggedIn);

router.delete("/logout", authController.logout);

module.exports = router;
