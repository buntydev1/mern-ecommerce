const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
    const_user = new user({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, role, email, fullname } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            role,
            email,
            fullname,
          },
        });
      } else {
        return res.status(400).json({
          message: "invalid password",
        });
      }
    } else {
      return res.status(400).json({
        message: "something went wrong...",
      });
    }
  });
};

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split("")[1];
  const user = jwt.verify(token, process.JWT_SECRET);
  req.user = user;
  console.log(token);
  next();
};
