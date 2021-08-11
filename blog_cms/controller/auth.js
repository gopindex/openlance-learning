const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
module.exports = {
  async registerUser(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      // check if identical email exist on the database
      let user = await User.findByEmail(req.body.email);
      if (user) {
        return res.status(400).json({ msg: "User already Exist" });
      }

      // encrypting password

      let saltRounds = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      //
      let newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });

      user = await newUser.save();
      let payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      };

      res.status(201).json(payload);
    } catch (err) {
      console.log(err);
    }
  },
};
