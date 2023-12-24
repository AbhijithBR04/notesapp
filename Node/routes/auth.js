const express = require("express");
const {
  register,
  login,
  registerSchema,
  loginSchema,
  Authentication,
  postNote,
  updateNote,
  usernote,
  deleteNote,
} = require("../controllers/controllers");
const validator = require('express-joi-validation').createValidator({})

const router = express.Router();

router.post("/register", validator.body(registerSchema), register);
router.post("/signin", login);
router.post("/post",postNote);
router.post("/updatepost", updateNote);
router.delete('/deletenote/:id',deleteNote)
router.get('/getnote/:uuid',usernote)


module.exports=router;