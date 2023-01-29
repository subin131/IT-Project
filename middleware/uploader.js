const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // let path = process.cwd() + "/uploads";
    cb(null, "./uploads/");
  },
  // filename: (req, file, cb) => {
  //   let f_name = new Date().toISOString() + "-" + file.originalname;
  //   cb(null, f_name);
  // },
  filename: (req, file, callback) => {
    //this is just setting a unique filename
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
