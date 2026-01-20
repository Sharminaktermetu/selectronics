const codOrderSchema = require("../schemas/codOrderSchema");


const cashOnDeliveryController = async (req, res) => {
  try {
    const {
   
      amount,
      customer,
      paymentMethod,
      currency,
    } = req.body;

    // 🔒 Validation
    if ( !customer?.number) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
  const orderID = `COD-${Date.now()}`;

    const order = await codOrderSchema.create({
      orderID,
      amount,
      customer,
      paymentMethod,
      currency,
      status: "CONFIRMED",
    });

    return res.status(200).json({
      success: true,
      url: `http://localhost:3000/order-success?orderId=${order._id}`,
    });

  } catch (error) {
    console.error("COD Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { cashOnDeliveryController };
