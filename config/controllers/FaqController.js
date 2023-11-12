const asyncHandler = require("express-async-handler");
const faqSchema = require("../schemas/faqSchema");
const mongoose = require("mongoose");
const Faq = new mongoose.model("Faq", faqSchema);
/* Post */
const createFaq = asyncHandler(async (req, res) => {
  try {
    const newFaq = await Faq.create({ ...req.body });
    res.status(200).json({
      success: true,
      message: "faq has been created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllFaq = asyncHandler(async (req, res) => {
  try {
    const faq = await Faq.find({});

    res.status(201).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});
/* delete */
const deleteFAQ = asyncHandler(async (req, res) => {
  try {
    
    const data = await Faq.deleteOne({ _id: req.params.id });
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});


module.exports = { createFaq, getAllFaq, deleteFAQ };
