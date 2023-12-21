const express = require("express");
const {
  register,
  login,
  registerSchema,
  loginSchema,
  Authentication,
  postNote,
  updateNote,
} = require("../controllers/controllers");
const validator = require('express-joi-validation').createValidator({})

const router = express.Router();

router.post("/register", validator.body(registerSchema), register);
router.post("/signin", login);
router.post("/post",postNote);
router.put("/updatepost/:uuid", updateNote);


module.exports=router;