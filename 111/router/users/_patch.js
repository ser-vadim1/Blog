const Joi = require("joi"),
  validateEdit = require("./validateEdit"),
  User = require("../../models/User");

const updateUser = (req, res, next) => {
  
  Joi.validate(req.body, validateEdit, (err, result) => {
    if (err) {
      res.status(400).send({ error: err.details });
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true, fields: { password: 0 } },
        (err, user) => {
          return err ? next(err) : res.json(user);
        }
      );
    }
  });
};

module.exports = updateUser;
