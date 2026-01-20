const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
 

    customer: {
      name: String,
      number: {
        type: String,
        required: true,
        index: true, // phone search fast হবে
      },
      email: String,
      address: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "SSL"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodOrder", orderSchema);
