const bcrypt = require("bcrypt");
const { User, Note } = require("../models");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
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
//   if (!email) {
//     return res.status(200).json({
//       message: "Email is required",
//     });
//   }

  
  try {
      const details = await User.findOne({ where: { email: email } });
    if (details) {
      res.status(200).json({
        message: "user already exists",
      });
    } else {
      bcrypt.hash(password, 10).then(async (hash) => {
        const adduser = await User.create({
          name: name,
          email: email,
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

// const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { email: req.body.email } });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User not found. Please Sign Up First" });
//     }

//     const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Password is not correct" });
//     }

//     const { password, ...others } = user.dataValues;
//     res.status(200).json({ user: others });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginDetails = await User.findOne({ where: { email: email } });

    if (loginDetails) {
      bcrypt.compare(
        password,
        loginDetails.password,
        (err, isPasswordCorrect) => {
          if (isPasswordCorrect) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign({ uuid: loginDetails.uuid }, jwtsecret, {
              expiresIn: maxAge,
            });
            res.status(200).json({
              message: "Login success",
              token: token,
            });
          } else {
            res.status(401).json({
              message: "Invalid password",
            });
          }
        }
      );
    } else {
      res.status(404).json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const postNote = async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const note = await Note.create({ body, userId: user.id });
    console.log(user)
    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
  }
};
//router.put('/post/:uuid',async
const updateNote = async (req, res) => {
  const uuid = req.params.uuid;
  const { body } = req.body;
  try {
    const user = await Note.findOne({ where: { uuid } });
    user.body = body;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const Authentication = async (req, res, next) => {
  const apitoken = req.body.token;

  try {
    const data = jwt.verify(apitoken, jwtsecret);
    const userData = await User.findOne({where:{uuid:data.uuid}});
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

module.exports = {
  register,
  login,
  postNote,
  updateNote,
  Authentication,
  registerSchema,
  loginSchema,
};

// app.put('/notes/:email', async (req, res) => {
//     const email = req.params.email;
//     const { body } = req.body;

//     try {
//       const user = await User.findOne({ where: { email } });

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       const note = await Note.findOne({ where: { userId: user.id } });

//       if (!note) {
//         return res.status(404).json({ error: 'Note not found' });
//       }

//       note.body = body;
//       await note.save();

//       return res.json(note);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//   });

// app.post('/notes/:email', async (req, res) => {
//     const email = req.params.email;
//     const { body } = req.body;

//     try {
//       const user = await User.findOne({ where: { email } });

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       const newNote = await Note.create({
//         body,
//         userId: user.id,
//       });

//       return res.json(newNote);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
