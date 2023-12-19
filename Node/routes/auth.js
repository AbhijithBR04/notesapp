const router = require("express").Router();
const bcrypt=require('bcrypt')
const { User } = require("../models");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashpass=await bcrypt.hash(password,10)
    const user = await User.create({ name, email, password:hashpass });
    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
    try {
     const user = await User.findOne({ where: { email: req.body.email } });
  
      if (!user) {
        return res
          .status(400)
          .json({ message: "User not found. Please Sign Up First" });
      }
  
      const isPasswordCorrect = bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password is not correct" });
      }
  
      const { password, ...others } = user.dataValues;
      res.status(200).json({ user: others });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }); 

module.exports = router;


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
  