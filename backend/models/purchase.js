const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    design: {
      type: String,
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
    description: String,
  },
  { timestamps: true }
);

const Purchase = mongoose.model("purchase", PurchaseSchema);
module.exports = Purchase;
