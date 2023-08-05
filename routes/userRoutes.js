const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup);
router.get("/login", userController.login_get);
router.post("/login", userController.login);
router.get("/profile", userController.profile);

module.exports = router;
