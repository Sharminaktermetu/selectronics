// const aws = require("aws-sdk");
// const config = require("../config/config");

// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();

// const spaces = new aws.S3({
//   endpoint: new aws.Endpoint(config.spaces.url),
//   accessKeyId: config.spaces.accessKeyId,
//   secretAccessKey: config.spaces.secretAccessKey,
// });

// router.post("/api/images/upload", (req, res) => {
// const body = req.body;

//   const params = {
//     Bucket: config.spaces.spaceName,
//     Key: body.fileName,
// Expires: 60 * 3, // Expires in 3 minutes
// ContentType: body.fileType,
//     ACL: "public-read", // Remove this to make the file private
//   };

//   const signedUrl = spaces.getSignedUrl("putObject", params);
//   

//   res.json({ signedUrl });
// });

// module.exports = router;
const AWS = require('aws-sdk');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const config = require('../config/config');
const Image = require('../schemas/imageScema');

const spaces = new AWS.S3({
  endpoint: new AWS.Endpoint(config.spaces.url),
  accessKeyId: process.env.OCEAN_ACCESS_KEY,
  secretAccessKey: process.env.OCEAN_SECRET_KEY,
});

// router.post("/images", (req, res) => {
//   // const { file } = req.files;
//   
//   res.send("Received");
// });
router.post('/images', async (req, res) => {
  
  const { file } = req.files;
  try {
    const test = await spaces
      .putObject({
        ACL: 'public-read',
        Bucket: config.spaces.spaceName,
        Body: file.data,
        Key: file.name,
      })
      .promise();

    const fileUrl = `https://${config.spaces.spaceName}.${config.spaces.url}/${file.name}`;
    
    
    res.send(fileUrl);
    // const image = new Image({
    //   url: fileUrl,
    //   key: file.name,
    // });
    // await image.save();
    // return res.json(image);
  } catch (error) {
    
    res.send(error);
  }
});

// get all
// router.get("/images/upload", async (req, res) => {
//   const image = await Image.find({});
//   res.json(image);
// });

// get single
// router.get("/images/upload/:id", async (req, res) => {
//   const image = await Image.findById(req.params.id);
//   res.json(image);
// });

// delete
// router.delete("/images/upload/:id", async (req, res) => {
//   const deletedImage = await Image.findByIdAndDelete(req.params.id);
//   await spaces
//     .deleteObject({
//       Bucket: config.spaces.spaceName,
//       Key: deletedImage.key,
//     })
//     .promise();
//   res.json(deletedImage);
// });

module.exports = router;
