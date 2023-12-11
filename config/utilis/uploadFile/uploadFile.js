// import aws from "aws-sdk";
// const fs = require("fs");
// import formidable from "formidable-serverless";
// const s3 = new aws.S3({
//   endpoint: "https://nyc3.digitaloceanspaces.com",
//   accessKeyId: process.env.SPACES_ACCESS_KEY,
//   secretAccessKey: process.env.SPACES_SECRET_KEY,
// });
// const form = new formidable.IncomingForm();
// form.uploadDir = "./";
// form.keepExtensions = true;
// form.parse(req, async (err, fields, files) => {
//   if (err || !fields.id) return res.status(500);
//   // Read file
//   const file = fs.readFileSync(files.file.path);

//   s3.upload(
//     {
//       Bucket: "qawami-university",
//       ACL: "public-read",
//       Key: `${fields.id}/${files.file.name}`,
//       Body: file,
//     },
//     {
//       partSize: 10 * 1024 * 1024,
//       queueSize: 10,
//     }
//   ).send((err, data) => {
//     if (err) return res.status(500);
//     // Unlink file
//     fs.unlinkSync(files.file.path);
//     // Return file url or other necessary details
//     return res.send({
//       url: data.Location,
//     });
//   });
// });
