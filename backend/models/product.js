const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    terminado:{
        type: Boolean,
        required: false,
    },
    designs: {
      type: [String],
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    description: String,
  },
  { timestamps: true }
);


const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
