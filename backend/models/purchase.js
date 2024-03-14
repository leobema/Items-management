const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: false,
    },
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "design",
      required: false,
    },
    stock: {
      type: Number,
      required: false,
    },
    PurchaseDate: {
      type: String,
      required: false,
    },
    TotalPurchaseAmount: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);


const Purchase = mongoose.model("purchase", PurchaseSchema);
module.exports = Purchase;
