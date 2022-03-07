const aws = require("aws-sdk");
const fs = require("fs");

let secrets = require("../secrets2.json");

const s3 = new aws.S3({
  accessKeyId: (process.env.AWS_KEY && process.env.AWS_KEY) || secrets.AWS_KEY,
  secretAccessKey:
    (process.env.AWS_SECRET && process.env.AWS_SECRET) || secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
  // console.log("multer req file", req.file);
  if (!req.file) {
    console.log("multer fail");
    res.json({ error: true });
    return res.sendStatus(500);
  }
  const { filename, mimetype, size, path } = req.file;

  s3.putObject({
    Bucket: "zero-psy-sp",
    ACL: "public-read",
    Key: filename,
    Body: fs.createReadStream(path),
    ContentType: mimetype,
    ContentLength: size,
  })
    .promise()
    .then(function () {
      next();
      fs.unlink(path, () => {});
    })
    .catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
};

exports.delete = (arg, req, res) => {
  console.log("arg s3 delete", arg);

  s3.deleteObject({
    Bucket: "zero-psy-sp",
    Key: arg,
  })
    .promise()
    .then(function () {})
    .catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
};
