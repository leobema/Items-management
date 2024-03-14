const express = require("express");
const app = express();
const purchase = require("../controller/purchase");
//const Product = require("../models/Product");

// Add Purchase
app.post("/add", purchase.addPurchase);

// Get All Purchase Data
app.get("/get/:userID", purchase.getPurchaseData);
app.get("/get/:userID/totalpurchaseamount", purchase.getTotalPurchaseAmount);

// Delete Selected Purchase Item
app.get("/delete/:id", purchase.deleteSelectedPurchase);

// Update Selected Purchase
app.post("/update", purchase.updateSelectedPurchase);



module.exports = app;

// http://localhost:4000/api/purchase/add POST
// http://localhost:4000/api/purchase/get GET
