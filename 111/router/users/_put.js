const fs = require("fs"),
  path = require("path"),
  User = require("../../models/User");

const uploadAvatar = (req, res) => {
  if (!req.file) {
    res.status(404).json({ error: "No file" });
  } else {
    !fs.existsSync("./public/users/" + req.authUser._id) &&
      fs.mkdirSync("./public/users/" + req.authUser._id);

    const extension = `${path.extname(req.file.originalname).toLowerCase()}`,
      newPath = `../../public/users/${req.authUser._id}/${req.file.filename}`,
      tempPath = path.join(__dirname, `../../public/${req.file.filename}`),
      targetPath = path.join(__dirname, `${newPath}${extension}`);

    fs.rename(tempPath, targetPath, () => {
      let url = `/users/${req.authUser._id}/${req.file.filename}${extension}`;

      User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
          res.status(404).json({ error: "No such user" });
        } else {
          fs.unlink(path.join(__dirname, `../../public${user.avatar}`), () => {
            User.findByIdAndUpdate(
              req.user._id,
              { avatar: url },
              { new: true },
              (err, user) => (err ? next(err) : res.json(user))
            );
          });
        }
      });
    });
  }
};

module.exports = uploadAvatar;
