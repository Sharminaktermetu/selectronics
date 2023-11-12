const asyncHandler = require('express-async-handler');

const mongoose = require('mongoose');
const { pricingSchema } = require('../schemas/pricingSchema');
const PricingPlan = new mongoose.model('PricingPlan', pricingSchema);

const createPricingPlan = asyncHandler(async (req, res) => {
  try {
    
    const newPricingPlan = await PricingPlan.create({ ...req.body });

    
    

    res.status(200).json({
      success: true,
      message: 'PricingPlan has been created successfully',
    });
  } catch (error) {
    
    res.status(500).json({
      error: 'opps ! something went wrong, please try again',
    });
  }
});

const getPricingPlan = asyncHandler(async (req, res) => {
  try {
    const pricingPlans = await PricingPlan.find({});

    res.status(201).json({
      success: true,
      data: pricingPlans,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

const getSinglePricingPlan = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.Id;
    const data = await PricingPlan.findOne({ c_id });

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get  data',
    });
  }
});


const classPricingdaysPlanUpdate = asyncHandler(async (req, res) => {
  
  try {
    const c_id = req.params.Id;
    const PricingItem = await PricingPlan.findOne({ c_id });


    
    const data = await PricingPlan.updateOne(
      { _id: c_id },
      {
        $set: {
          private: [{ ...req.body }, ...PricingItem.private],
        },
      }
      // {
      //   $set: {
      //     ...req.body.data,
      //     // ...req.body.data,
      //   },
      // }
    );
    
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(501).json({
      error: 'Something error, can not get  data',
    });
  }
});



const batchPricingdaysPlanUpdate = asyncHandler(async (req, res) => {
  
  try {

    
    const p_id = req.params.Id;
    let updateBlock={
      $set: {
        
          ...req.body
       
     }
    }

    
    
    
    const data = await PricingPlan.findOneAndUpdate(
      { _id: p_id },
      updateBlock
      ,
      {
        upsert: true ,
         new:true
       }
      );

    
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(501).json({
      error: 'Something error, can not get  data',
    });
  }
});

module.exports = {
  createPricingPlan,
  getPricingPlan,
  getSinglePricingPlan,
  classPricingdaysPlanUpdate,
  batchPricingdaysPlanUpdate,
};
