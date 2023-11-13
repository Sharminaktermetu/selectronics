const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const config = require("../config/config");
const TeacherNote = require("../schemas/teacherNoteUploadSchema");

// digital ocean connection

const spaces = new AWS.S3({
  endpoint: new AWS.Endpoint(config.spaces.url),
  accessKeyId: config.spaces.accessKeyId,
  secretAccessKey: config.spaces.secretAccessKey,
});

// Post teacher note
const insertNote = asyncHandler(async (req, res) => {
  const { file } = req.files;
  try {
    await spaces
      .putObject({
        ACL: "public-read",
        Bucket: config.spaces.teacherNoteSpace,
        Body: file.data,
        Key: file.name,
      })
      .promise();

    const noteUrl = `https://${config.spaces.teacherNoteSpace}.${config.spaces.url}/${file.name}`;
    const noteData = new TeacherNote({
      url: noteUrl,
      title: req?.body?.title,
      key: file.name,
    });
    await noteData.save();
    return res.status(200).json(noteData);
  } catch (error) {
    
    res.send(error);
    // res.status(500).json({

    //   message: "There are a server side error",
    // });
  }
});

module.exports = { insertNote };
