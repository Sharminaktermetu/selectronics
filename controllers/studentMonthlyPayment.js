const asyncHandler = require('express-async-handler');
const StudentMonthlyPay = require('../schemas/studentMonthlyPaySchema');
const ObjectId = require('mongodb').ObjectId;
const createStudentMonthlyPay = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newTeamMember = await StudentMonthlyPay.create({
      ...req.body,
    });

    res.status(200).json(newTeamMember);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});
const getAllStudentPay= asyncHandler(async (req, res) => {
    try {
      const messages = await StudentMonthlyPay.find({});
  
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  const deleteAllStudentPay = asyncHandler(async (req, res) => {
    try {
        // Use deleteMany to delete all documents in the collection
        const result = await StudentMonthlyPay.deleteMany({});
        
        // Check the result object to see the number of deleted documents
        console.log(`${result.deletedCount} documents deleted.`);

        res.json({ message: 'All documents deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
module.exports = {
    createStudentMonthlyPay,
    getAllStudentPay,
    deleteAllStudentPay
};