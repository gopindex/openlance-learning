const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth");
const { validateAuthRegister } = require("../config/validator");

/**
 * @route /api/auth/register
 */
router.post("/register", validateAuthRegister, AuthController.registerUser);

module.exports = router;
