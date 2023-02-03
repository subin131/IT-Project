const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },

  filename: (req, file, callback) => {
    let temp = file.originalname.split(".");
    const filename = crypto.randomBytes(16).toString("hex") + "." + temp[1];
    callback(null, filename);
  },
});

const imageFilter = (req, file, cb) => {
  let allowed = ["jpg", "jpeg", "png", "webp", "svg", "bmp", "gif"];
  let ext = file.originalname.split(".");
  ext = ext[ext.length - 1];

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only images are allowed"));
  }
};

const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
});

module.exports = uploader;
