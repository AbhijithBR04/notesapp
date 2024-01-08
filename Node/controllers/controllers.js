const bcrypt = require("bcrypt");
const { User, Note } = require("../models");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { Op } = require("sequelize");

const { where } = require("sequelize");

const jwtsecret =
  "75395b297df0651e2867c59195e1c07a983e68642abfbdb6fa16892bb453cda91e3b1c";

//joi validation
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (req, res) => {
  const { email, name, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(200).json({
      message: "Email is required",
    });
  }

  const regdetails = await User.findOne({ where: { email: email } });

  try {
    if (regdetails) {
      res.status(200).json({
        message: "user already exists",
      });
    } else {
      bcrypt.hash(password, 10).then(async (hash) => {
        const adduser = await User.create({
          email: email,
          name: name,
          password: hash,
        });
      });

      res.status(200).json({
        message: "registration successfull",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const loginDetails = await User.findOne({ where: { email: email } });

  try {
    if (loginDetails) {
      bcrypt.compare(password, loginDetails.password).then((data) => {
        if (data) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ uuid: data.uuid }, jwtsecret, {
            expiresIn: maxAge,
          });
          res.status(200).json({
            message: "login success",
            token: token,
            id: loginDetails.uuid,
          });
        } else {
          res.status(200).json({
            message: "invalid password",
          });
        }
      });
    } else {
      res.status(200).json({
        message: "invalid credentials",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

const postNote = async (req, res) => {
  try {
    const { uuid, body } = req.body;

    const userdata = await User.findOne({ where: { uuid: uuid } });

    if (userdata) {
      const createNote = await Note.create({
        uuid: uuid,
        body: body,
      });

      res.status(200).json({
        message: "note added successfully",
        noteId: createNote.id, // Return the noteId
      });
    } else {
      res.status(200).json({
        message: "error adding post",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId } = req.body; // Get noteId from the request body
    const { uuid, body } = req.body;

    const userdata = await User.findOne({ where: { uuid: uuid } });

    if (userdata) {
      const existingNote = await Note.findOne({ where: { id: noteId } });

      if (existingNote) {
        existingNote.body = body;
        await existingNote.save();
        res.status(200).json({
          message: "Note updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Note not found",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || "Error updating note",
    });
  }
};

const Authentication = async (req, res, next) => {
  const apitoken = req.body.token;

  try {
    const data = jwt.verify(apitoken, jwtsecret);
    const userData = await User.findOne({ where: { uuid: data.uuid } });
    if (!userData) {
      return res.status(200).json({ message: "User not found" });
    } else {
      console.log(userData.email);
      next();
    }
  } catch (err) {
    res.send(err);
  }
};

const usernote = async (req, res) => {
  try {
    const { uuid } = req.params;
    const userNotes = await Note.findAll({ where: { uuid: uuid } });

    res.status(200).json(userNotes);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error retrieving notes" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params; // Get noteId from the URL parameter
    const { uuid } = req.body; // Get UUID of the user

    const userdata = await User.findOne({ where: { uuid: uuid } });

    if (userdata) {
      const existingNote = await Note.findOne({
        where: { id: id, uuid: uuid },
      });
      if (existingNote) {
        await existingNote.destroy();
        res.status(200).json({
          message: "Note deleted successfully",
        });
        console.log("Received DELETE request for note ID:", id);
      } else {
        res.status(404).json({
          message: "Note not found or you don't have permission to delete it",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || "Error deleting note",
    });
  }
};

const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const post = await Note.findOne({ where: { id: id } });
    console.log(post);
    if (post) {
      res.status(200).json({
        message: "Note retrieved ",
        note: post,
      });
    } else {
      res.status(404).json({
        message: "Note not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error retrieving Note",
    });
  }
};

module.exports = {
  register,
  login,
  postNote,
  updateNote,
  Authentication,
  usernote,
  deleteNote,
  registerSchema,
  loginSchema,
  getSingleNote,
};
