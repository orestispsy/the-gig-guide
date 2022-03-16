const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(
      null,
      path.join(
        __dirname,
        `../../client/public/uploads/users/${req.session.userId}/`
      )
    );
  },
  filename: function (req, file, callback) {
    uidSafe(24).then(function (uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  },
});

const diskStoragePoster = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, `../../client/public/posters/`));
  },
  filename: function (req, file, callback) {
    uidSafe(12).then(function (uid) {
      callback(
        null,
        file.originalname.split(".")[0] + uid + path.extname(file.originalname)
      );
    });
  },
});

const diskStorageCommunity = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(
      null,
      path.join(__dirname, `../../client/public/uploads/community/`)
    );
  },
  filename: function (req, file, callback) {
    uidSafe(12).then(function (uid) {
      callback(
        null,
        file.originalname.split(".")[0] + uid + path.extname(file.originalname)
      );
    });
  },
});

module.exports.uploader = multer({
  storage: diskStorage,
  fileFilter: function (req, file, callback) {
    let fileType = path.extname(file.originalname);
    if (
      fileType.toLowerCase() !== ".jpg" &&
      fileType.toLowerCase() !== ".jpeg" &&
      fileType.toLowerCase() !== ".png"
    ) {
      return callback(new Error("Not An Image File"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10097152,
  },
});

module.exports.uploaderPoster = multer({
  storage: diskStoragePoster,
  fileFilter: function (req, file, callback) {
    let fileType = path.extname(file.originalname);
    if (
      fileType.toLowerCase() !== ".jpg" &&
      fileType.toLowerCase() !== ".jpeg" &&
      fileType.toLowerCase() !== ".png" &&
      fileType.toLowerCase() !== ".gif"
    ) {
      return callback(new Error("Not An Image File"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5097152,
  },
});

module.exports.uploaderCommunity = multer({
  storage: diskStorageCommunity,
  fileFilter: function (req, file, callback) {
    let fileType = path.extname(file.originalname);
    if (
      fileType.toLowerCase() !== ".jpg" &&
      fileType.toLowerCase() !== ".jpeg" &&
      fileType.toLowerCase() !== ".png" &&
      fileType.toLowerCase() !== ".gif"
    ) {
      return callback(new Error("Not An Image File"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5097152,
  },
});

module.exports.imageCompressor = (pathName, filename, id, response, rows) => {
  let ext = filename.split(".");

  if (ext[ext.length - 1] !== "png") {
    sharp(pathName)
      .jpeg({ quality: 20, chromaSubsampling: "4:4:4", mozjpeg: true })
      .toFile(
        __dirname + `/../../client/public/uploads/users/${id}/pic_` + filename,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            fs.unlink(
              path.join(
                __dirname,
                "..",
                "..",
                "client",
                "public",
                "uploads",
                "users",
                `${id}`,
                `${filename}`
              ),
              function (err) {
                if (err) {
                  console.log(err);
                }
              }
            );
            response.json({ data: rows });
          }
        }
      );
  } else {
    sharp(pathName)
      .png({ quality: 80, chromaSubsampling: "4:4:4" })
      .toFile(
        __dirname + `/../../client/public/uploads/users/${id}/pic_` + filename,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            fs.unlink(
              path.join(
                __dirname,
                "..",
                "..",
                "client",
                "public",
                "uploads",
                "users",
                `${id}`,
                `${filename}`
              ),
              function (err) {
                if (err) {
                  console.log(err);
                }
              }
            );
            response.json({ data: rows });
          }
        }
      );
  }
};
