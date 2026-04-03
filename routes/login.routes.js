const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const app = express();
const cors = require("cors");
//const { Sequelize } = require("sequelize");
//const Op = Sequelize.Op;
const LoginController = require("../controllers/LoginController");

const loginController = new LoginController();

app.use(cors());

router.get("/login", (req, res) => {
  return res.send("You have called a login route");
});

router.get("/login/user", async (req, res) => {
  try {
    const results = await User.findAll();
    console.table(JSON.parse(JSON.stringify(results)));
    return res.send(JSON.stringify(results));
  } catch (err) {
    console.log(err);
  }
  return res.send("You have called a login route");
});

router.post("/login/signup", loginController.create);

router.post("/login/signin", async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    },
  })
    .then((user) => {
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }



      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
      console.log(token);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// router.post("/login/signin", async (req, res) => {
//   const { username, password } = req.body;
//     const user = await User.findOne({ where: { username } });
//     if (!user) return res.status(404).json("User Not found.");

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json("Invalid Password!");

//     const token = jwt.sign({ id: user.id }, config.secret, {
//       expiresIn: 86400, // 24 hours
//     });
//     res.json({ token, user: { id: user._id, email: user.email } });
// });

module.exports = router;
